import { request as httpRequest } from "node:http";
import { request as httpsRequest } from "node:https";

// Node fetch may replace Host; Traefik needs the public hostname when CI uses the private IP.
export function requestOrigin(url, { headers = {}, timeoutMs = 30_000 } = {}) {
  const target = new URL(url);
  const request = target.protocol === "https:" ? httpsRequest : httpRequest;
  return new Promise((resolve, reject) => {
    const operation = request(target, { headers, signal: AbortSignal.timeout(timeoutMs) }, async (incoming) => {
      try {
        const chunks = [];
        for await (const chunk of incoming) chunks.push(chunk);
        const responseHeaders = new Headers();
        for (let i = 0; i < incoming.rawHeaders.length; i += 2) {
          responseHeaders.append(incoming.rawHeaders[i], incoming.rawHeaders[i + 1]);
        }
        const status = incoming.statusCode;
        resolve(new Response([204, 205, 304].includes(status) ? null : Buffer.concat(chunks), {
          status, headers: responseHeaders,
        }));
      } catch (error) {
        reject(error);
      }
    });
    operation.on("error", reject);
    operation.end();
  });
}
