import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

const arrayOfMarkers = [
  {
    latitude: 43.597473,
    longitude: 1.44438,
    title: "Place de l'europe",
    description: "Description d'une place",
  },
];

export default function MapScreen() {
  const [latitude, setLatidude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPermission = async () => {
      try {
        // 1 Je vais demander la permission
        const { status } = await Location.requestForegroundPermissionsAsync();
        console.log(status);
        if (status === "granted") {
          console.log("On passe à la suite");
          // 2 J'accède aux coordonnées
          const location = await Location.getCurrentPositionAsync();
          console.log(location);
          setLatidude(location.coords.latitude);
          setLongitude(location.coords.longitude);
          setIsLoading(false);
        } else {
          alert("Permission refusée");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPermission();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading === true ? (
        <ActivityIndicator />
      ) : (
        <>
          <Text>latitude: {latitude}</Text>
          <Text>longitude: {longitude}</Text>
          <MapView
            style={styles.map}
            showsUserLocation
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.02,
              longitudeDelta: 0.04,
            }}
          >
            {arrayOfMarkers.map((marker) => {
              return (
                <Marker
                  key={marker.latitude}
                  coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                  }}
                />
              );
            })}
          </MapView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    height: 500,
    width: "100%",
  },
});

// const arrayOfMarkers = [
//   {
//     latitude: 43.597473,
//     longitude: 1.44438,
//     title: "Place de l'europe",
//     description: "Description d'une place",
//   },
//   {
//     latitude: 43.60971450805664,
//     longitude: 1.4308867454528809,
//     title: "Place des Carmes",
//     description: "Description d'une place",
//   },
// ];

// export default function MapScreen() {
//   const [latitude, setLatidude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   useEffect(() => {
//     const getPermission = async () => {
//       try {
//         // 1 Je vais demander la permission
//         const { status } = await Location.requestForegroundPermissionsAsync();
//         console.log(status);
//         if (status === "granted") {
//           console.log("On passe à la suite");
//           // 2 J'accède aux coordonnées
//           const location = await Location.getCurrentPositionAsync();
//           console.log(location);
//           setLatidude(location.coords.latitude);
//           setLongitude(location.coords.longitude);
//           setIsLoading(false);
//         } else {
//           alert("Permission refusée");
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getPermission();
//   }, []);
//   return (
//     <View style={styles.container}>
//       {isLoading === true ? (
//         <ActivityIndicator />
//       ) : (
//         <>
//           <Text>latitude: {latitude}</Text>
//           <Text>longitude: {longitude}</Text>
//           <MapView
//             style={styles.map}
//             showsUserLocation
//             provider={PROVIDER_GOOGLE}
//             initialRegion={{
//               latitude: latitude,
//               longitude: longitude,
//               latitudeDelta: 0.02,
//               longitudeDelta: 0.04,
//             }}
//           >
//             {arrayOfMarkers.map((marker) => {
//               return (
//                 <Marker
//                   key={marker.latitude}
//                   coordinate={{
//                     latitude: marker.latitude,
//                     longitude: marker.longitude,
//                   }}
//                 />
//               );
//             })}
//           </MapView>
//         </>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   map: {
//     height: 500,
//     width: "100%",
//   },
// });
