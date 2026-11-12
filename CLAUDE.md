# WP GPX Maps — note per Claude

Plugin WordPress (slug `wp-gpx-maps`), autore bastianonm. Questo repository GitHub (devfarm-it/wp-gpx-maps, branch `master`)
è la fonte del plugin: la radice del repo è la cartella del plugin. wordpress.org SVN viene aggiornato solo dalle GitHub Actions,
non si fanno più commit SVN a mano.

## Struttura
- PHP del plugin nella radice (lettura dei file traccia in `wp-gpx-maps-formats.php`, Libreria media e controllo dei file caricati in `wp-gpx-maps-media.php`, tassonomia Attività `wpgpxmaps_activity` in `wp-gpx-maps-activities.php`); JS in `assets/src` (TypeScript) compilato con `npm run build` in `assets/dist`.
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

## Pagina Free vs Pro
- Ogni volta che si aggiunge, cambia o toglie una funzionalità (free o Pro) va aggiornata anche la pagina di confronto
  Free vs Pro su devfarm.it: sorgente in `D:\Projects\wp-gpx-maps\build\posts\compare.html` (tabella in un blocco HTML, una riga
  per funzionalità con link a un post di esempio). Il login sul sito lo fa l'utente nel browser integrato.

## Controlli e rilascio
- `.github/workflows/ci.yml`: lint PHP 7.4–8.4, PHPCS (`phpcs.xml.dist`: PHPCompatibilityWP + WordPress.Security), build JS, Plugin Check.
  In locale: `composer install` poi `vendor/bin/phpcs`.
- `.github/workflows/release.yml`: al push di un tag `x.y.z` controlla che tag, `Version:`, `WPGPXMAPS_CURRENT_VERSION` e
  `Stable tag:` coincidano, compila il JS e pubblica su wordpress.org (10up/action-wordpress-plugin-deploy). Secret: `SVN_USERNAME`, `SVN_PASSWORD`.
- `.github/workflows/readme-assets.yml`: aggiorna solo readme e `.wordpress-org/` (avvio manuale).

## Stato (ottobre 2026)
- 1.8.00: fix sicurezza (XSS riflesso via query string, path traversal, CSRF), PHP 8, grafico multi-traccia, HR Strava, cache JS.
- 1.9.00: blocco Gutenberg, più GPX in una mappa, traccia colorata, marker km, statistiche extra, hook per add-on.
- 1.10.00 (rilasciata il 29 ottobre 2026, tag `1.10.00`): formati FIT/TCX/KML in `wp-gpx-maps-formats.php` (ogni lettore produce punti
  grezzi, `wpgpxmaps_buildPoints()` calcola tutto), messaggio per file illeggibili, asset solo dove c'è una mappa + lazy load,
  mappe Leaflet come tabella di provider (OSM9 = OpenTopoMap, OSM12 = CyclOSM). Ogni mappa stampa anche una descrizione testuale
  (nascosta di default) e JSON-LD schema.org `TouristTrip` per screen reader, motori di ricerca e AI (`wpgpxmaps_track_about()`). File di prova in `dev/gpx` (anche .fit/.tcx/.kml).
  Libreria media per i file traccia, tassonomia Attività, bordi sfumati, tessere OSM anche nell'editor (fetch con referrer).
  Video "how it works" su YouTube (https://www.youtube.com/watch?v=n55Yzw2ig7A), linkato in readme.txt, README.md e home di devfarm.it.
- 1.10.01–1.10.03: etichette impostazioni, pendenza massima su 200 m, impostazioni tenute alla disattivazione, richiesta recensione.
- 1.10.04 (3 novembre 2026): nome "WP GPX Maps – GPX, FIT & KML maps with elevation profile" e nuovi tag (fase 2 della roadmap
  di crescita); l'avviso "novità" compare solo quando cambia la versione 1.x. Lista d'attesa Pro su devfarm.it con il plugin Newsletter.
- 1.11.00–1.12.01: motore MapLibre (consigliato, caricato su richiesta), effetti nebbia / rilievo ombreggiato / esagerazione 3D.
- 1.13.00 (6 novembre 2026): Node 26 LTS (.nvmrc) e Vite 8, pulsanti mappa uguali per i tre motori (`Utils/MapControls.ts`),
  zoom con la rotella in schermo intero.
- 1.13.01: senza mappa di base (offline, chiave Mapbox sbagliata) MapLibre e Mapbox passano a uno stile vuoto
  (`fallbackWithoutBaseMap` in `Utils/MapControls.ts`) e mostrano comunque traccia e punti.
- 1.13.02: il worker di MapLibre parte da un blob (`import "url-del-worker"`): così appartiene alla pagina e il service worker
  offline del Pro (scope = pagina) risponde anche alle sue richieste (file del worker, tessere, font). Un worker al suo
  indirizzo in wp-content non è nello scope e offline falliva tutto (niente mappa né traccia).
- 1.13.03 (GDPR, segnalato da hupe13 sul forum): icone predefinite di waypoint e posizione disegnate in
  `assets/src/Utils/Icons.ts` (SVG come data URI) invece che caricate da maps.google.com. Nessuna risorsa da Google.
- 1.13.04: salita e discesa totali con soglia di rumore (isteresi 5 m, filtro `wpgpxmaps_climb_threshold`, 0 = somma
  di ogni variazione come prima) in `wpgpxmaps_buildPoints()`. Prima un'escursione di 300 m di dislivello mostrava 1.608 m.
  Chiavi delle cache alzate (file `v1.13.04`, transient info `v2`). Il Pro usa già 10 m per tappe, sole e navigazione.
- 1.14.00: dati strutturati con `itinerary.containsPlace` (partenza, waypoint visibili in ordine lungo il percorso,
  arrivo; `Place` con `GeoCoordinates` e `hasMap` OpenStreetMap) in `wpgpxmaps_structured_places()`. Waypoint solo se la mappa
  li mostra (la caccia al tesoro Pro forza waypoints=false), letti con cache transient `wpgpxmaps_wpts_`. FAQ: i dati
  strutturati non migliorano il posizionamento da soli (nessun rich result Google per TouristTrip, Google Maps non li legge).

## Piano
### Fase 2: modernizzare
Blocco Gutenberg (shortcode mantenuto), asset caricati solo dove serve + lazy load, più tracce con colori diversi,
traccia colorata per pendenza/velocità, satellite, FIT/TCX/KML, provider MapTiler/Stadia/IGN/swisstopo, opzione proxy/cache tile per GDPR.

### Fase 3: monetizzare
Freemium: il plugin free resta completo (regole wordpress.org: niente funzioni bloccate nel codice free); add-on "Pro" separato
(archivio tracce, sync Strava/Garmin/Komoot, 3D/flyover, foto da EXIF, roadbook PDF, WooCommerce, mappe premium, supporto).
Licenze annuali ~€39 / €79 / €149, vendita tramite Freemius (o EDD / Lemon Squeezy / Paddle).
