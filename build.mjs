// Wraps report-fragment.html (the Artifact-ready page content) in a full HTML
// document so the report also works as a standalone file in this repo.
import { readFile, writeFile } from "node:fs/promises";

const body = await readFile("report-fragment.html", "utf8");
const title = body.match(/<title>([^<]*)<\/title>/)?.[1] ?? "Wettbewerbsübersicht";

await writeFile("competitor-report.html", `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="Interaktive Wettbewerbsübersicht AI Role-Play / Sales Training DACH, Stand 11.08.2026.">
<title>${title}</title>
<style>*,*::before,*::after{box-sizing:border-box}body{margin:0}img,svg{display:block;max-width:100%}</style>
</head>
<body>
${body.replace(/<title>[^<]*<\/title>\n?/, "")}
</body>
</html>
`, "utf8");
console.log("wrote competitor-report.html");
