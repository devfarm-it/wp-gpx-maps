# WP GPX Maps — note per Claude

Plugin WordPress (slug `wp-gpx-maps`), autore bastianonm. Questo repository GitHub (devfarm-it/wp-gpx-maps, branch `master`)
è la fonte del plugin: la radice del repo è la cartella del plugin. wordpress.org SVN viene aggiornato solo dalle GitHub Actions,
non si fanno più commit SVN a mano.

## Struttura
- PHP del plugin nella radice; JS in `assets/src` (TypeScript) compilato con `npm run build` in `assets/dist`.
- `.wordpress-org/`: banner, icone e screenshot della pagina wordpress.org (cartella `/assets` di SVN).
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
- Comportamenti ancora da sistemare: distanza che riparte da zero per ogni traccia nel grafico, "Total descent" negativo,
  GPX corrotto mostra mappa vuota senza messaggio.

## Piano
### Fase 2: modernizzare
Blocco Gutenberg (shortcode mantenuto), asset caricati solo dove serve + lazy load, più tracce con colori diversi,
traccia colorata per pendenza/velocità, satellite, FIT/TCX/KML, provider MapTiler/Stadia/IGN/swisstopo, opzione proxy/cache tile per GDPR.

### Fase 3: monetizzare
Freemium: il plugin free resta completo (regole wordpress.org: niente funzioni bloccate nel codice free); add-on "Pro" separato
(archivio tracce, sync Strava/Garmin/Komoot, 3D/flyover, foto da EXIF, roadbook PDF, WooCommerce, mappe premium, supporto).
Licenze annuali ~€39 / €79 / €149, vendita tramite Freemius (o EDD / Lemon Squeezy / Paddle).
