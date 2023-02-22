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
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();

  const handleSignup = async () => {
    //   Je fais disparaitre le message d'erreur
    setErrorMessage("");
    try {
      //   Requête axios :
      // - Premier argument : l'url que j'interroge
      // - deuxième : le body que j'envoie
      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
        {
          email: email,
          username: username,
          description: description,
          password: password,
          confirmPassword: confirmPassword,
        }
      );
      //   Si je reçois bien un token
      if (response.data.token) {
        // Cookies.set("token-vinted", response.data.token, { expires: 14 });
        // Je l'enregistre dans mon state et mes cookies
        setToken(response.data.token);
        // Et je redirige vers Home
      }
    } catch (error) {
      //   console.log(error.message);
      console.log(error.response.data);

      console.log(error.response.status);
      //   Si je reçois un message d'erreur "This email already has an account"
      if (error.response.data.message === "This email already has an account") {
        setErrorMessage(
          "Cet email est déjà utilisé, veuillez créer un compte avec un mail valide."
        );
      }
      //   Si je reçois un message d'erreur "Missing parameters"
      if (error.response.data.message === "Missing parameters") {
        setErrorMessage("Veuillez remplir tous les champs svp.");
      }
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
            onSubmit={handleSignup}
            style={styles.inputDecoration}
            placeholder="email"
            autoCapitalize="none"
            placeholderTextColor="#696969"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
          />

          <TextInput
            style={styles.inputDecoration}
            placeholder="username"
            autoCapitalize="none"
            placeholderTextColor="#696969"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
            }}
          />

          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputDecorationText}
            placeholderTextColor="#696969"
            placeholder="Describe yourself in a few words..."
            value={description}
            onChangeText={(text) => {
              setDescription(text);
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

          <TextInput
            style={styles.inputDecoration}
            placeholder="confirm password"
            autoCapitalize="none"
            placeholderTextColor="#696969"
            secureTextEntry={true}
            onChangeText={(text) => {
              setConfirmPassword(text);
            }}
            value={confirmPassword}
          />

          <View style={styles.button}>
            <TouchableOpacity
              style={styles.buttondetail}
              onPress={async () => {
                const userToken = "secret-token";
                setToken(userToken);
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
