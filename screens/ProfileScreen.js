import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // 뒤로가기 아이콘
import { UserContext } from "./UserContext"; // UserContext 가져오기

export default function ProfileScreen({ navigation }) {
  // UserContext에서 user 정보 가져오기
  const { user } = useContext(UserContext);

  const userInfo = user || {
    name: "이름 없음",
    phone: "정보 없음",
    height_cm: "-",
    weight_kg: "-",
    birth: "-",
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>내 정보</Text>

        {/* 개인 정보 표시 */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>이름: {userInfo.name}</Text>
          <Text style={styles.infoText}>키: {userInfo.height_cm || "-"}</Text>
          <Text style={styles.infoText}>몸무게: {userInfo.weight_kg || "-"}</Text>
          <Text style={styles.infoText}>생년월일: {userInfo.birth || "-"}</Text>
          <Text style={styles.infoText}>연락처: {userInfo.phone}</Text>
        </View>

        {/* 운동 기록 (더미 데이터로 표시) */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>운동 횟수</Text>
            <Text style={styles.sectionTitle}>운동 기록</Text>
          </View>
          <View style={styles.sectionContent}>
            <View>
              <Text style={styles.infoText}>총 운동 시간: 84시간</Text>
              <Text style={styles.infoText}>달 운동 시간: 60시간</Text>
              <Text style={styles.infoText}>주 운동 시간: 15시간</Text>
              <Text style={styles.infoText}>오늘 운동 시간: 3시간</Text>
            </View>
            <View>
              <Text style={styles.infoText}>운동 종류</Text>
              <Text style={styles.infoText}>벤치 프레스: 회</Text>
              <Text style={styles.infoText}>데드리프트: 회</Text>
              <Text style={styles.infoText}>스쿼트: 회</Text>
            </View>
          </View>
        </View>

        {/* 운동 분석지 버튼 */}
        <TouchableOpacity
          style={styles.analysisButton}
          onPress={() => navigation.navigate("ExercisePaper")}
        >
          <Text style={styles.analysisButtonText}>운동 분석지</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* 뒤로가기 버튼 */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-circle-outline" size={48} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d8e7ef",
  },
  content: {
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    borderWidth: 1,
    padding: 5,
    backgroundColor: "#fff",
  },
  infoBox: {
    marginVertical: 20,
    gap: 5,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 4,
  },
  sectionContainer: {
    borderWidth: 1,
    backgroundColor: "#f2f8fa",
    padding: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  sectionContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  analysisButton: {
    marginTop: 30,
    borderWidth: 1,
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
  },
  analysisButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  backButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
