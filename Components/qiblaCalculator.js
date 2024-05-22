export const getQiblaDirection = (latitude, longitude) => {
    const MeccaLatitude = 21.4225; // Latitude of Mecca, Saudi Arabia
    const MeccaLongitude = 39.8262; // Longitude of Mecca, Saudi Arabia
  
    const userLatitude = latitude * Math.PI / 180;
    const userLongitude = longitude * Math.PI / 180;
    const qiblaLatitude = MeccaLatitude * Math.PI / 180;
    const qiblaLongitude = MeccaLongitude * Math.PI / 180;
  
    const y = Math.sin(qiblaLongitude - userLongitude) * Math.cos(qiblaLatitude);
    const x = Math.cos(userLatitude) * Math.sin(qiblaLatitude) - Math.sin(userLatitude) * Math.cos(qiblaLatitude) * Math.cos(qiblaLongitude - userLongitude);
    const direction = Math.atan2(y, x);
  
    const qiblaLatitudeDegrees = qiblaLatitude * 180 / Math.PI;
    const qiblaLongitudeDegrees = qiblaLongitude * 180 / Math.PI;
  
    return {
      latitude: qiblaLatitudeDegrees,
      longitude: qiblaLongitudeDegrees,
    };
  };
  