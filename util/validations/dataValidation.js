import resStatusConfig from "../../config/resStatusConfig.js";
import dataRanges from "../../consts/dataRanges.js";
import messages from "../../consts/messages.js";

function zoneInRange(value) {
    return numberIsInRange(parseInt(value), dataRanges.utmZone.min, dataRanges.utmZone.max);
}

export const isZoneValid = zone => {
    return zone && isNumeric(zone) && zoneInRange(zone);
}

export const isZoneLetterValid = zoneLetter => {
    return typeof zoneLetter === 'string' && /[C-X]/.test(zoneLetter);
}

export const isPrecisionValid = precision => {
    return precision && isNumeric(precision);
}

function isExist(value) {
    return value !== undefined && value !== null && value !== '';
}

function allRequireDataIsExist (data) {
    return isExist(data.lon) && isExist(data.lat); 
}

export const isNumeric = value => {
    return !isNaN(value);
}

function allRequireDataIsNumeric (data) {
    return isNumeric(data.lon)
            && isNumeric(data.lat); 
}

export const numberIsInRange = (value, minimum, maximum) => {
    return minimum <= value && value <= maximum;
}

function buildValidationObject(isValid, statusCode, message){
    return {
        isValid: isValid,
        statusCode: statusCode,
        message: message
    }
}

export const generateValidationObject = (data, rangeCheckFunction) => {
    if (!allRequireDataIsExist(data)){
        return buildValidationObject(false, resStatusConfig.Bad_Request, messages.missingDataErrMsg);
    } else if (!allRequireDataIsNumeric(data)){
        return buildValidationObject(false, resStatusConfig.Bad_Request, messages.dataIsNotNomericErrMsg);;
    } else if(!rangeCheckFunction(data)){
        return buildValidationObject(false, resStatusConfig.Bad_Request, messages.dataOutOfRangeErrMsg);;
    } else {
        return buildValidationObject(true, resStatusConfig.OK, messages.validDataMsg);;
    }
}