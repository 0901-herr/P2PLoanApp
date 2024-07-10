// src/screens/RecordDetailScreen.js
import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import tw from "twrnc";

const RecordDetailScreen = ({ route, recordType }) => {
  const { record } = route.params;
  console.log("record:", record);
  return (
    <View style={tw`px-6 pb-6 h-full bg-white`}>
      <ScrollView contentContainerStyle={tw`w-full`}>
        <View style={tw`flex-1 pt-5`}>
          <Text style={tw`text-lg font-semibold mb-4 text-left`}>
            {recordType === "Loan History" ? "Lender's" : "Borrower's"} Profile
          </Text>

          <TouchableOpacity>
            <View
              style={tw`w-full border rounded-xl border-gray-200 p-4 flex-row items-center mb-4`}
            >
              <View
                style={tw`w-15 h-15 bg-white border border-gray-200 rounded-full justify-center items-center`}
                onPress={() => {}}
              >
                <Text style={tw`text-2xl font-semibold`}>J</Text>
              </View>

              <View style={tw`pl-6`}>
                <Text style={tw`text-xl font-semibold`}>{record.borrower}</Text>
                <Text style={tw`text-gray-600 mt-2`}>Tier 2</Text>
                <Text style={tw`text-blue-600 mt-2`}>View full profile</Text>
              </View>
            </View>
          </TouchableOpacity>

          <Text style={tw`text-lg font-semibold mb-4 text-left`}>Summary</Text>
          <View style={tw`w-full pb-12`}>
            <View style={tw``}>
              <Text style={tw`text-base text-gray-500`}>Loan Amount:</Text>
              <Text style={tw`text-lg font-semibold`}>{record.amount}</Text>
            </View>

            <View style={tw`h-px bg-gray-200 my-3`} />

            <View style={tw``}>
              <Text style={tw`text-base text-gray-500`}>
                Total Service Fee:
              </Text>
              <Text style={tw`text-lg font-semibold`}>
                ${(100 * 0.055).toFixed(2)}
              </Text>
            </View>

            <View style={tw`h-px bg-gray-200 my-3`} />

            <View style={tw``}>
              <Text style={tw`text-base text-gray-500`}>Loan Term:</Text>
              <Text style={tw`text-lg font-semibold`}>1 month </Text>
            </View>

            <View style={tw`h-px bg-gray-200 my-3`} />

            <View style={tw``}>
              <Text style={tw`text-base text-gray-500`}>Repayment Before</Text>
              <Text style={tw`text-lg font-semibold`}>12 Augusts 2024</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {recordType === "Loan History" && (
        <TouchableOpacity
          style={tw`bg-black rounded-lg py-3 w-full`}
          onPress={() => {}}
        >
          <Text style={tw`text-white text-center text-lg`}>Settle Up</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default RecordDetailScreen;
