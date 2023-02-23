import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";

import {
  Button,
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms`
        );
        console.log(response.data);
        // Je stocke le résultat dans data
        setData(response.data);
        // Je fais paser isLoading à false
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={{ backgroundColor: "white" }}>
      <View style={{ alignItems: "center" }}>
        <Image
          style={styles.logo}
          source={require("../assets/logoairbnb.png")}
          resizeMode="contain"
        />
      </View>

      <FlatList
        style={styles.allConfig}
        data={data}
        keyExtractor={(item) => String(item._id)}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("HomeDetailScreen");
              }}
            >
              <Image
                style={styles.photos}
                source={{ uri: item.photos[0].url }}
              />
            </TouchableOpacity>

            <Text style={styles.price}>{item.price} €</Text>
            <Text numberOfLines={1} style={styles.title}>
              {item.title}
            </Text>
            <Image
              style={styles.avatar}
              source={{ uri: `${item.user.account.photo.url}` }}
            />
            <Text style={styles.ratingValue}>{item.ratingValue}</Text>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
    alignItems: "center",
    marginTop: 10,
  },

  allConfig: {
    flexDirection: "column",
    alignContent: "center",
    marginTop: 20,
    marginHorizontal: 15,
    // borderBottomWidth: 2,
    // borderBottomColor: "black",
  },

  photos: {
    width: "100%",
    height: 200,
    position: "relative",
  },

  price: {
    fontSize: 26,
    backgroundColor: "black",
    color: "white",
    width: 100,
    padding: 10,
    position: "absolute",
    bottom: 120,
    justifyContent: "center",
  },

  title: {
    fontSize: 20,
    width: 290,
    marginVertical: 15,
  },

  ratingValue: {
    marginVertical: 15,
    // borderBottomWidth: 2,
    // borderBottomColor: "black",
  },

  avatar: {
    width: "100%",
    height: 70,
    width: 70,
    borderRadius: 50,
    position: "absolute",
    right: 0,
    bottom: 20,
  },
});
