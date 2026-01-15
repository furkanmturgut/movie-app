import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { s } from "react-native-size-matters";
import colors from "../theme/colors";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.backgorundColor },
        headerTitleStyle: { color: colors.textColor, fontSize: s(24) },
        headerTintColor: colors.textColor,
        tabBarStyle: {
          backgroundColor: colors.backgorundColor,
          borderTopColor: colors.borderColor,
        },
        tabBarActiveTintColor: colors.activeColor,
        tabBarInactiveTintColor: colors.inactiveColor,
        tabBarLabelStyle: { fontSize: s(10) },
        tabBarIcon: ({ color, size, focused }) => null,
      }}
    >
      <Tab.Screen
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => {
            return <Ionicons name="home" size={s(20)} color={color} />;
          },
        }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          title: "Categories",
          tabBarIcon: ({ color }) => {
            return <Ionicons name="albums" size={s(20)} color={color} />;
          },
        }}
        name="CategoriesScreen"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          title: "Saved",
          tabBarIcon: ({ color }) => {
            return <Ionicons name="bookmark" size={s(20)} color={color} />;
          },
        }}
        name="SacedScreen"
        component={HomeScreen}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
