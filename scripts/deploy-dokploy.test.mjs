import assert from "node:assert/strict";
import { createServer } from "node:http";
import { once } from "node:events";
import { test } from "node:test";
import { deployApplication } from "./deploy-dokploy.mjs";

const before = "a".repeat(40);
const after = "b".repeat(40);
const image = (revision) => `ghcr.io/carlosazaustre/cazaustre-web:${revision}`;

async function fixture(t, { failNewImage = false, failDeploy = false, cacheHealth = false, firstDeploy = false } = {}) {
  const calls = [];
  let configuredImage = image(before);
  let runningRevision = before;
  const server = createServer(async (request, response) => {
    let payload = "";
    for await (const chunk of request) payload += chunk;
    const body = payload ? JSON.parse(payload) : undefined;
    const url = new URL(request.url, "http://localhost");
    response.setHeader("Content-Type", "application/json");
    if (url.pathname.startsWith("/api/application.")) {
      assert.equal(request.headers["x-api-key"], "test-key");
      calls.push({ path: url.pathname, body });
    }
    if (url.pathname === "/api/application.one") {
      assert.equal(url.searchParams.get("applicationId"), "test-app");
      response.end(JSON.stringify({ sourceType: "docker", applicationStatus: firstDeploy ? "idle" : "done", dockerImage: configuredImage }));
    } else if (url.pathname === "/api/application.update") {
      assert.deepEqual(Object.keys(body).sort(), ["applicationId", "dockerImage"]);
      configuredImage = body.dockerImage;
      response.end("{}");
    } else if (url.pathname === "/api/application.deploy") {
      if (failDeploy && configuredImage === image(after)) {
        response.writeHead(500).end("{}");
        return;
      }
      if (!failNewImage || configuredImage === image(before)) runningRevision = configuredImage.split(":").at(-1);
      response.writeHead(204).end();
    } else if (url.pathname === "/api/health") {
      assert.equal(request.headers["x-api-key"], undefined, "Do not send API credentials to the app");
      assert.equal(request.headers.host, "preview.carlosazaustre.es");
      response.setHeader("Cache-Control", cacheHealth && runningRevision === after ? "public, max-age=3600" : "no-store");
      response.end(JSON.stringify({ status: "ok", revision: runningRevision }));
    } else {
      response.writeHead(404).end("{}");
    }
  });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  t.after(() => { server.closeAllConnections(); server.close(); });
  const base = `http://127.0.0.1:${server.address().port}`;
  return {
    calls,
    options: {
      apiUrl: base, apiKey: "test-key", applicationId: "test-app", image: image(after),
      originUrl: base, host: "preview.carlosazaustre.es", expectedRevision: after,
      timeoutMs: 150, pollMs: 10,
    },
    configuredImage: () => configuredImage,
  };
}

test("deploys the exact commit without replacing registry credentials or runtime configuration", async (t) => {
  const state = await fixture(t);
  await deployApplication(state.options);
  assert.equal(state.configuredImage(), image(after));
  assert.equal(state.calls.filter((call) => call.path.endsWith("application.deploy")).length, 1);
});

test("a healthy old version does not count as success and restores the old image", async (t) => {
  const state = await fixture(t, { failNewImage: true });
  await assert.rejects(deployApplication(state.options), /Timed out/);
  assert.equal(state.configuredImage(), image(before));
  assert.equal(state.calls.filter((call) => call.path.endsWith("application.deploy")).length, 2);
});

test("a failed deployment request restores the previous image", async (t) => {
  const state = await fixture(t, { failDeploy: true });
  await assert.rejects(deployApplication(state.options), /HTTP 500/);
  assert.equal(state.configuredImage(), image(before));
});

test("cached health responses cannot validate a release", async (t) => {
  const state = await fixture(t, { cacheHealth: true });
  await assert.rejects(deployApplication(state.options), /Timed out/);
  assert.equal(state.configuredImage(), image(before));
});

test("rejects mutable image tags before contacting Dokploy", async (t) => {
  const state = await fixture(t);
  await assert.rejects(deployApplication({ ...state.options, image: "ghcr.io/carlosazaustre/cazaustre-web:latest" }), /immutable/);
  assert.equal(state.calls.length, 0);
});

test("a failed first deployment does not try to restore an unavailable release", async (t) => {
  const state = await fixture(t, { firstDeploy: true, failDeploy: true });
  await assert.rejects(deployApplication(state.options), /HTTP 500/);
  assert.equal(state.configuredImage(), image(after));
  assert.equal(state.calls.filter((call) => call.path.endsWith("application.deploy")).length, 1);
});
