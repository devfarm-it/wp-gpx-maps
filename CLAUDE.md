# WP GPX Maps — note per Claude

Plugin WordPress (slug `wp-gpx-maps`), autore bastianonm. Questo repository GitHub (devfarm-it/wp-gpx-maps, branch `master`)
è la fonte del plugin: la radice del repo è la cartella del plugin. wordpress.org SVN viene aggiornato solo dalle GitHub Actions,
non si fanno più commit SVN a mano.

## Struttura
- PHP del plugin nella radice (lettura dei file traccia in `wp-gpx-maps-formats.php`, Libreria media e controllo dei file caricati in `wp-gpx-maps-media.php`); JS in `assets/src` (TypeScript) compilato con `npm run build` in `assets/dist`.
- Blocco `wp-gpx-maps/map`: `blocks/map/` (block.json, `index.js` in JS semplice sui globali `wp.*`, senza build) +
  `wp-gpx-maps-block.php` (registrazione, render tramite `wpgpxmaps_handle_shortcodes`, REST `wp-gpx-maps/v1/tracks`).
  Gli attributi hanno gli stessi nomi dello shortcode; quelli non impostati usano le impostazioni del plugin.
- Hook pubblici per add-on (versione `WPGPXMAPS_API_VERSION`, oggi 1, elenco nel commento in `wp-gpx-maps.php`) + evento JS
  `wpgpxmaps:ready`. Li usa WP GPX Maps Pro (repo privato devfarm-it/wp-gpx-maps-pro, cartella `D:\Projects\wp-gpx-maps-pro`):
  non cambiarli in modo incompatibile senza alzare la versione. Il sito di test monta anche il Pro tramite
  `dev/docker-compose.override.yml` (locale, ignorato da git).
- `.wordpress-org/`: banner, icone e screenshot della pagina wordpress.org (cartella `/assets` di SVN).
- `readme.txt` = pagina wordpress.org (utenti, changelog); `README.md` = pagina GitHub per sviluppatori (API add-on,
  sviluppo, rilascio), esclusa dal pacchetto. Tenerli allineati quando cambiano hook o funzioni.
- `.distignore`: cosa NON va nel pacchetto pubblicato (sorgenti TS, mappe, dev/, configurazioni).
- `dev/`: WordPress 7.1 + PHP 8.4 in Docker che monta questo repo come plugin. `docker compose up -d` in `dev/`, poi
  `./setup.ps1` la prima volta (installa WP, attiva il plugin, copia `dev/gpx/*.gpx`, crea un articolo per ogni caso).
  Sito su http://localhost:8080, credenziali in `dev/.env` (ignorato da git).

## Controlli e rilascio
- `.github/workflows/ci.yml`: lint PHP 7.4–8.4, PHPCS (`phpcs.xml.dist`: PHPCompatibilityWP + WordPress.Security), build JS, Plugin Check.
  In locale: `composer install` poi `vendor/bin/phpcs`.
- `.github/workflows/release.yml`: al push di un tag `x.y.z` controlla che tag, `Version:`, `WPGPXMAPS_CURRENT_VERSION` e
  `Stable tag:` coincidano, compila il JS e pubblica su wordpress.org (10up/action-wordpress-plugin-deploy). Secret: `SVN_USERNAME`, `SVN_PASSWORD`.
- `.github/workflows/readme-assets.yml`: aggiorna solo readme e `.wordpress-org/` (avvio manuale).

## Stato (ottobre 2026)
- 1.8.00: fix sicurezza (XSS riflesso via query string, path traversal, CSRF), PHP 8, grafico multi-traccia, HR Strava, cache JS.
- 1.9.00: blocco Gutenberg, più GPX in una mappa, traccia colorata, marker km, statistiche extra, hook per add-on.
- 1.10.00 (branch `feature/1.10`, non rilasciata): formati FIT/TCX/KML in `wp-gpx-maps-formats.php` (ogni lettore produce punti
  grezzi, `wpgpxmaps_buildPoints()` calcola tutto), messaggio per file illeggibili, asset solo dove c'è una mappa + lazy load,
  mappe Leaflet come tabella di provider (OSM9 = OpenTopoMap, OSM12 = CyclOSM). Ogni mappa stampa anche una descrizione testuale
  (nascosta di default) e JSON-LD schema.org `TouristTrip` per screen reader, motori di ricerca e AI (`wpgpxmaps_track_about()`). File di prova in `dev/gpx` (anche .fit/.tcx/.kml).

## Piano
### Fase 2: modernizzare
Blocco Gutenberg (shortcode mantenuto), asset caricati solo dove serve + lazy load, più tracce con colori diversi,
traccia colorata per pendenza/velocità, satellite, FIT/TCX/KML, provider MapTiler/Stadia/IGN/swisstopo, opzione proxy/cache tile per GDPR.

### Fase 3: monetizzare
Freemium: il plugin free resta completo (regole wordpress.org: niente funzioni bloccate nel codice free); add-on "Pro" separato
(archivio tracce, sync Strava/Garmin/Komoot, 3D/flyover, foto da EXIF, roadbook PDF, WooCommerce, mappe premium, supporto).
Licenze annuali ~€39 / €79 / €149, vendita tramite Freemius (o EDD / Lemon Squeezy / Paddle).
