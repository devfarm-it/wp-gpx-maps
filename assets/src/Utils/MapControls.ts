/*
 * Map controls shared by the MapLibre and Mapbox engines: the map style menu (a layers button with a list)
 * and mouse wheel zoom while the map is in full screen. They look like the Leaflet controls (css/wp-gpx-maps-output.css).
 */

export const layersIcon = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 3 2 8l10 5 10-5-10-5Z"/><path d="m2 13 10 5 10-5"/></svg>';

export interface StyleMenuItem {
    key: string;
    title: string;
}

/*
 * Map style menu: a button that opens the list of the styles, the current one checked.
 * Returns the control element, with the class of the engine (maplibregl or mapboxgl).
 */
export function styleMenu(prefix: string, items: StyleMenuItem[], current: string, onSelect: (key: string) => void): HTMLElement {

    const container = document.createElement('div');
    container.className = `${prefix}-ctrl ${prefix}-ctrl-group wpgpxmaps-style-menu`;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'wpgpxmaps-style-menu-button';
    button.title = 'Map style';
    button.setAttribute('aria-label', 'Map style');
    button.setAttribute('aria-expanded', 'false');
    button.innerHTML = layersIcon;

    const list = document.createElement('div');
    list.className = 'wpgpxmaps-style-menu-list';
    list.hidden = true;

    const render = () => {
        list.innerHTML = '';
        for (const item of items) {
            const option = document.createElement('button');
            option.type = 'button';
            option.textContent = item.title;
            option.setAttribute('aria-pressed', item.key === current ? 'true' : 'false');
            option.onclick = () => {
                current = item.key;
                close();
                onSelect(item.key);
            };
            list.appendChild(option);
        }
    };

    const open = () => {
        render();
        list.hidden = false;
        button.setAttribute('aria-expanded', 'true');
        document.addEventListener('pointerdown', outside, true);
        document.addEventListener('keydown', escape, true);
    };
    const close = () => {
        list.hidden = true;
        button.setAttribute('aria-expanded', 'false');
        document.removeEventListener('pointerdown', outside, true);
        document.removeEventListener('keydown', escape, true);
    };
    const outside = (e: Event) => {
        if (!container.contains(e.target as Node)) {
            close();
        }
    };
    const escape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            close();
            button.focus();
        }
    };

    button.onclick = () => (list.hidden ? open() : close());

    container.appendChild(button);
    container.appendChild(list);
    return container;
}

/*
 * Mouse wheel zoom while the map is in full screen, back to the setting (zoomonscrollwheel) when it leaves it.
 * For the engines that put their container in full screen with the browser API (MapLibre, Mapbox).
 */
export function wheelZoomInFullscreen(container: HTMLElement, setWheelZoom: (enabled: boolean) => void, wheelZoomSetting: boolean): void {
    const doc = container.ownerDocument;
    const update = () => {
        const full = doc.fullscreenElement ?? (doc as any).webkitFullscreenElement;
        setWheelZoom(full && (full === container || full.contains(container)) ? true : wheelZoomSetting);
    };
    doc.addEventListener('fullscreenchange', update);
    doc.addEventListener('webkitfullscreenchange', update);
}
