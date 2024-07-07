// src/screens/RecordDetailScreen.js
import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";

const RecordDetailScreen = ({ route, navigation, recordType }) => {
  const { record } = route.params;

  return (
    // <SafeAreaView style={tw`flex-1 bg-white`}>
    <View style={tw`px-6 pb-6 h-full bg-white`}>
      {/* <View style={tw`flex-row justify-between items-center pb-5`}>
          <Text style={tw`text-xl font-bold`}>Loan</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={28} color="black" />
          </TouchableOpacity>
        </View> */}

      <ScrollView contentContainerStyle={tw`w-full`}>
        <View style={tw`flex-1 pt-5`}>
          <Text style={tw`text-lg font-bold mb-4 text-left`}>
            {recordType === "Loan History" ? "Lender's" : "Borrower's"} Profile
          </Text>

          <TouchableOpacity
            style={tw`w-full border rounded-xl border-gray-200 p-5 flex-row items-center mb-4`}
          >
            <View
              style={tw`w-16 h-16 bg-white border border-gray-200 rounded-full justify-center items-center`}
            >
              <Text style={tw`text-2xl font-bold`}>
                {record.borrower.charAt(0)}
              </Text>
            </View>
            <View style={tw`pl-8`}>
              <Text style={tw`text-xl font-bold`}>{record.borrower}</Text>
              <Text style={tw`text-blue-600 mt-2`}>See full profile</Text>
            </View>
          </TouchableOpacity>

          <Text style={tw`text-lg font-bold mb-4 text-left`}>Summary</Text>
          <View style={tw`w-full pb-12`}>
            <View>
              <Text style={tw`text-base text-gray-500`}>Loan Amount</Text>
              <Text style={tw`text-lg font-bold`}>{record.amount}</Text>
            </View>
            <View style={tw`h-px bg-gray-200 my-2`} />
            <View style={tw`mt-2`}>
              <Text style={tw`text-base text-gray-500`}>Repayment Period</Text>
              <Text style={tw`text-lg font-bold`}>12 months</Text>
            </View>
            <View style={tw`h-px bg-gray-200 my-2`} />
            <View style={tw`mt-2`}>
              <Text style={tw`text-base text-gray-500`}>Monthly Payment</Text>
              <Text style={tw`text-lg font-bold`}>$45.83</Text>
            </View>
            <View style={tw`h-px bg-gray-200 my-2`} />
            <View style={tw`mt-2`}>
              <Text style={tw`text-base text-gray-500`}>Total Payment</Text>
              <Text style={tw`text-lg font-bold`}>$550</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* <TouchableOpacity
        style={tw`bg-black rounded-lg py-3 w-full`}
        onPress={() => navigation.goBack()}
      >
        <Text style={tw`text-white text-center text-lg`}>Done</Text>
      </TouchableOpacity> */}
    </View>
    // </SafeAreaView>
  );
};

export default RecordDetailScreen;
