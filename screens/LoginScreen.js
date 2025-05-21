import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { UserContext } from "./UserContext";

const LoginScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const { setUser } = useContext(UserContext); // UserContext에서 setUser 가져오기

  const handleLogin = async () => {
    try {
      const response = await fetch("http://13.209.67.129:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        console.log("로그인 성공:", result);
        console.log("로그인 성공:", result.userInfo);
        setUser(result.userInfo);  // 로그인한 사용자 정보 저장

        Alert.alert(
          "로그인 성공",
          result.message || "환영합니다!",
          [{ text: "확인", onPress: () => navigation.navigate("CheckIn") }],
          { cancelable: false }
        );
      } else {
        console.log("로그인 실패:", result.message);
        Alert.alert("로그인 실패", result.message || "이름 또는 전화번호를 확인하세요.");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      Alert.alert("서버 오류", "서버와의 통신 중 문제가 발생했습니다.");
    }
  };

  const handleCancel = () => {
    setName(""); // 입력 필드 초기화
    setPhone(""); // 입력 필드 초기화
  };

  const handleSignUp = () => {
    navigation.navigate("SignUp"); // 회원가입 화면으로 이동
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>로그인</Text>
        <TouchableOpacity onPress={handleSignUp} style={styles.signUpButton}>
          <Text style={styles.signUpText}>회원가입</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <View style={styles.row}>
          <Text style={styles.label}>이름 :</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="이름 입력"
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>폰번호 :</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="010-1234-5678"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.confirmButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>확인</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.buttonText}>취소</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d8e7ef",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  signUpButton: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  signUpText: {
    fontWeight: "bold",
  },
  form: {
    marginTop: 40,
    gap: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    width: 80,
    fontWeight: "bold",
    fontSize: 16,
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 4,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
  },
  confirmButton: {
    backgroundColor: "#6699ee",
    padding: 15,
    flex: 1,
    alignItems: "center",
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: "white",
    padding: 15,
    flex: 1,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  buttonText: {
    fontWeight: "bold",
  },
});

export default LoginScreen;
