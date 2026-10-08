import { createHash } from "node:crypto";
import { readFile, readdir, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
const slug = "velvet-ripple-tjhw";
const statePath = ".herenow/state.json";
let key = process.env.HERENOW_API_KEY;
if (!key) {
  let input = "";
  for await (const chunk of process.stdin) input += chunk;
  key = JSON.parse(input).key;
}
if (!key) throw new Error("Provide HERENOW_API_KEY or a JSON key on stdin. Credentials are never saved.");
const headers = { Authorization: `Bearer ${key}`, "X-HereNow-Client": "codex/direct-api", "Content-Type": "application/json" };
async function api(url, options = {}) {
  const response = await fetch(url.startsWith("https://") ? url : `https://here.now${url}`, { ...options, headers: { ...headers, ...options.headers } });
  const json = await response.json();
  if (!response.ok) throw new Error(`here.now ${response.status}: ${json.message || json.error || "request failed"}`);
  return json;
}
const state = JSON.parse(await readFile(statePath, "utf8"));
const cached = state.publishes[slug];
const live = await api(`/api/v1/publish/${slug}`);
if (live.currentVersionId !== cached.versionId) throw new Error(`Live content changed: local ${cached.versionId}, remote ${live.currentVersionId}. Reconcile the live files before publishing.`);
if (process.argv.includes("--check")) {
  console.log(JSON.stringify({ slug, currentVersionId: live.currentVersionId, source: live.currentVersionSource, matchesLocal: true }, null, 2));
  process.exit(0);
}
const root = path.resolve("out");
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png",
  ".jpg": "image/jpeg", ".webp": "image/webp", ".woff2": "font/woff2", ".woff": "font/woff",
  ".ico": "image/x-icon", ".pdf": "application/pdf" };
const files = [];
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(full);
    else if (entry.isFile()) {
      const bytes = await readFile(full);
      files.push({ path: path.relative(root, full).split(path.sep).join("/"), bytes, size: bytes.length,
        contentType: types[path.extname(full)] || "application/octet-stream",
        hash: createHash("sha256").update(bytes).digest("hex") });
    }
  }
}
await walk(root);
if (!files.some((file) => file.path === "index.html")) throw new Error("Build the static export before publishing.");
const staged = await api(`/api/v1/publish/${slug}`, { method: "PUT", body: JSON.stringify({
  baseVersionId: cached.versionId, files: files.map(({ bytes, ...file }) => file),
  displayName: "Anurag Kumar Srivastava | Python & GenAI Developer",
  displayDescription: "An editorial portfolio of practical Python, RAG and AI agent projects.",
}) });
const byPath = new Map(files.map((file) => [file.path, file]));
const queue = [...staged.upload.uploads];
await Promise.all(Array.from({ length: Math.min(4, queue.length) }, async () => {
  while (queue.length) {
    const upload = queue.shift();
    const file = byPath.get(upload.path);
    if (!file) throw new Error("Unexpected upload path.");
    const response = await fetch(upload.url, { method: "PUT", headers: upload.headers, body: file.bytes });
    if (!response.ok) throw new Error(`Upload failed: ${file.path}, HTTP ${response.status}`);
  }
}));
const published = await api(staged.upload.finalizeUrl, { method: "POST", body: JSON.stringify({ versionId: staged.upload.versionId }) });
if (!published.success || published.publishStatus?.state !== "live") throw new Error("Finalize did not confirm a live version.");
state.publishes[slug] = { ...cached, siteUrl: published.siteUrl, versionId: published.currentVersionId, claimed: true };
await mkdir(".herenow", { recursive: true });
await writeFile(statePath, JSON.stringify(state, null, 2) + "\n");
console.log(JSON.stringify({ siteUrl: published.siteUrl, versionId: published.currentVersionId, files: files.length, publishStatus: published.publishStatus }, null, 2));

