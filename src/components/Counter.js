// src/screens/TransactionScreen.js
import React, { useState, useContext, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";
import * as Haptics from "expo-haptics";

const Counter = ({
  value,
  onIncrement,
  onDecrement,
  step = 1,
  min = 0,
  max = Infinity,
}) => {
  const [isIncrementing, setIsIncrementing] = useState(false);
  const [isDecrementing, setIsDecrementing] = useState(false);
  const incrementTimeout = useRef(null);
  const decrementTimeout = useRef(null);

  const handleLongPress = (type) => {
    const interval = 100; // Interval in milliseconds for repeated action
    if (type === "increment") {
      setIsIncrementing(true);
      incrementTimeout.current = setInterval(() => {
        onIncrement(step);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }, interval);
    } else if (type === "decrement") {
      setIsDecrementing(true);
      decrementTimeout.current = setInterval(() => {
        onDecrement(step);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }, interval);
    }
  };

  const handlePressOut = () => {
    setIsIncrementing(false);
    setIsDecrementing(false);
    clearInterval(incrementTimeout.current);
    clearInterval(decrementTimeout.current);
  };

  return (
    <View style={tw`flex-row items-center`}>
      <TouchableOpacity
        style={tw`w-10 h-10 rounded-full border border-gray-200 justify-center items-center`}
        onPress={() => {
          onDecrement(step);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
        onLongPress={() => handleLongPress("decrement")}
        onPressOut={handlePressOut}
        disabled={value <= min}
      >
        <Text
          style={tw`text-lg ${
            value <= min ? "text-gray-300" : "text-gray-600"
          }`}
        >
          -
        </Text>
      </TouchableOpacity>

      <Text style={tw`text-center text-lg w-12 mx-4`}>{value}</Text>

      <TouchableOpacity
        style={tw`w-10 h-10 rounded-full border border-gray-200 justify-center items-center`}
        onPress={() => {
          onIncrement(step);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
        onLongPress={() => handleLongPress("increment")}
        onPressOut={handlePressOut}
        disabled={value >= max}
      >
        <Text
          style={tw`text-lg ${
            value >= max ? "text-gray-300" : "text-gray-600"
          }`}
        >
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Counter;
