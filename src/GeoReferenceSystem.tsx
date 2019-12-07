import crs from './crs-defs.json';
export class GeoReferenceSystem {
    constructor(
        public label: string,
        public value: string
    ) {

    }
    //Los valores se pueden obtener de https://mygeodata.cloud/cs2cs/
    public static GetArray(): GeoReferenceSystem[] {
        return [
            new GeoReferenceSystem("Lambert Norte", crs["EPSG:5456"]),
            new GeoReferenceSystem("Lambert Sur", crs["EPSG:5457"]),
            new GeoReferenceSystem("CRTM05", crs["EPSG:5367"]),
            new GeoReferenceSystem("WGS84", crs["EPSG:4326"])
        ]
    }
}