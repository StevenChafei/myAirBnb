import { useRoute } from "@react-navigation/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";

import { Text, View, Button, StyleSheet, TextInput, Image } from "react-native";

export default function ProfileScreen({ navigation, route, setToken }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const { params } = useRoute();

  const submit = async () => {
    try {
      const response = await axios.get(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/:id"
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={styles.signuplogo}>
          <Image
            style={styles.signupImg}
            source={require("../assets/logoairbnb.png")}
            resizeMode="contain"
          />
        </View>
        <View style={styles.signup}>
          <TextInput
            style={styles.inputDecoration}
            placeholder="email"
            autoCapitalize="none"
            placeholderTextColor="#696969"
            value={email}
            onChangeText={(input) => {
              setEmail(input);
            }}
          />

          <TextInput
            style={styles.inputDecoration}
            placeholder="username"
            autoCapitalize="none"
            placeholderTextColor="#696969"
            value={username}
            onChangeText={(input) => {
              setUsername(input);
            }}
          />

          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputDecorationText}
            placeholderTextColor="#696969"
            placeholder="Describe yourself in a few words..."
            value={description}
            onChangeText={(input) => {
              setDescription(input);
            }}
          />
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.buttondetailUpdate}
              onPress={() => {
                // setToken(null);
              }}
            >
              <Text style={{ fontSize: 20, color: "#696969" }}>Update</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.button}>
            <TouchableOpacity
              style={styles.buttondetail}
              onPress={() => {
                setToken(null);
              }}
            >
              <Text style={{ fontSize: 20, color: "#696969" }}> Log out</Text>
            </TouchableOpacity>
          </View>

          {/* <Button
            style={styles.logoutButton}
            title="Log Out"
            onPress={() => {
              setToken(null);
              console.log(setToken);
            }}
          /> */}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    backgroundColor: "red",
  },

  signup: {
    margin: 25,
  },

  signuplogo: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  signupText: {
    marginTop: 20,
    fontSize: 22,
    color: "black",
    justifyContent: "center",
  },

  signupImg: {
    justifyContent: "center",
    height: 50,
    width: 50,
  },

  inputDecoration: {
    borderBottomWidth: 2,
    borderBottomColor: "#FFBAC0",
    paddingBottom: 10,
    fontSize: 16,
    marginBottom: 40,
  },

  inputDecorationText: {
    fontSize: 16,
    padding: 5,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#FFBAC0",
    height: 100,
    marginBottom: 40,
  },

  button: {
    justifyContent: "center",
    alignItems: "center",
  },

  buttondetail: {
    width: 200,
    height: 60,
    borderWidth: 3,
    borderStyle: "solid",
    borderColor: "#F9585E",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d3d3d3",
  },

  buttondetailUpdate: {
    width: 200,
    height: 60,
    borderWidth: 3,
    borderStyle: "solid",
    borderColor: "#F9585E",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
});
