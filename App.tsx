import { NavigationContainer } from "@react-navigation/native";
import MyTabs from "./src/navigation/BottomTabs";
import { StatusBar } from "expo-status-bar";
export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
