import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import tw from "twrnc";

const loanData = [
  {
    id: "2",
    title: "Record 2",
    amount: "$200",
    date: "Tue 02 July",
    borrower: "Jane Smith",
    status: "Overdue",
  },
  {
    id: "1",
    title: "Record 1",
    amount: "$100",
    date: "Mon 01 July",
    borrower: "John Lee",
    status: "Settled",
  },
];

const lendData = [
  {
    id: "3",
    title: "Record 3",
    amount: "$150",
    date: "Wed 03 July",
    borrower: "",
    status: "Pending",
  },
  {
    id: "2",
    title: "Record 2",
    amount: "$200",
    date: "Tue 02 July",
    borrower: "Jane Smith",
    status: "Overdue",
  },
  {
    id: "1",
    title: "Record 1",
    amount: "$100",
    date: "Mon 01 July",
    borrower: "John Lee",
    status: "Settled",
  },
];

const getStatusStyles = (status) => {
  switch (status) {
    case "Settled":
      return {
        backgroundColor: "#E6F4EA",
        color: "green",
      };
    case "Pending":
      return {
        backgroundColor: "#FFF4E5",
        color: "orange",
      };
    case "Overdue":
      return {
        backgroundColor: "#FEE2E2",
        color: "red",
      };
    default:
      return {
        backgroundColor: "white",
        color: "black",
      };
  }
};

const RecordsListScreen = ({ route, navigation }) => {
  const { recordType } = route.params;

  const openDetailScreen = (record, recordType) => {
    navigation.navigate("RecordDetail", { record, recordType });
  };

  return (
    <View style={tw`flex-1 bg-white px-4`}>
      <ScrollView style={tw`pb-12`} showsVerticalScrollIndicator={false}>
        {(recordType == "Lending History" ? lendData : loanData).map(
          (item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => openDetailScreen(item, recordType)}
              style={tw`py-4 border-b border-gray-200`}
            >
              <Text style={tw`text-lg font-bold`}>{item.date}</Text>
              <Text style={tw`text-base text-gray-500`}>
                {item.borrower ? `From ${item.borrower}` : "No Borrower Yet"}
              </Text>

              <View style={tw`flex-row justify-between mt-2`}>
                <View
                  style={[
                    tw`px-2 py-1 rounded`,
                    {
                      backgroundColor: getStatusStyles(item.status)
                        .backgroundColor,
                    },
                  ]}
                >
                  <Text
                    style={[
                      tw`text-sm font-bold`,
                      {
                        color: getStatusStyles(item.status).color,
                      },
                    ]}
                  >
                    {item.status}
                  </Text>
                </View>

                <View
                  style={[
                    tw`rounded justify-center items-center`,
                    {
                      paddingHorizontal: 4,
                      backgroundColor:
                        recordType === "Lending History"
                          ? "#FEE2E2"
                          : "#D1FAE5",
                      alignSelf: "flex-end",
                      flexDirection: "row",
                      height: 24,
                    },
                  ]}
                >
                  <Text
                    style={[
                      tw`text-base`,
                      {
                        color:
                          recordType === "Lending History" ? "red" : "green",
                      },
                    ]}
                  >
                    {recordType === "Lending History" ? "-" : "+"}
                    {item.amount}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )
        )}
      </ScrollView>
    </View>
  );
};

export default RecordsListScreen;
