import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  Button,
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
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();

  return (
    <KeyboardAwareScrollView>
      <View style={{ flex: 1 }}>
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
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
          />

          <TextInput style={styles.inputDecoration} placeholder="username" />

          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.inputDecorationText}
            placeholder="Describe yourself in a few words..."
          />

          <TextInput
            style={styles.inputDecoration}
            placeholder="password"
            secureTextEntry={true}
            onChangeText={(text) => {
              setPassword(text);
            }}
            value={password}
          />

          <TextInput
            style={styles.inputDecoration}
            placeholder="confirm password"
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
