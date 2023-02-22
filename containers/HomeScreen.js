import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import { Button, Text, View, FlatList } from "react-native";
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
    <View>
      <FlatList
        // numColumns={3}
        // horizontal={false}
        style={{ flexDirection: "column", alignContent: "center" }}
        data={data}
        keyExtractor={(item) => String(item._id)}
        renderItem={({ item }) => {
          return (
            <Text style={{ margin: 20 }}>
              {item.price}
              {item.title}
              {item.description}
              {item.picture_id}
              {item.user.account.username}
            </Text>
          );
        }}
      />
    </View>
  );
}
