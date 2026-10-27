# First-time setup of the local test site (run from this folder after "docker compose up -d").
# Installs WordPress, activates the plugin from ../trunk, copies the test GPX files and creates one test post per case.

$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot

function Wp { docker compose run --rm cli wp @args }

# Test admin credentials, generated once and kept in .env
if (-not (Test-Path .env)) {
    $pass = -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 20 | ForEach-Object { [char]$_ })
    "WP_ADMIN_USER=admin`nWP_ADMIN_PASSWORD=$pass" | Set-Content .env
}
$envVars = @{}
Get-Content .env | ForEach-Object { $k, $v = $_ -split '=', 2; $envVars[$k] = $v }

# Wait for the database
for ($i = 0; $i -lt 30; $i++) {
    docker compose run --rm cli wp db check 2>$null | Out-Null
    if ($LASTEXITCODE -eq 0) { break }
    Start-Sleep -Seconds 2
}

Wp core install --url=http://localhost:8080 --title="WP GPX Maps test" --admin_user=$($envVars.WP_ADMIN_USER) --admin_password=$($envVars.WP_ADMIN_PASSWORD) --admin_email=admin@example.test --skip-email
Wp plugin activate wp-gpx-maps

# Nested permalinks: the old relative module import broke maps on these URLs
Wp rewrite structure '/%year%/%monthnum%/%postname%/' --hard

docker compose run --rm --entrypoint sh cli -c 'mkdir -p /var/www/html/wp-content/uploads/gpx && cp /gpx-src/*.gpx /var/www/html/wp-content/uploads/gpx/'

$g = '/wp-content/uploads/gpx'
$posts = [ordered]@{
    'Completo (waypoint, riepilogo, tutti i grafici)' = "[sgpx gpx=`"$g/full.gpx`" waypoints=true summary=true summarytotlen=true summarymaxele=true summaryminele=true summaryeleup=true summaryeledown=true summaryavgspeed=true summaryavghr=true summaryavgcad=true summaryavgtemp=true summarytotaltime=true showspeed=true showhr=true showcad=true showatemp=true showgrade=true download=true]"
    'Senza tempo e quota'                          = "[sgpx gpx=`"$g/notime-noele.gpx`" summary=true summarytotlen=true summarytotaltime=true showspeed=true]"
    'Durata oltre 24 ore'                          = "[sgpx gpx=`"$g/over-24h.gpx`" summary=true summarytotaltime=true]"
    'Estensioni vuote'                             = "[sgpx gpx=`"$g/empty-extensions.gpx`" showhr=true showcad=true showatemp=true summary=true summaryavghr=true]"
    'Piu tracce'                                   = "[sgpx gpx=`"$g/multitrack.gpx`"]"
    'File GPX corrotto'                            = "[sgpx gpx=`"$g/broken.gpx`"]"
    'File GPX mancante'                            = "[sgpx gpx=`"$g/missing.gpx`"]"
    'Path traversal'                               = "[sgpx gpx=`"/../../../../etc/passwd`"]"
    'Senza altitudine, solo velocita'              = "[sgpx gpx=`"$g/full.gpx`" showele=false showspeed=true showhr=true]"
    'Colore per pendenza'                          = "[sgpx gpx=`"$g/full.gpx`" colorby=grade showspeed=true]"
    'Colore per velocita, FC e quota'              = "[sgpx gpx=`"$g/full.gpx`" colorby=speed uomspeed=1]`n`n[sgpx gpx=`"$g/full.gpx`" colorby=hr]`n`n[sgpx gpx=`"$g/full.gpx`" colorby=elevation]"
    'Colore per pendenza, piu tracce'              = "[sgpx gpx=`"$g/multitrack.gpx`" colorby=grade]"
    'Colore per pendenza senza quota'              = "[sgpx gpx=`"$g/notime-noele.gpx`" colorby=grade]"
    'Marker km e statistiche'                      = "[sgpx gpx=`"$g/full.gpx`" kmmarkers=2 summary=true summarytotlen=true summaryeleup=true summaryeledown=true summarymovingtime=true summarymaxspeed=true summarymaxgrade=true uomspeed=1]"
    'Due GPX nella stessa mappa'                   = "[sgpx gpx=`"$g/full.gpx,$g/multitrack.gpx`" summary=true summarytotlen=true summaryeleup=true kmmarkers=5]"
    'Giro del Garda'                               = "[sgpx gpx=`"$g/garda.gpx`"]"
    'Colline toscane'                              = "[sgpx gpx=`"$g/toscana.gpx`"]"
    'Due mappe nella stessa pagina'                = "[sgpx gpx=`"$g/full.gpx`"]`n`n[sgpx gpx=`"$g/multitrack.gpx`"]"
}
foreach ($title in $posts.Keys) {
    Wp post create --post_type=post --post_status=publish --post_title="$title" --post_content="$($posts[$title])"
}

Write-Host "Done: http://localhost:8080  (login with the credentials in .env)"
