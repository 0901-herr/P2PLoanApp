import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import tw from "twrnc";

const TierInfoScreen = ({ navigation }) => {
  return (
    <ScrollView style={tw`p-4 flex-1 bg-white`}>
      <View style={tw`mb-4`}>
        <Text style={tw`text-base font-bold `}>How Tiers Work</Text>
        <Text style={tw`text-base text-gray-600`}>You would </Text>
      </View>

      <View style={tw``}>
        <Text style={tw`text-lg font-bold text-blue-600`}>Tier 1</Text>
        <Text style={tw`text-base text-gray-600`}>Base interest rate: 5%</Text>
        <Text style={tw`text-base text-gray-600`}>
          Criteria: Complete 10 transactions
        </Text>
      </View>

      <View style={tw`h-px bg-gray-200 my-4`} />

      <View style={tw``}>
        <Text style={tw`text-lg font-bold text-blue-600`}>Tier 2</Text>
        <Text style={tw`text-base text-gray-600`}>
          Base interest rate: 4.5%
        </Text>
        <Text style={tw`text-base text-gray-600`}>
          Criteria: Complete 20 transactions
        </Text>
      </View>

      <View style={tw`h-px bg-gray-200 my-4`} />

      <View style={tw``}>
        <Text style={tw`text-lg font-bold text-blue-600`}>Tier 3</Text>
        <Text style={tw`text-base text-gray-600`}>Base interest rate: 4%</Text>
        <Text style={tw`text-base text-gray-600`}>
          Criteria: Complete 30 transactions
        </Text>
      </View>

      <View style={tw`h-px bg-gray-200 my-4`} />
    </ScrollView>
  );
};

export default TierInfoScreen;
