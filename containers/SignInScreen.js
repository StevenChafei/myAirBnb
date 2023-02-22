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
  const [email, setEmail] = useState("sleiman@mail.com");
  const [password, setPassword] = useState("sleiman");

  const [error, setError] = useState("");

  const navigation = useNavigation();

  const submit = async () => {
    try {
      setError("");
      // 1 - FRONT Vérifier tous les champs sont remplis

      if (!email || !password) {
        setError("Remplir tous les champs ");
        return;
      }

      alert("vérifications passées ! ");

      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
        {
          email: email,
          password: password,
        }
      );
      console.log(response.data);
      if (response.data) {
        setToken(response.data.token);
      }
    } catch (error) {
      // 3 - BACK Vérifier que l'émail est valide
      // 4 - BACK Vérifier que le password est valide
      console.log(message);
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
            autoCapitalize="none"
            placeholderTextColor="#696969"
            value={email}
            onChangeText={(input) => {
              setEmail(input);
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
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.buttondetail}
              onPress={() => {
                submit();
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
