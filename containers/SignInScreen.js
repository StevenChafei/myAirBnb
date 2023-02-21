import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.signup}>
        <View style={styles.signuplogo}>
          <Image
            style={styles.signupImg}
            source={require("../assets/logoairbnb.png")}
            resizeMode="contain"
          />
          <Text style={styles.signupText}>Sign in</Text>
        </View>

        <TextInput style={styles.inputDecoration} placeholder="email" />

        <TextInput
          style={styles.inputDecoration}
          placeholder="password"
          secureTextEntry={true}
        />
        <View style={styles.button}>
          <Button
            style={styles.buttondetail}
            title="Sign in"
            onPress={async () => {
              const userToken = "secret-token";
              setToken(userToken);
            }}
          />
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
    borderWidth: 3,
    borderStyle: "solid",
    borderColor: "#F9585E",
    width: 200,
    height: 60,
    justifyContent: "center",
    borderRadius: 40,
  },

  buttondetail: {
    alignItems: "center",
    color: "black",
  },

  account: {
    marginTop: 20,
    alignItems: "center",
  },
});
