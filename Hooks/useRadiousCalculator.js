function useRadiousCalculator(long_p1, lat_p1, long_p2, lat_p2) {
  const earthRadius = 6371000; // Earth's radius in meters



  //long : is longtitude , p1 :is point 1       -- in degrees
  //lat : is lattitude , p1 :is point 1         -- in degrees

  //equation :

  //   a = sin²((φB - φA)/2) + cos φA * cos φB * sin²((λB - λA)/2)
  //   c = 2 * atan2( √a, √(1−a) )
  //   d = R ⋅ c

  // φB = lat_p2
  // φA = lat_p1
  // λB = long_p2
  // λA = long_p1

  //atan2(x,y) : calculates the Slope  of the line that goes from (0,0) to (x,y)
  //              and it returns the inverse tan of that slop (which is the angel)

  const r = 6371000   
  //radius of Earth in 

  const lat_p1_radians = lat_p2 * (Math.PI / 180);
  const lat_p2_radians = lat_p1 * (Math.PI / 180);

  const long_p1_radians = long_p1 * (Math.PI / 180);
  const long_p2_radians = long_p2 * (Math.PI / 180);

  const a = Math.pow(Math.sin((lat_p2_radians - lat_p1_radians) / 2), 2) +
            // a =  sin²((φB - φA)/2) +

            Math.cos(lat_p1_radians) * Math.cos(lat_p2_radians) *
            // cos φA * cos φB *

            Math.pow(Math.sin((long_p2_radians - long_p1_radians) / 2), 2);
            //sin²((λB - λA)/2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
           // c = 2 * atan2( √a, √(1−a) )

   const distance = r * c;
   

  return distance;
}
export default useRadiousCalculator;
