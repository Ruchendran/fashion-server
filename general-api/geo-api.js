async function getLocation(pin) {
    return fetch(`https://api.zippopotam.us/IN/${pin}`).then((data) => {
        return data.json()
    }).then((finalVal) => {
        try {
            return finalVal.places[0];
        }
        catch {
            return null;
        }
    })
}
async function getRoute(startData, endData) {
    if (startData && endData) {
        return fetch(`https://router.project-osrm.org/route/v1/driving/${endData.longitude},${endData.latitude};${startData.longitude},${startData.latitude}?overview=full&geometries=geojson`).then((data) => {
            return data.json()
        }).then((finalVal) => {
            try {
                return finalVal.routes[0].geometry.coordinates
            }
            catch {
                return null;
            }
        })
    }
    return null;
}
async function getCity(long, lat) {
    return fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`).then((data) => {
        return data.json()
    }).then((finalVal) => {
        try {
            return finalVal.locality;
        }
        catch {
            return null;
        }
    })

}
async function GeoRouting(startPincode, destinPincode) {
    const startData = await getLocation(startPincode);
    const endData = await getLocation(destinPincode);
    const AllRoutes = await getRoute(startData, endData);
    let routePoints = [];
    const cityNames = [];
    if (AllRoutes) {
        const frequentVal = Math.floor(AllRoutes.length / 5);
        for (let i = 0; i < AllRoutes.length; i = i + frequentVal) {
            routePoints.push(AllRoutes[i])
        }
        routePoints = routePoints.reverse();
        for (let i = 0; i < routePoints.length; i++) {
            let cityName = await getCity(routePoints[i][0], routePoints[i][1]);
            cityNames.push(cityName)
        }
    }
    // if(cityNames){
    //     return cityNames;
    // }
    return cityNames ?? null;
};

module.exports = { GeoRouting }
///routes