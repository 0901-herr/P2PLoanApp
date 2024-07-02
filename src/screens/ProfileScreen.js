import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import tw from "twrnc";

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    navigation.replace("Login"); // Navigate to Login screen
  };

  return (
    <View style={tw`flex-1 justify-center items-center`}>
      {user && (
        <View style={tw`items-center`}>
          <Text style={tw`text-lg mb-5`}>Email: {user.email}</Text>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      )}
    </View>
  );
};

export default ProfileScreen;
