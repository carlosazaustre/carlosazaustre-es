import { setTimeout as delay } from "node:timers/promises";
import { pathToFileURL } from "node:url";
import { requestOrigin } from "./request-origin.mjs";

export async function deployApplication({
  apiUrl, apiKey, applicationId, image, originUrl, host, expectedRevision,
  timeoutMs = 300_000, pollMs = 5_000,
}) {
  if (![apiUrl, apiKey, applicationId, image, originUrl, host, expectedRevision].every(Boolean)) {
    throw new Error("Missing Dokploy deployment configuration");
  }
  if (!/^[a-f0-9]{40}$/.test(expectedRevision) || !image.endsWith(`:${expectedRevision}`)) {
    throw new Error("Deploy an immutable image tagged with the full commit SHA");
  }

  async function api(procedure, body) {
    const url = new URL(`/api/${procedure}`, apiUrl);
    if (!body) url.searchParams.set("applicationId", applicationId);
    const response = await fetch(url, {
      method: body ? "POST" : "GET",
      headers: { "x-api-key": apiKey, "Content-Type": "application/json" },
      body: body ? JSON.stringify({ applicationId, ...body }) : undefined,
      redirect: "error",
      signal: AbortSignal.timeout(15_000),
    });
    if (!response.ok) throw new Error(`Dokploy ${procedure}: HTTP ${response.status}`);
    return response.json();
  }

  async function waitForRevision(revision) {
    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
      try {
        const response = await requestOrigin(new URL("/api/health", originUrl), {
          headers: { Host: host, "Cache-Control": "no-cache", "X-Forwarded-Proto": "https" },
          timeoutMs: 10_000,
        });
        if (response.ok && response.headers.get("cache-control")?.includes("no-store")) {
          const health = await response.json();
          if (health.status === "ok" && health.revision === revision) return;
        }
      } catch {
        // Routing and containers may be unavailable briefly during a rolling update.
      }
      await delay(pollMs);
    }
    throw new Error(`Timed out waiting for revision ${revision}`);
  }

  const previous = await api("application.one");
  if (previous.sourceType !== "docker") throw new Error("Application must use the Docker provider");
  if (!previous.dockerImage) throw new Error("Application must have a configured image before deployment");

  // Patch only the image so registry credentials, domains and runtime secrets stay in Dokploy.
  await api("application.update", { dockerImage: image });
  try {
    await api("application.deploy", { title: `Deploy ${expectedRevision}` });
    await waitForRevision(expectedRevision);
  } catch (error) {
    if (previous.applicationStatus === "idle") {
      console.error("First deployment failed; no previous release is available for rollback.");
      throw error;
    }
    if (previous.dockerImage !== image) {
      console.error("Deployment failed; restoring the previous image in Dokploy.");
      try {
        await api("application.update", { dockerImage: previous.dockerImage });
        await api("application.deploy", { title: "Restore previous image after failed health check" });
        const previousRevision = previous.dockerImage.split(":").at(-1);
        if (/^[a-f0-9]{40}$/.test(previousRevision)) await waitForRevision(previousRevision);
      } catch {
        throw new Error("Deployment and automatic recovery failed; check Dokploy", { cause: error });
      }
    }
    throw error;
  }
  console.log(`Deployed and verified revision ${expectedRevision}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await deployApplication({
    apiUrl: process.env.DOKPLOY_URL,
    apiKey: process.env.DOKPLOY_API_KEY,
    applicationId: process.env.DOKPLOY_APPLICATION_ID,
    image: process.env.DEPLOY_IMAGE,
    originUrl: process.env.DEPLOY_ORIGIN_URL,
    host: process.env.DEPLOY_HOST,
    expectedRevision: process.env.APP_REVISION,
  });
}
