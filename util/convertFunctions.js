import appConfig from '../config/appConfig.js';
import { isZoneValid, isZoneLetterValid, isPrecisionValid } from './validations/dataValidation.js';
import messages from '../consts/messages.js';

import utmLatlng from 'utm-latlng';

function extractZoneFromData(data) {
    if(data.hasOwnProperty('zone')){
        if (isZoneValid(data.zone)) return data.zone;
        
        console.log(messages.zoneIsNotValid);
    }
    return appConfig.UTM_ZONE;
}

function extractZoneLetterFromData(data) {
    if(data.hasOwnProperty('zoneLetter')){
        if (isZoneLetterValid(data.zoneLetter)) return data.zoneLetter;
        
        console.log(messages.zoneLetterIsNotValid);
    }
    return appConfig.UTM_LETTER;
}

export const convertUtmToGeo = (data) => {
    const utmZone = extractZoneFromData(data);
    const utmZoneLetter = extractZoneLetterFromData(data);
    const converter = new utmLatlng();
    const geoCords = converter.convertUtmToLatLng(data.lon, data.lat, utmZone, utmZoneLetter);
    return [geoCords.lng, geoCords.lat];
}

export const convertGeoToUtm = (data) => {
    if (!isPrecisionValid(data.precision)) console.log(messages.precisionNotNumeric);

    const converter = new utmLatlng();
    const precision = parseInt(data.precision) || appConfig.precisionWhenGeoToUtm;
    const utmCords = converter.convertLatLngToUtm(data.lat, data.lon, precision);
    return [utmCords.Easting, utmCords.Northing, utmCords.ZoneNumber, utmCords.ZoneLetter];
}