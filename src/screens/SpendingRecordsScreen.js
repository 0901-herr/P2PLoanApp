import React from "react";
import { View, Text, ScrollView } from "react-native";
import tw from "twrnc";

const data = [
  {
    date: "Fri 05 July",
    description: "Sport Centres",
    amount: "-$4.20",
    status: "",
  },
  {
    date: "Fri 05 July",
    description: "Lunch at Restaurant X",
    amount: "-$16.04",
    status: "Pending",
  },
  {
    date: "Fri 04 July",
    description: "Transfer to Dan",
    amount: "-$17.90",
    status: "",
  },
  {
    date: "Fri 04 July",
    description: "Lunch at Restaurant Y",
    amount: "-$19.08",
    status: "Pending",
  },
  {
    date: "Thu 04 July",
    description: "Transfer from Lee",
    amount: "+$20.00",
    status: "",
  },
  {
    date: "Wed 03 July",
    description: "Lend - No Borrower Yet",
    amount: "-$150.00",
    status: "Pending",
  },
  {
    date: "Tue 02 July",
    description: "Loan to Jane Smith",
    amount: "-$200.00",
    status: "Overdue",
  },
  {
    date: "Tue 02 July",
    description: "Lend to Jane Smith",
    amount: "-$200.00",
    status: "Overdue",
  },
  {
    date: "Mon 01 July",
    description: "Loan to John Lee",
    amount: "-$100.00",
    status: "Settled",
  },
  {
    date: "Mon 01 July",
    description: "Lend to John Lee",
    amount: "-$100.00",
    status: "Settled",
  },
  {
    date: "Fri 01 July",
    description: "Transaction Fee",
    amount: "-$1.16",
    status: "",
  },
];

const SpendingRecordsScreen = () => {
  const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <View style={tw`flex-1 bg-white px-4 pb-8`}>
      {/* <Text style={tw`text-2xl font-bold mb-4`}>Spending Records</Text> */}

      <ScrollView style={tw`pb-12`} showsVerticalScrollIndicator={false}>
        {sortedData.map((item, index) => (
          <View key={index} style={tw`py-4 border-b border-gray-200`}>
            <Text style={tw`text-lg font-bold text-gray-900`}>{item.date}</Text>
            {item.status ? (
              <Text style={tw`text-base text-gray-500`}>
                {item.status}: {item.description}
              </Text>
            ) : (
              <Text style={tw`text-base text-gray-500`}>
                {item.description}
              </Text>
            )}

            <View
              style={[
                tw`rounded justify-center items-center mt-2`,
                {
                  paddingHorizontal: 4,
                  backgroundColor: item.amount.startsWith("-")
                    ? "#FEE2E2"
                    : "#D1FAE5",
                  alignSelf: "flex-end",
                  flexDirection: "row",
                  height: 24, // Ensure height is set for vertical alignment
                },
              ]}
            >
              <Text
                style={[
                  tw`text-base`,
                  { color: item.amount.startsWith("-") ? "red" : "green" },
                ]}
              >
                {item.amount}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default SpendingRecordsScreen;
