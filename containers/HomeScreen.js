import { useNavigation } from "@react-navigation/core";
import { Button, Text, View } from "react-native";

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Welcome home!</Text>
    </View>
  );
}
