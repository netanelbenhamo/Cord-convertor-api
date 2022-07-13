import { generateValidationObject , numberIsInRange } from "./dataValidation.js";
import dataRanges from "../../consts/dataRanges.js";

function allRequireDataIsInRange (data){
    const lat = parseFloat(data.lat);
    const lon = parseFloat(data.lon);

    return numberIsInRange (lat, dataRanges.utmToGeo.lat.min, dataRanges.utmToGeo.lat.max) 
            && numberIsInRange (lon, dataRanges.utmToGeo.lon.min, dataRanges.utmToGeo.lon.max);
}

export const checkUtmToGeoValidation = data => {
    return generateValidationObject(data, allRequireDataIsInRange);
}