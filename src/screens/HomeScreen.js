import React, { useContext } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import ProfileIcon from "../components/ProfileIcon";
import { AuthContext } from "../contexts/AuthContext"; // Ensure correct path

const buttons = [
  { name: "cash-outline", label: "Pay" },
  { name: "arrow-down-circle-outline", label: "Receive" },
  { name: "swap-horizontal-outline", label: "Transfer" },
  { name: "time-outline", label: "History" },
];

const HomeScreen = () => {
  const { user } = useContext(AuthContext);
  const displayName = user?.displayName ? user.displayName.split(" ")[0] : "U";

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`flex-row justify-between items-center m-4`}>
        <Text style={tw`text-3xl font-bold`}>Hi, {displayName}</Text>
        <ProfileIcon />
      </View>

      {/* Buttons */}
      <View style={tw`flex-row justify-around mt-2 mb-4`}>
        {buttons.map((button, index) => (
          <TouchableOpacity key={index} style={tw`items-center`}>
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
        <View style={tw`mb-4 p-4 bg-gray-100 rounded-lg`}>
          <Text style={tw`text-gray-600`}>Owned amount</Text>
          <Text style={tw`text-3xl font-bold`}>$41.25</Text>
          <TouchableOpacity style={tw`mt-4`}>
            <Text style={tw`text-blue-600 mt-2`}>See full record</Text>
          </TouchableOpacity>
        </View>

        <View style={tw`mb-4 p-4 bg-gray-100 rounded-lg`}>
          <Text style={tw`text-gray-600`}>Lended amount</Text>
          <Text style={tw`text-3xl font-bold`}>$0.00</Text>
          <TouchableOpacity style={tw`mt-4`}>
            <Text style={tw`text-blue-600 mt-2`}>See full record</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
