import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import axios from "axios";

export default function MapScreen({ navigation }) {
  const [userCoord, setUserCoord] = useState("valeur par defaut");
  const [arrayOfMarkers, setArrayOfMarkers] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        // console.log(status);
        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync();
          // console.log(location);

          //async
          setUserCoord({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });

          const response = await axios.get(
            `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`
          );

          setArrayOfMarkers(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading === true ? (
        <ActivityIndicator />
      ) : (
        <MapView
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: userCoord.latitude,
            longitude: userCoord.longitude,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2,
          }}
          showsUserLocation
          style={{ width: "100%", height: "100%" }}
        >
          {arrayOfMarkers.map((item) => {
            return (
              <Marker
                key={item._id}
                onPress={() => {
                  navigation.navigate("Room", {
                    roomId: item._id,
                  });
                }}
                coordinate={{
                  latitude: item.location[1],
                  longitude: item.location[0],
                }}
              />
            );
          })}
        </MapView>
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
