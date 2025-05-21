import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const CheckInScreen = ({ navigation }) => {
  const handleCheckIn = () => {
    // 입실 처리 로직
    alert("입실 완료");
  };

  const handleViewProfile = () => {
    navigation.navigate("Profile"); // ProfileScreen으로 이동
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>입실 화면</Text>

      <TouchableOpacity style={styles.button} onPress={handleCheckIn}>
        <Text style={styles.buttonText}>입실하기</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={handleViewProfile}>
        <Text style={styles.buttonText}>내 정보 보기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d8e7ef",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 40,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#6699ee",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 20,
  },
  secondaryButton: {
    backgroundColor: "#88bb66",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default CheckInScreen;
