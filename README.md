# claude-test

## Wettbewerbsübersicht (AI Role-Play / Sales Training, DACH)

Interaktive Aufbereitung des Competitor-Reports vom 11.08.2026 — 77 Anbieter,
bewertet nach Nähe zum eigenen Angebot, Schlagkraft und Zugang zum DACH-Budget.

| Datei | Zweck |
|---|---|
| `competitor-report.html` | Fertige, eigenständige Seite — im Browser öffnen, keine Abhängigkeiten |
| `report-fragment.html` | Quelldatei (Inhalt ohne `<html>`-Hülle), Basis für Artifact-Publishing |
| `Wettbewerbsuebersicht-DACH-2026-08-11.pdf` | Druckfassung, 45 Seiten (generiert) |
| `build.mjs` | Erzeugt `competitor-report.html` aus dem Fragment |
| `makepdf.mjs` | Erzeugt das PDF aus `competitor-report.html` |

Inhalt und Daten stehen in `report-fragment.html` im `D`-Array. Nach Änderungen:

```sh
npm install      # nur für die PDF-Erzeugung (Playwright)
npm run build    # HTML aktualisieren
npm run pdf      # HTML aktualisieren und PDF neu setzen
```

Die Druckfassung entsteht aus dem `@media print`-Block in `report-fragment.html`:
alle Dossiers aufgeklappt, Bedienelemente ausgeblendet, Kartenkörper zweispaltig,
Datentabelle als Anhang. `Strg+P` im Browser liefert dasselbe Ergebnis.
`makepdf.mjs` nutzt das vorinstallierte Chromium unter
`/opt/pw-browsers/chromium-1194/…`; auf anderen Rechnern via `CHROME_PATH` setzen.

Der Bedrohungsscore ist eine Lesart des Reports, keine Messung:
`Score = Nähe × 3,8 + Kraft × 3,0 + Zugang × 3,2` (alle Achsen 0–10).
