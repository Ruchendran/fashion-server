async function getLocation(pin){
   return fetch(`https://api.zippopotam.us/IN/${pin}`).then((data)=>{
    return data.json()
   }).then((finalVal)=>{
    return finalVal.places[0];
   })
}
async function getRoute(startData,endData){
    
    return fetch(`https://router.project-osrm.org/route/v1/driving/${endData.longitude},${endData.latitude};${startData.longitude},${startData.latitude}?overview=false&steps=true`).then((data)=>{
        return data.json()
    }).then((finalVal)=>{
        return finalVal.routes[0].legs[0].summary;
    })
}
async function GeoRouting(startPincode,destinPincode) { 
  const startData=await getLocation(startPincode);
  const endData=await getLocation(destinPincode);
//   console.log(startData,endData);
  const AllRoutes=await getRoute(startData,endData);
  const routeString=['']
  const splitString=AllRoutes.split('-');
//   splitString.forEach((val)=>{
//     routeString.push(val.split('-'))
//   });
//   splitString.forEach((val)=>{
//     routeString.push(val.split(" "));
//   })
const updRoute=splitString.map((eachStr)=>{
    if(eachStr.includes(",")){
       const nestedSplit= eachStr.split(",").map((val)=>{
            return val.trim()
        });
        return nestedSplit.reverse();
    }
    return eachStr.trim();
})
 return updRoute.reverse().flat(Infinity)
};

module.exports={GeoRouting}
///routesss.sussserzssussetttiserrrisvethiz