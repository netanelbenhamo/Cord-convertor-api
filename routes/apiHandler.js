import answerStructure from '../consts/answerStructure.js';
import {checkGeoToUtmValidation} from '../util/validations/geoToUtmValidations.js';
import {checkUtmToGeoValidation} from '../util/validations/utmToGeoValidations.js';
import {convertUtmToGeo, convertGeoToUtm} from '../util/convertFunctions.js';

import { Router } from 'express';

class apiHandler {
    router = Router({caseSensitive: true});

    constructor() {
        this.initializeRoutes();
    }

    buildResponseMessage(responseSettings, responseAnswer){
        const responseMessage = {
            status: responseSettings.statusCode,
            message: responseSettings.message
        }

        if (responseAnswer){
            responseMessage.lon = responseAnswer[answerStructure.lonLocation];
            responseMessage.lat = responseAnswer[answerStructure.latLocation];
            
            if(responseAnswer.length === answerStructure.geoToUtmAnswerLength){
                responseMessage.ZoneNumber = responseAnswer[answerStructure.zoneNumberLocation];
                responseMessage.ZoneLetter = responseAnswer[answerStructure.zoneLetterLocation];
            }
        }

        return responseMessage;
    }

    sendResponse(res, responseSettings, responseAnswer){
        res.status(responseSettings.statusCode)
        .send(this.buildResponseMessage(responseSettings, responseAnswer))
        .end();
    }

    handleData(res, data, validationFunction, convertFunction){
        const dataValidationObject = validationFunction(data);
        console.log("received data: ", data);
        
        console.log(dataValidationObject.message);
        let responseAnswer = undefined;
        
        if (dataValidationObject.isValid)
            responseAnswer = convertFunction(data);
        
        this.sendResponse(res, dataValidationObject, responseAnswer);
    }

    initializeRoutes() {
        this.router.get('/utmToGeo', (req, res) => {
            this.handleData(res, req.query, checkUtmToGeoValidation, convertUtmToGeo);
        });

        this.router.get('/geoToUtm', (req, res) => {
            this.handleData(res, req.query, checkGeoToUtmValidation, convertGeoToUtm);
        });
    }
}

export default apiHandler;