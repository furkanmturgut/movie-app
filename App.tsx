import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import MainStackNavigation from "./src/navigation/MainStackNavigation";
export default function App() {
  return (
    <NavigationContainer>
      <MainStackNavigation />
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
