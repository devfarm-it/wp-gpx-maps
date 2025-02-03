interface Waypoint {
    lat: number;
    lon: number;
    sym?: string;
    type?: string;
    img?: string;
    name?: string;
    desc?: string;
}

interface Params {
    targetId: string;
    mapType: string;
    mapData: any[];
    graphDist: any[];
    graphEle: any[];
    graphSpeed: any[];
    graphHr: any[];
    graphAtemp: any[];
    graphCad: any[];
    graphGrade: any[];
    waypoints: Waypoint[];
    unit: string;
    unitspeed: string;
    color1: string[];
    color2: string;
    color3: string;
    color4: string;
    color5: string;
    color6: string;
    color7: string;
    chartFrom1: string;
    chartTo1: string;
    chartFrom2: string;
    chartTo2: string;
    startIcon: string;
    waypointIcon: string;
    endIcon: string;
    currentIcon: string;
    zoomOnScrollWheel: string;
    langs: any;
    pluginUrl: string;
    usegpsposition: string;
    currentpositioncon: string;
    TFApiKey: string;
    MapBoxApiKey: string;
}

interface LangTranslation {
    altitude: string,
    currentPosition: string,
    speed: string,
    grade: string,
    heartRate: string,
    atemp: string,
    cadence: string,
    goFullScreen: string,
    exitFullFcreen: string,
    hideImages: string,
    showImages: string,
    backToCenter: string
}

interface ChartUom {
    suf: string;
    dec: number;
}

interface ChartLabels {
    label_x: ChartUom;
    label_y: ChartUom;
}


type LatLng = [number, number];

interface MapEngine<T> {

    map: T | null;

    Bounds: Array<number[]> | null;

    EventSelectChart: null | Function;

    init(targetElement: HTMLElement, mapType: string, scrollWheelZoom: boolean, ApiKey: string | null | undefined): void;

    AppPolylines(mapData: Array<[number, number] | null>, colors: string[], currentIcon: string | null, startIcon: string | null, endIcon: string | null): void;

    AddWaypoints(waypoints: any, waypointIcon: string | null): void;

    MoveMarkerToPosition(LatLon: [number,number], updateChart: boolean): void;

    SetCurrentGPSPosition(LatLon: [number,number], currentpositioncon : string, lng : LangTranslation): void;

    AddPhotos(photos: any[]): void;

    CenterMap(): void;
}
