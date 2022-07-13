export default Object.freeze({
    utmToGeo: {
        lat:{
            min: 0,
            max: 10000000
        },
        lon: {
            min: 160000,
            max: 834000
        }
    },
    geoToUtm: {
        lat:{
            min: -90,
            max: 90
        },
        lon: {
            min: -180,
            max: 180
        }
    },
    utmZone: {
        min: 1,
        max: 60
    }
});