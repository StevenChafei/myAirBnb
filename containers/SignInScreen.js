import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

export default function SignInScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
        {
          email,
          password,
        }
      );
      setToken(response.data.token);

      console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={styles.signup}>
          <View style={styles.signuplogo}>
            <Image
              style={styles.signupImg}
              source={require("../assets/logoairbnb.png")}
              resizeMode="contain"
            />
            <Text style={styles.signupText}>Sign in</Text>
          </View>

          <TextInput
            style={styles.inputDecoration}
            placeholder="email"
            onSubmit={handleSubmit}
            autoCapitalize="none"
            placeholderTextColor="#696969"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
          />

          <TextInput
            style={styles.inputDecoration}
            placeholder="password"
            autoCapitalize="none"
            placeholderTextColor="#696969"
            secureTextEntry={true}
            onChangeText={(text) => {
              setPassword(text);
            }}
            value={password}
          />
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.buttondetail}
              onPress={async () => {
                const userToken = "secret-token";
                setToken(userToken);
              }}
            >
              <Text style={{ fontSize: 24, color: "grey" }}>Sign in</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <View style={styles.account}>
              <Text>No account ? Register</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  signup: {
    margin: 25,
  },

  signuplogo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  signupText: {
    fontSize: 22,
    color: "black",
    justifyContent: "center",
    marginBottom: 100,
    marginTop: 20,
  },

  signupImg: {
    marginTop: 20,
    justifyContent: "center",
    height: 100,
    width: 100,
  },
  inputDecoration: {
    borderBottomWidth: 2,
    borderBottomColor: "#FFBAC0",
    paddingBottom: 10,
    fontSize: 16,
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
  },

  account: {
    marginTop: 20,
    alignItems: "center",
  },
});
