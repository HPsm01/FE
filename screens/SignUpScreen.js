import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from '@react-navigation/native';

const SighUpScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("010");
  const [year, setYear] = useState("2000");
  const [month, setMonth] = useState("1");
  const [day, setDay] = useState("1");
  const [gender, setGender] = useState("male");

  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleSighUpSubmit = async () => {
    const userData = {
      username: name,
      phonenumber: phone,
      birthday: `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`,
      gender,
    };

    try {
      const response = await fetch("http://13.209.67.129:8000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log("회원가입 응답:", data);

      if (response.ok && data.id) {
     
        const bodyData = {
          height_cm: parseFloat(height),
          weight_kg: parseFloat(weight),
        };

        const bodyResponse = await fetch(`http://13.209.67.129:8000/body/${data.id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyData),
        });

        if (!bodyResponse.ok) {
          const errText = await bodyResponse.text();
          console.warn("신체정보 저장 실패:", errText);
        }

        navigation.navigate("Login");
      } else {
        setErrorMessage(data.message || "회원가입 실패, 다시 시도해 주세요.");
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
      setErrorMessage("서버 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
      <TextInput
        style={styles.input}
        placeholder="이름"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="전화번호"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="몸무게 (kg)"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="키 (cm)"
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
      />

      <Text style={styles.subtitle}>생년월일</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={year}
          style={styles.picker}
          onValueChange={(value) => setYear(value)}
        >
          {Array.from({ length: 2025 - 1960 + 1 }, (_, i) => {
            const y = 1960 + i;
            return <Picker.Item key={y} label={String(y)} value={String(y)} />;
          })}
        </Picker>
        <Picker
          selectedValue={month}
          style={styles.picker}
          onValueChange={(value) => setMonth(value)}
        >
          {Array.from({ length: 12 }, (_, i) => {
            const m = i + 1;
            return <Picker.Item key={m} label={String(m)} value={String(m)} />;
          })}
        </Picker>
        <Picker
          selectedValue={day}
          style={styles.picker}
          onValueChange={(value) => setDay(value)}
        >
          {Array.from({ length: 31 }, (_, i) => {
            const d = i + 1;
            return <Picker.Item key={d} label={String(d)} value={String(d)} />;
          })}
        </Picker>
      </View>

      <Text style={styles.subtitle}>성별</Text>
      <Picker
        selectedValue={gender}
        style={styles.input}
        onValueChange={(value) => setGender(value)}
      >
        <Picker.Item label="남성" value="male" />
        <Picker.Item label="여성" value="female" />
      </Picker>

      <Button title="회원가입 완료" onPress={handleSighUpSubmit} />

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F9FF",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
  },
  subtitle: {
    fontWeight: "bold",
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  picker: {
    flex: 1,
    height: 50,
  },
  errorText: {
    color: "red",
    marginTop: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default SighUpScreen;
