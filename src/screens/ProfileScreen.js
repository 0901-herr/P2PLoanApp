import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);
  const currentTier = user?.tier;
  const progressToNextTier = getProgressToNextTier(user?.creditScore);
  const filledTiers = getFilledTiers(currentTier);

  const handleLogout = async () => {
    await logout();
    navigation.replace("Login");
  };

  const options = [
    { name: "settings-outline", label: "Settings", onPress: () => {} },
    { name: "card-outline", label: "Payment", onPress: () => {} },
    { name: "share-outline", label: "Share the App", onPress: () => {} },
    { name: "log-out-outline", label: "Log out", onPress: handleLogout },
  ];

  return (
    <View style={tw`p-4 flex-1 bg-white`}>
      {/* User Info */}
      <View style={tw`w-full flex-row items-center mb-4 py-2`}>
        <View
          style={tw`w-16 h-16 bg-white border border-gray-200 rounded-full justify-center items-center`}
        >
          <Text style={tw`text-2xl font-bold`}>
            {user?.displayName[0].toUpperCase() ?? "U"}
          </Text>
        </View>

        <View style={tw`pl-4`}>
          <Text style={tw`text-lg font-bold`}>
            {user?.displayName ?? "Unknown"}
          </Text>
          <Text style={tw`text-base text-gray-500`}>
            {user?.email ?? "unknown@gmail.com"}
          </Text>
        </View>
      </View>

      {/* Tier Info */}
      <TouchableOpacity
        style={tw`mt-2 p-3 mb-4 border border-gray-200 rounded-lg`}
        onPress={() => navigation.navigate("TierInfo")}
      >
        <View style={tw`flex-row justify-between items-center`}>
          <View>
            <Text style={tw`text-lg font-bold`}>
              You are at{" "}
              <Text style={tw`text-blue-600`}>Tier {currentTier}</Text>
            </Text>
            <Text style={tw`text-base text-gray-500 pb-2`}>
              Your base interest is 5%
            </Text>
          </View>
        </View>

        {/* Horizontal Bar Chart */}
        <View style={tw`mt-4`}>
          <View style={tw`flex-row justify-between mb-1`}>
            <Text style={tw`text-base font-bold`}>Tier Levels</Text>
            <Text style={tw`text-base`}>Progress</Text>
          </View>
          <View style={tw`flex-row`}>
            {Array.from({ length: 3 }).map((_, index) => (
              <View
                key={index}
                style={[
                  tw`h-3 flex-1 relative`,
                  {
                    backgroundColor: "#E6E6E6",
                    marginRight: index < 2 ? 2 : 0,
                    position: "relative",
                  },
                ]}
              >
                {index === Math.abs(currentTier - 3) && (
                  <View
                    style={[
                      tw`h-3 absolute top-0 left-0`,
                      {
                        width: `${progressToNextTier * 100}%`,
                        backgroundColor: "blue",
                      },
                    ]}
                  />
                )}

                {filledTiers.includes(index + 1) && (
                  <View
                    style={[
                      tw`h-3 absolute top-0 left-0 w-full`,
                      {
                        backgroundColor: "blue",
                      },
                    ]}
                  />
                )}
              </View>
            ))}
          </View>
          <View style={tw`flex-row justify-between mt-1`}>
            <Text style={tw`text-sm text-gray-500`}>Tier 3</Text>
            <Text style={tw`text-sm text-gray-500`}>Tier 2</Text>
            <Text style={tw`text-sm text-gray-500`}>Tier 1</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Options List */}
      <View style={tw`mt-2 border-t border-gray-200`}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={tw`flex-row items-center py-5 px-2 ${
              index < options.length - 1 ? "border-b border-gray-200" : ""
            }`}
            onPress={option.onPress}
          >
            <Ionicons name={option.name} size={24} color="black" />
            <Text style={tw`ml-4 text-base`}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const getFilledTiers = (currentTier) => {
  switch (currentTier) {
    case 1:
      return [1, 2];
    case 2:
      return [1];
    case 3:
    default:
      return [];
  }
};

const getProgressToNextTier = (creditScore) => {
  if (creditScore > 66.67) return (creditScore - 66.67) / 33.33;
  if (creditScore > 33.33) return (creditScore - 33.33) / 33.33;
  return creditScore / 33.33;
};

export default ProfileScreen;
