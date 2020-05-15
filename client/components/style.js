import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#3BE2AB",
    marginBottom: 40,
  },
  inputView: {
    width: "75%",
    backgroundColor: "white",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "black",
  },
  forgotPass: {
    color: "black",
    fontSize: 11,
  },
  authBtn: {
    width: "75%",
    backgroundColor: "#3BE2AB",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    fontWeight: "bold",
    color: "#003f5c",
  },
});
