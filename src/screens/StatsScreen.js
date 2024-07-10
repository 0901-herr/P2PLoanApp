import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";

const screenWidth = Dimensions.get("window").width;

const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43, 50],
      color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`, // Blue color for the line
      strokeWidth: 2, // Line thickness
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  decimalPlaces: 0, // No decimal places for values
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#2196f3", // Blue color for dots
  },
};

const StatsScreen = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Last 7 days");
  const periods = [
    "Yesterday",
    "Today",
    "Last 7 days",
    "Last 30 days",
    "Last 90 days",
  ];

  return (
    <SafeAreaView style={tw`flex-1 p-4 bg-white`}>
      <View style={tw`p-4`}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Statistics</Text>

        {/* <View style={tw`pt-4`}>
          <Text style={tw`text-3xl font-semibold text-gray-900 pb-2`}>32.4k</Text>
          <Text style={tw`text-base text-gray-500`}>Users this week</Text>
        </View> */}

        <View style={tw`flex h-9/10 px-5 justify-center items-center `}>
          <Text style={tw`text-base text-gray-500`}>
            This page will soon feature detailed statistics on your earnings
            from lending and loans, offering valuable insights into your
            spending habits and financial activity.
          </Text>
        </View>

        {/* <View style={tw`flex flex-row items-center pb-4`}>
          <Text style={tw`text-base font-semibold text-green-500`}>12%</Text>
          <Ionicons
            name="arrow-up-outline"
            size={16}
            color="green"
            style={tw`ml-1`}
          />
        </View> */}

        {/* <LineChart
          data={data}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={tw`mb-4 border border-gray-200 rounded-lg`}
        /> */}

        {/* <View style={tw`border-t border-gray-200 pt-4`}>
          <View style={tw`flex-row justify-between items-center`}>
            <TouchableOpacity
              style={tw`flex-row items-center`}
              onPress={() => {}}
            >
              <Text style={tw`text-sm text-gray-500`}>{selectedPeriod}</Text>
              <Ionicons
                name="chevron-down-outline"
                size={16}
                color="gray"
                style={tw`ml-2`}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`flex-row items-center`}
              onPress={() => {}}
            >
              <Text style={tw`uppercase text-sm font-semibold text-blue-600`}>
                Users Report
              </Text>
              <Ionicons
                name="arrow-forward-outline"
                size={16}
                color="blue"
                style={tw`ml-2`}
              />
            </TouchableOpacity>
          </View> */}

        {/* Dropdown menu simulation */}
        {/* <View style={tw`mt-2`}>
            {periods.map((period) => (
              <TouchableOpacity
                key={period}
                onPress={() => setSelectedPeriod(period)}
                style={tw`py-2`}
              >
                <Text style={tw`text-sm text-gray-700`}>{period}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View> */}
      </View>
    </SafeAreaView>
  );
};

export default StatsScreen;
