import React, { useState } from "react";
import { styles } from "../components/style";
import axios from "axios";
import {
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { SIGN_UP } from "../defs/defs";
import { Routes } from "../defs/defs";

export const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [group, setGroupName] = useState("");

  const handleSignUp = async () => {
    if (email === "" || password === "" || group === "") {
      Alert.alert("Sign Up attempt!", "Password or email or Group is invalid!");
    } else {
      const body = {
        mail: email,
        password,
        group_name: group,
      };

      const response = await axios.post(SIGN_UP, body);
      const { data } = response;
      const { ok, message } = data;
      if (ok) {
        Alert.alert(`Sign UP OK`, String(message));
        //const userStored = await storeData('user', {userId: data.user.id, userGroup: data.user.group_id, email: user.data.mail});
        navigation.navigate(Routes.TrackOnMap, { user: data.user });
      } else {
        Alert.alert(`Auth not ok.`, `${message}`);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/pinlogo.png")} />
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          autoCapitalize="none"
          placeholder="Your account email..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          autoCapitalize="none"
          secureTextEntry
          style={styles.inputText}
          placeholder="Set a password..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          autoCapitalize="none"
          placeholder="Group/Team you want to join or create..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setGroupName(text)}
        />
      </View>
      <TouchableOpacity style={styles.authBtn} onPress={handleSignUp}>
        <Text style={styles.loginText}>SignUp</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text
          style={styles.loginText}
          onPress={() => navigation.navigate("Login")}
        >
          Already have a user, then please login !
        </Text>
      </TouchableOpacity>
    </View>
  );
};
