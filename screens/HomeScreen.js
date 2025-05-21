//screens/HomeScreen.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("Login")}> 
        <Text style={styles.text}>로그인 및 회원가입</Text>
      </TouchableOpacity>
       */}
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}> 
          <Text style={styles.text}>입실</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("CheckOut")}> 
          <Text style={styles.text}>퇴실</Text>
        </TouchableOpacity>
      </View>
      
      {/* <TouchableOpacity style={styles.infoButton} onPress={() => navigation.navigate("Profile")}> 
        <Text style={styles.text}>내 정보 보기</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FCEBE9", alignItems: "center", justifyContent: "center", padding: 20 },
  loginButton: { position: "absolute", top: 40, left: 20, backgroundColor: "white", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5, elevation: 2 },
  row: { flexDirection: "row", marginTop: 50 },
  button: { backgroundColor: "white", width: 120, height: 120, justifyContent: "center", alignItems: "center", marginHorizontal: 10, borderRadius: 10, elevation: 2 },
  infoButton: { backgroundColor: "white", width: "80%", height: 80, justifyContent: "center", alignItems: "center", marginTop: 40, borderRadius: 10, elevation: 2 },
  text: { fontSize: 18, fontWeight: "bold" },
});
