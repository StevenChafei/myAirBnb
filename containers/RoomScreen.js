import React, { useState, useEffect } from "react";
import axios from "axios";

import { Entypo } from "@expo/vector-icons";

import { Text, View, Image, StyleSheet, ScrollView } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import Swiper from "react-native-swiper";

import ReadMore from "@fawazahmed/react-native-read-more";

const RoomScreen = ({ route }) => {
  // console.log(route);
  const roomId = route.params.roomId;

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/${roomId}`
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
    <View style={{ backgroundColor: "white" }}>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <Image
            style={styles.logo}
            source={require("../assets/logoairbnb.png")}
            resizeMode="contain"
          />
        </View>

        <Swiper
          style={styles.wraper}
          dotColor="white"
          activeDotColor="salmon"
          autoplay
          autoplayTimeout={4}
        >
          {data.photos.map((slide) => {
            return (
              <View style={styles.slide}>
                <Image
                  source={{ uri: slide.url }}
                  style={{ height: "100%", width: "100%" }}
                />
              </View>
            );
          })}
        </Swiper>

        <View>
          <Text numberOfLines={1} style={styles.title}>
            {data.title}
          </Text>

          <View style={styles.allreviews}>
            <Text style={styles.ratingValue}>
              {generateStars(data.ratingValue)}
            </Text>
            <Text style={styles.value}>{data.reviews} reviews</Text>
            <Image
              style={styles.avatar}
              source={{ uri: `${data.user.account.photo.url}` }}
            />
          </View>

          <View>
            <ReadMore numberOfLines={3} style={styles.description}>
              <Text>{data.description}</Text>
            </ReadMore>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RoomScreen;

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
    alignItems: "center",
    marginVertical: 5,
  },

  wraper: {
    height: 300,
  },
  slide: {
    height: 300,
  },

  title: {
    fontSize: 20,
    width: 290,
    marginTop: 20,
    marginHorizontal: 10,
  },

  allreviews: {
    flexDirection: "row",
    alignItems: "center",
    // marginVertical: 10,
    marginHorizontal: 10,
  },

  value: {
    color: "grey",
    paddingLeft: 10,
  },

  description: {
    marginVertical: 15,
    marginHorizontal: 10,
    fontSize: 14,
  },

  avatar: {
    width: "100%",
    height: 70,
    width: 70,
    borderRadius: 50,
    marginLeft: 100,
    alignItems: "flex-end",
    // marginHorizontal: 20,
  },

  // MAP SETTINGS
});
