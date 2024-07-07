import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";

const ProfileIcon = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={tw`w-12 h-12 bg-white border border-gray-200 rounded-full justify-center items-center`}
      onPress={() => navigation.navigate("Profile")}
    >
      <Ionicons name="person" size={20} color="black" />
    </TouchableOpacity>
  );
};

export default ProfileIcon;
