import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";

import { Entypo } from "@expo/vector-icons";

import {
  Button,
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  ImageBackground,
} from "react-native";

import axios from "axios";
import { ActivityIndicator } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";

export default function HomeScreen() {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  const { height, width } = useWindowDimensions();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms`
        );
        // console.log(response.data);
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

  const generateStars = (ratingValue) => {
    const starsArray = [];
    for (let i = 0; i < 5; i++) {
      if (i < ratingValue) {
        starsArray.push(
          <Entypo name="star" size={24} color="#FFB100" key={i} />
        );
      } else {
        starsArray.push(<Entypo name="star" size={24} color="grey" key={i} />);
      }
    }
    return starsArray;
  };

  return isLoading === true ? (
    <ActivityIndicator />
  ) : (
    // <ScrollView>
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
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Room", { roomId: item._id });
            }}
          >
            <ImageBackground
              style={[styles.photos, { width: width * 0.9 }]}
              source={{ uri: item.photos[0].url }}
            >
              <View>
                <Text style={styles.price}>{item.price} €</Text>
              </View>
            </ImageBackground>

            <Text numberOfLines={1} style={styles.title}>
              {item.title}
            </Text>

            <Image
              style={styles.avatar}
              source={{ uri: `${item.user.account.photo.url}` }}
            />

            <View style={styles.allreviews}>
              <Text style={styles.ratingValue}>
                {generateStars(item.ratingValue)}
              </Text>
              <Text style={styles.value}>{item.reviews} reviews</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
    // </ScrollView>
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
    marginHorizontal: 20,
    // borderBottomWidth: 2,
    // borderBottomColor: "black",
  },

  photos: {
    height: 220,
    justifyContent: "flex-end",
  },

  price: {
    fontSize: 26,
    backgroundColor: "black",
    color: "white",
    width: 100,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  title: {
    fontSize: 20,
    width: 290,
    marginVertical: 15,
  },

  allreviews: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },

  value: {
    color: "grey",
    paddingLeft: 10,
  },

  ratingValue: {
    paddingBottom: 5,
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
