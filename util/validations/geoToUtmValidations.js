import { generateValidationObject , numberIsInRange } from "./dataValidation.js";
import dataRanges from "../../consts/dataRanges.js";

function allRequireDataIsInRange (data){
    const lat = parseFloat(data.lat);
    const lon = parseFloat(data.lon);

    return numberIsInRange (lat, dataRanges.geoToUtm.lat.min, dataRanges.geoToUtm.lat.max) 
            && numberIsInRange (lon, dataRanges.geoToUtm.lon.min, dataRanges.geoToUtm.lon.max);
}

export const checkGeoToUtmValidation = data => {
    return generateValidationObject(data, allRequireDataIsInRange);
}