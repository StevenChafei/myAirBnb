import { Button, Text, View } from "react-native";

export default function SettingsScreen({ setToken }) {
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ color: "black", fontSize: 20, margin: 20 }}>
        Hello Around me
      </Text>

      {/* <Button
        title="Log Out"
        onPress={() => {
          setToken(null);
        }}
      /> */}
    </View>
  );
}
