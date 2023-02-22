import { useRoute } from "@react-navigation/core";
// import React, { useState, useEffect } from "react";
import { Text, View, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen({ navigation, route, setToken }) {
  // const navigation = useNavigation();
  const { params } = useRoute();
  // const [userToken, setUserToken] = useState(null);

  return (
    // Object {
    //   "description": "Sleiman",
    //   "email": "sleiman@mail.com",
    //   "id": "63f60e6a283e4f9ff8a3e3a8",
    //   "photo": null,
    //   "rooms": Array [],
    //   "token": "iuT043y_Um0MqOuPonzLbr2rB7zEZaclRWRsKbSeSyNTy2A812MwhciGKqWiz2gg",
    //   "username": "sleiman",
    // }
    <View>
      {/* <View>
        <Text>ProfileScreen</Text>
        <Button
          onPress={async () => {
            console.log(setToken);
            await AsyncStorage.setItem("setToken", setToken);
            alert("Mdp enregistré ");
          }}
          title="Enregistrer le mdp"
        />

        <Button
          onPress={async () => {
            const password = await AsyncStorage.getItem("secretPassword");
            console.log(setToken);
          }}
          title="Afficher le mdp"
        />
        <Button
          onPress={async () => {
            await AsyncStorage.removeItem("secretPassword");
            alert("Mdp supprimé !");
          }}
          title="Supprimer le mdp"
        />
      </View> */}
      <View>
        <Button
          title="Go to Setting"
          onPress={() => {
            navigation.navigate("Settings");
          }}
        />
      </View>
    </View>
  );
}
