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
    <View>
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
        <Button
          title="Sign in"
          onPress={async () => {
            const userToken = "secret-token";
            setToken(userToken);
          }}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text>No account ? Register</Text>
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
});
