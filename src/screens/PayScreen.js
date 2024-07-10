import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import tw from "twrnc";

const PayScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const availableBalance = user?.availableAmount || 0;

  return (
    <View style={tw`flex-1 items-center bg-white pt-4`}>
      <TouchableOpacity
        style={[
          tw`w-11/12 mx-auto mt-4 p-4 rounded-2xl shadow-2xl h-56 flex-row`,
          {
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            borderWidth: 1,
            borderColor: "rgba(0, 0, 0, 0.1)",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.1,
            shadowRadius: 20,
          },
        ]}
        onPress={() => navigation.navigate("SpendingRecords")}
      >
        <View style={tw`flex-1 justify-between`}>
          <Image
            source={require("../../assets/LLto.png")}
            style={tw`w-14 h-14`}
            resizeMode="contain"
          />

          <View>
            <Text style={tw`text-black text-base font-medium`}>
              Available Balance
            </Text>
            <Text style={tw`text-black text-3xl font-bold pt-1`}>
              ${availableBalance}
            </Text>
          </View>

          <View style={tw`flex-row justify-between items-center`}>
            <Text style={tw`text-gray-500 text-sm font-medium`}>
              •••• •••• •••• 0927
            </Text>

            <Image
              source={require("../../assets/mastercard.png")}
              style={tw`w-20 h-20`}
              resizeMode="contain"
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PayScreen;
