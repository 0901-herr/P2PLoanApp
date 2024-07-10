import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import tw from "twrnc";

const TierInfoScreen = ({ navigation }) => {
  return (
    <ScrollView style={tw`p-4 flex-1 bg-white`}>
      <View style={tw`mb-4`}>
        {/* <Text style={tw`text-base font-semibold `}>How Tiers Work</Text>
        <Text style={tw`text-base text-gray-600`}>You would </Text> */}
      </View>

      <View style={tw``}>
        <Text style={tw`text-lg font-semibold text-blue-600`}>Tier 1</Text>
        <Text style={tw`text-base text-gray-600`}>Base service fee: 3%</Text>
        <Text style={tw`text-base text-gray-600`}>
          Maximum loan amount available: $2000
        </Text>
      </View>

      <View style={tw`h-px bg-gray-200 my-4`} />

      <View style={tw``}>
        <Text style={tw`text-lg font-semibold text-blue-600`}>Tier 2</Text>
        <Text style={tw`text-base text-gray-600`}>Base service fee: 4%</Text>
        <Text style={tw`text-base text-gray-600`}>
          Maximum loan amount available: $1300
        </Text>
      </View>

      <View style={tw`h-px bg-gray-200 my-4`} />

      <View style={tw``}>
        <Text style={tw`text-lg font-semibold text-blue-600`}>Tier 3</Text>
        <Text style={tw`text-base text-gray-600`}>Base service fee: 5.5%</Text>
        <Text style={tw`text-base text-gray-600`}>
          Maximum loan amount available: $800
        </Text>
      </View>

      <View style={tw`h-px bg-gray-200 my-4`} />
    </ScrollView>
  );
};

export default TierInfoScreen;
