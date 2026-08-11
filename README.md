# claude-test

## Wettbewerbsübersicht (AI Role-Play / Sales Training, DACH)

Interaktive Aufbereitung des Competitor-Reports vom 11.08.2026 — 77 Anbieter,
bewertet nach Nähe zum eigenen Angebot, Schlagkraft und Zugang zum DACH-Budget.

| Datei | Zweck |
|---|---|
| `competitor-report.html` | Fertige, eigenständige Seite — im Browser öffnen, keine Abhängigkeiten |
| `report-fragment.html` | Quelldatei (Inhalt ohne `<html>`-Hülle), Basis für Artifact-Publishing |
| `build.mjs` | Erzeugt `competitor-report.html` aus dem Fragment: `node build.mjs` |

Inhalt und Daten stehen in `report-fragment.html` im `D`-Array. Nach Änderungen
`node build.mjs` ausführen, damit die eigenständige Seite wieder synchron ist.

Der Bedrohungsscore ist eine Lesart des Reports, keine Messung:
`Score = Nähe × 3,8 + Kraft × 3,0 + Zugang × 3,2` (alle Achsen 0–10).
