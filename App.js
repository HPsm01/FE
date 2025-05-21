import React, { useState } from "react"; // useState 추가
import { UserContext } from "./screens/UserContext";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen"; 
import CheckInScreen from "./screens/CheckInScreen";
import CheckOutScreen from "./screens/CheckOutScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ExercisePaper from "./screens/ExercisePaper";
import SignUpScreen from "./screens/SignUpScreen";

const Stack = createStackNavigator();
if (typeof global === 'undefined') {
  global = globalThis;
}

export default function App() {
  const [user, setUser] = useState(null); // user 상태 정의

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: "홈" }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: "로그인" }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="CheckIn" component={CheckInScreen} options={{ title: "입실" }} />
          <Stack.Screen name="CheckOut" component={CheckOutScreen} options={{ title: "퇴실" }} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: "내 정보" }} />
          <Stack.Screen name="ExercisePaper" component={ExercisePaper} options={{ title: "운동 분석지" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}
