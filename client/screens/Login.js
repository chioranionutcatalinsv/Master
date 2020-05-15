import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";
import { saveData } from "../helpers/localstorage";
import { styles } from "../components/style";
import { LOGIN, Routes } from "../defs/defs";
import axios from "axios";

export const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginPress = async () => {
    if (email === "" || password === "") {
      Alert.alert("Login attempt!", "Password or email is invalid!");
    } else {
      const response = await axios.post(LOGIN, {
        mail: email,
        password,
      });
      const { data } = response;
      const { ok, message } = data;
      if (ok) {
        let { user } = data;
        await saveData("logged_user", JSON.stringify(user));
        Alert.alert(`Login`, `${message}`);
        navigation.navigate(Routes.TrackOnMap);
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
          autoCapitalize="none"
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          autoCapitalize="none"
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <TouchableOpacity>
        <Text
          style={styles.forgotPass}
          onPress={() =>
            Alert.alert("Send us an email at smarttrackappkit@gmail.com")
          }
        >
          Forgot Password?
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.authBtn} onPress={handleLoginPress}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text
          style={styles.loginText}
          onPress={() => navigation.navigate("SignUp")}
        >
          First time, then please signUp !
        </Text>
      </TouchableOpacity>
    </View>
  );
};
