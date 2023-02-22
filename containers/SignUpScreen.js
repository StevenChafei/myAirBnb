import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

export default function SignUpScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("steven");
  const [password, setPassword] = useState("steven");
  const [confirmPassword, setConfirmPassword] = useState("steven");

  const [error, setError] = useState("");

  const navigation = useNavigation();

  const submit = async () => {
    try {
      setError("");
      // 1 - FRONT Vérifier tous les champs sont remplis

      if (
        !email ||
        !username ||
        !password ||
        !confirmPassword ||
        !description
      ) {
        setError("Remplir tous les champs ");
        // return;
      }
      // 2 - FRONT vérifier que les mdp soient identiques
      if (password !== confirmPassword) {
        setError("Les mots de passe ne sont pas identiques");
      }

      // alert("vérifications passées ! ");

      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
        {
          email: email,
          username: username,
          description: description,
          password: password,
        }
      );
      console.log(response.data);
      if (response.data) {
        setToken(response.data.token);
      }
    } catch (error) {
      // 3 - BACK Vérifier que l'émail soit dispo
      // 4 - BACK Vérifier que les usernames soient dispo

      const message = error.response.data.error;
      const statusCode = error.response.status;

      if (statusCode === 400) {
        setError(message);
      }

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
          <Text style={styles.signupText}>Sign up</Text>
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

          <TextInput
            style={styles.inputDecoration}
            placeholder="password"
            autoCapitalize="none"
            placeholderTextColor="#696969"
            secureTextEntry={true}
            onChangeText={(input) => {
              setPassword(input);
            }}
            value={password}
          />

          <TextInput
            style={styles.inputDecoration}
            placeholder="confirm password"
            autoCapitalize="none"
            placeholderTextColor="#696969"
            secureTextEntry={true}
            onChangeText={(input) => {
              setConfirmPassword(input);
            }}
            value={confirmPassword}
          />

          <View style={styles.button}>
            <TouchableOpacity
              style={styles.buttondetail}
              onPress={() => {
                submit();
              }}
            >
              <Text style={{ fontSize: 24, color: "grey" }}> Sign up</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <View style={styles.account}>
              <Text>Already have an account ? Sign in</Text>
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
  },

  account: {
    marginTop: 20,
    alignItems: "center",
  },
});
