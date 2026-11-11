/*
 * Default marker icons, drawn here and used as data URIs: a map loads nothing from third-party servers for them
 * (they used to come from maps.google.com, which sent the IP address of every visitor to Google).
 * 32 × 32 like the old ones, so the sizes and anchors set by the engines stay the same.
 */
const svg = (body: string): string =>
    'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">${body}</svg>`);

/* Waypoint without its own icon: a red flag on a pole */
export const WAYPOINT_ICON = svg(
    '<path d="M9 3v27" stroke="#4b5563" stroke-width="2.5" stroke-linecap="round"/>' +
    '<path d="M10 4h16l-4 5.5 4 5.5H10z" fill="#dc2626" stroke="#7f1d1d" stroke-width="1.2" stroke-linejoin="round"/>'
);

/* Current position (marker that follows the chart, GPS position): a blue dot with a white ring */
export const CURRENT_POSITION_ICON = svg(
    '<circle cx="16" cy="16" r="13" fill="#2563eb" fill-opacity="0.25"/>' +
    '<circle cx="16" cy="16" r="7.5" fill="#2563eb" stroke="#fff" stroke-width="3"/>'
);
