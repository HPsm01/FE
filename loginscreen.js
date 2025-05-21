import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function LoginScreen({ navigation }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      {/* 헤더 영역 */}
      <View style={styles.header}>
        <Text style={styles.headerText}>로그인</Text>
        <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.signupText}>회원가입</Text>
        </TouchableOpacity>
      </View>

      {/* 입력 필드 */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>아이디 :</Text>
        <TextInput
          style={styles.input}
          placeholder="아이디 입력"
          value={id}
          onChangeText={setId}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>패스워드 :</Text>
        <TextInput
          style={styles.input}
          placeholder="비밀번호 입력"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {/* 버튼 영역 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.confirmButton}>
          <Text style={styles.buttonText}>확인</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelText}>취소</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D7E7F3",
    padding: 20,
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#999",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  signupButton: {
    backgroundColor: "#FFF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  signupText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  confirmButton: {
    backgroundColor: "#5B90F6",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: "#FFF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
