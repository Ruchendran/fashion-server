async function getLocation(pin) {
    return fetch(`https://pincodesinfo.in/api/pincode/${pin}`).then((data) => {
        return data.json()
    }).then((finalVal) => {
        try {
            return finalVal.results[0];
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
                return {routeValues:finalVal.routes[0].geometry.coordinates,distance:finalVal.routes[0].distance}
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
    if (AllRoutes.routeValues) {
        const frequentVal = Math.floor(AllRoutes.routeValues.length / 5);
        for (let i = 0; i < AllRoutes.routeValues.length; i = i + frequentVal) {
            routePoints.push(AllRoutes.routeValues[i])
        }
        routePoints = routePoints.reverse();
        for (let i = 0; i < routePoints.length; i++) {
            let cityName = await getCity(routePoints[i][0], routePoints[i][1]);
            cityNames.push(cityName)
        }
    }
    const deleteDup=new Set(cityNames)
    const arrangedUniqLocation=[...deleteDup]
    return {arrangedUniqLocation:arrangedUniqLocation ?? null,distance:AllRoutes.distance}
};

module.exports = { GeoRouting }
///routes