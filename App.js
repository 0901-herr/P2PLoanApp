import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import TransactionScreen from "./src/screens/TransactionScreen";
import StatsScreen from "./src/screens/StatsScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import RecordsListScreen from "./src/screens/RecordsListScreen";
import RecordDetailScreen from "./src/screens/RecordDetailScreen";
import SpendingRecordsScreen from "./src/screens/SpendingRecordsScreen";
import TierInfoScreen from "./src/screens/TierInfoScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./src/contexts/AuthContext";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home-outline";
          } else if (route.name === "Transaction") {
            iconName = "swap-horizontal-outline";
          } else if (route.name === "Statistics") {
            iconName = "trending-up-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Transaction" component={TransactionScreen} />
      <Tab.Screen name="Statistics" component={StatsScreen} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{
                headerTitle: "",
                headerBackTitleVisible: false,
                headerTintColor: "black",
                headerTransparent: true,
              }}
            />
            <Stack.Screen
              name="Main"
              component={MyTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                headerBackTitleVisible: false,
                headerTintColor: "black",
              }}
            />
            <Stack.Screen
              name="RecordsList"
              component={RecordsListScreen}
              options={({ route }) => ({
                headerBackTitle: "",
                headerBackTitleVisible: false,
                headerTintColor: "black",
                headerTitle: route.params.recordType,
              })}
            />
            <Stack.Screen
              name="RecordDetail"
              component={RecordDetailScreen}
              options={({ route }) => ({
                headerBackTitle: "",
                headerBackTitleVisible: false,
                headerTintColor: "black",
                headerTitle:
                  route.params.recordType === "Loan History"
                    ? "Loan Details"
                    : "Lending Details",
              })}
            />
            <Stack.Screen
              name="SpendingRecords"
              component={SpendingRecordsScreen}
              options={{
                headerBackTitle: "",
                headerBackTitleVisible: false,
                headerTintColor: "black",
                headerTitle: "Spendings History",
              }}
            />
            <Stack.Screen
              name="TierInfo"
              component={TierInfoScreen}
              options={{
                headerBackTitle: "",
                headerBackTitleVisible: false,
                headerTintColor: "black",
                headerTitle: "Tier Information",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

export default App;
