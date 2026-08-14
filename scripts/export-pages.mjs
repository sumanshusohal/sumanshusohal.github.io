import { cp, mkdir, rm, writeFile } from "node:fs/promises";

const projectRoot = new URL("../", import.meta.url);
const clientOutput = new URL("dist/client/", projectRoot);
const pagesOutput = new URL("docs/", projectRoot);
const workerUrl = new URL("dist/server/index.js", projectRoot);

await rm(pagesOutput, { force: true, recursive: true });
await mkdir(pagesOutput, { recursive: true });
await cp(clientOutput, pagesOutput, { recursive: true });

workerUrl.searchParams.set("export", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);
const response = await worker.fetch(
  new Request("https://sumanshusohal.github.io/", {
    headers: { accept: "text/html" },
  }),
  { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
  { waitUntil() {}, passThroughOnException() {} },
);

if (!response.ok) {
  throw new Error(`Portfolio render failed with status ${response.status}`);
}

const html = await response.text();
await writeFile(new URL("index.html", pagesOutput), html, "utf8");
await writeFile(new URL(".nojekyll", pagesOutput), "", "utf8");

console.log("GitHub Pages output written to docs/");
