import React, { useState, useContext, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../contexts/AuthContext";
import { getUser } from "../services/userService";
import ProfileIcon from "../components/ProfileIcon";
import { useFocusEffect } from "@react-navigation/native";

const buttons = [
  { name: "cash-outline", label: "Pay", screen: "Pay" },
  { name: "scan", label: "Transfer", screen: "Transfer" },
  { name: "arrow-down-outline", label: "Deposit" },
  { name: "arrow-up-outline", label: "Withdraw" },
];

const HomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [availableAmount, setAvailableAmount] = useState(0);
  const [loanedAmount, setLoanedAmount] = useState(0);
  const [lendedAmount, setLendedAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const displayName = user?.displayName
    ? user.displayName.split(" ")[0]
    : "Unknown";

  const fetchUserData = async () => {
    if (user) {
      try {
        const userData = await getUser(user.userId);
        setAvailableAmount(userData?.availableAmount || 0);
        setLoanedAmount(userData?.loanedAmount || 0);
        setLendedAmount(userData?.lendedAmount || 0);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [user])
  );

  if (isLoading) {
    return (
      <View style={tw`flex-1 bg-white justify-center items-center`}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`flex-row justify-between items-center m-4`}>
        <Text style={tw`text-2xl font-bold`}>Hi, {displayName}</Text>
        <ProfileIcon />
      </View>

      {/* Buttons */}
      <View style={tw`flex-row justify-around mt-2 mb-4`}>
        {buttons.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={tw`items-center`}
            onPress={
              button.screen
                ? () => navigation.navigate(button.screen)
                : () => {}
            }
          >
            <View
              style={tw`w-14 h-14 bg-gray-200 rounded-full justify-center items-center`}
            >
              <Ionicons name={button.name} size={24} color="black" />
            </View>
            <Text style={tw`mt-2`}>{button.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={tw`p-4`}>
        <TouchableOpacity
          style={tw`mb-2 p-4 border border-gray-200 rounded-lg`} // bg-gray-100
          onPress={() => navigation.navigate("SpendingRecords")}
        >
          <View style={tw`h-1/3`}>
            <Text style={tw`text-gray-600`}>Available Balance</Text>
            <Text style={tw`text-2xl font-semibold pt-1`}>
              ${availableAmount}
            </Text>
          </View>
          <View style={tw`absolute bottom-0 right-0 m-4`}>
            <Text style={tw`text-blue-600 mt-2`}>View Spendings History</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`mb-2 p-4 bg-gray-100 rounded-lg`}
          onPress={() =>
            navigation.navigate("RecordsList", {
              recordType: "Loan History",
            })
          }
        >
          <View style={tw`pb-8`}>
            <Text style={tw`text-gray-600`}>Borrowed Amount</Text>
            <Text style={tw`text-2xl font-semibold pt-1`}>${loanedAmount}</Text>
          </View>
          <View style={tw`absolute bottom-0 right-0 m-4`}>
            <Text style={tw`text-blue-600 mt-2`}>View Loan History</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`mb-2 p-4 bg-gray-100 rounded-lg`}
          onPress={() =>
            navigation.navigate("RecordsList", {
              recordType: "Lending History",
            })
          }
        >
          <View style={tw`pb-8`}>
            <Text style={tw`text-gray-600`}>Lended Amount</Text>
            <Text style={tw`text-2xl font-semibold pt-1`}>${lendedAmount}</Text>
          </View>
          <View style={tw`absolute bottom-0 right-0 m-4`}>
            <Text style={tw`text-blue-600 mt-2`}>View Lending History</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
