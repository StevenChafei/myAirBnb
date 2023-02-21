import { useNavigation } from "@react-navigation/core";

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
  const navigation = useNavigation();
  return (
    <View
      style={
        {
          /*flexDirection: "column", justifyContent: "center"*/
        }
      }
    >
      <View style={styles.signuplogo}>
        <Image
          style={styles.signupImg}
          source={require("../assets/logoairbnb.png")}
          resizeMode="contain"
        />
        <Text style={styles.signupText}>Sign up</Text>
      </View>

      <View style={styles.signup}>
        <TextInput style={styles.inputDecoration} placeholder="email" />
        <TextInput
          multiline={true}
          numberOfLines={10}
          style={styles.inputDecorationText}
          placeholder="Describe yourself in a few words..."
        />

        <TextInput style={styles.inputDecoration} placeholder="username" />

        <TextInput
          style={styles.inputDecoration}
          placeholder="password"
          secureTextEntry={true}
        />

        <TextInput
          style={styles.inputDecoration}
          placeholder="confirm password"
          secureTextEntry={true}
        />

        <View style={styles.button}>
          <Button
            title="Sign up"
            onPress={async () => {
              const userToken = "secret-token";
              setToken(userToken);
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        >
          <Text style={styles.account}>Already have an account ? Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  signup: {
    margin: 25,
  },

  signuplogo: {
    justifyContent: "center",
  },

  signupText: {
    fontSize: 24,
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
    borderBottomColor: "pink",
    paddingBottom: 10,
    fontSize: 16,
    marginBottom: 40,
  },

  inputDecorationText: {
    fontSize: 16,
    padding: 5,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "pink",
    height: 100,
    marginBottom: 40,
  },

  button: {
    borderWidth: 3,
    borderStyle: "solid",
    borderColor: "pink",
    width: 200,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
  },

  account: {
    marginTop: 20,
    justifyContent: "center",
  },
});
