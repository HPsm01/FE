import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CheckOutScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>퇴실 화면</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#E8F5E9" },
  text: { fontSize: 24, fontWeight: "bold" },
});

export default CheckOutScreen; // 이 부분이 중요
