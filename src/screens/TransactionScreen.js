// src/screens/TransactionScreen.js
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";

const Counter = ({
  value,
  onIncrement,
  onDecrement,
  step = 1,
  min = 0,
  max = Infinity,
}) => {
  return (
    <View style={tw`flex-row items-center`}>
      <TouchableOpacity
        style={tw`w-10 h-10 rounded-full border border-gray-300 justify-center items-center`}
        onPress={() => onDecrement(step)}
        disabled={value <= min}
      >
        <Text
          style={tw`text-lg text-gray-600 ${
            value <= min ? "text-gray-300" : "text-gray-600"
          }`}
        >
          -
        </Text>
      </TouchableOpacity>

      <Text style={tw`text-center text-lg w-12 mx-4`}>{value}</Text>

      <TouchableOpacity
        style={tw`w-10 h-10 rounded-full border border-gray-300 justify-center items-center`}
        onPress={() => onIncrement(step)}
        disabled={value >= max}
      >
        <Text
          style={tw`text-lg text-gray-600 ${
            value >= max ? "text-gray-300" : "text-gray-600"
          }`}
        >
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const LendScreen = ({ onClose }) => {
  const [amount, setAmount] = useState(0);
  const [interest, setInterest] = useState(0);

  const incrementAmount = (step) =>
    setAmount((prev) => Math.min(prev + step, 1000)); // Example max value 1000
  const decrementAmount = (step) =>
    setAmount((prev) => Math.max(prev - step, 0)); // Example min value 0

  const incrementInterest = (step) =>
    setInterest((prev) => Math.min(prev + step, 20)); // Example max value 20%
  const decrementInterest = (step) =>
    setInterest((prev) => Math.max(prev - step, 0)); // Example min value 0%

  return (
    <View style={tw`flex-1 pt-2 px-1`}>
      <View style={tw`flex-row justify-between items-center pb-5`}>
        <Text style={tw`text-xl font-bold`}>Lend Screen</Text>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={28} color="black" />
        </TouchableOpacity>
      </View>

      {/* Body */}
      <View style={tw`flex-1 pt-2`}>
        {/* Amount Section */}
        <View style={tw`pb-4 flex-row justify-between`}>
          <View>
            <Text style={tw`text-lg font-bold`}>Amount</Text>
            <Text style={tw`text-base text-gray-500 pb-2`}>
              Enter the amount
            </Text>
          </View>

          <Counter
            value={amount}
            onIncrement={incrementAmount}
            onDecrement={decrementAmount}
            step={50}
            min={0}
            max={1000} // Example max value
          />
        </View>

        <View style={tw`h-px bg-gray-300 my-2`} />

        {/* Interest Rate Section */}
        <View style={tw`py-4 flex-row justify-between`}>
          <View>
            <Text style={tw`text-lg font-bold`}>Interest rate</Text>
            <Text style={tw`text-base text-gray-500 pb-2`}>
              Enter the interest rate
            </Text>
          </View>

          <Counter
            value={interest}
            onIncrement={incrementInterest}
            onDecrement={decrementInterest}
            step={0.5}
            min={0}
            max={20} // Example max value
          />
        </View>
      </View>

      {/* Footer */}
      <TouchableOpacity
        style={tw`bg-black rounded-lg py-3 w-full`}
        onPress={onClose}
      >
        <Text style={tw`text-white text-center text-lg`}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const LoanScreen = ({ onClose }) => {
  const [amount, setAmount] = useState(0);
  const [interest, setInterest] = useState(0);

  const incrementAmount = (step) =>
    setAmount((prev) => Math.min(prev + step, 1000)); // Example max value 1000
  const decrementAmount = (step) =>
    setAmount((prev) => Math.max(prev - step, 0)); // Example min value 0

  const incrementInterest = (step) =>
    setInterest((prev) => Math.min(prev + step, 20)); // Example max value 20%
  const decrementInterest = (step) =>
    setInterest((prev) => Math.max(prev - step, 0)); // Example min value 0%

  return (
    <View style={tw`flex-1 pt-2 px-1`}>
      <View style={tw`flex-row justify-between items-center pb-5`}>
        <Text style={tw`text-xl font-bold`}>Loan Screen</Text>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={28} color="black" />
        </TouchableOpacity>
      </View>

      {/* Body */}
      <View style={tw`flex-1 pt-2`}>
        {/* Amount Section */}
        <View style={tw`pb-4 flex-row justify-between`}>
          <View>
            <Text style={tw`text-lg font-bold`}>Amount</Text>
            <Text style={tw`text-base text-gray-500 pb-2`}>
              Enter the amount
            </Text>
          </View>

          <Counter
            value={amount}
            onIncrement={incrementAmount}
            onDecrement={decrementAmount}
            step={50}
            min={0}
            max={1000} // Example max value
          />
        </View>

        <View style={tw`h-px bg-gray-300 my-2`} />

        {/* Interest Rate Section */}
        <View style={tw`py-4 flex-row justify-between`}>
          <View>
            <Text style={tw`text-lg font-bold`}>Interest rate</Text>
            <Text style={tw`text-base text-gray-500 pb-2`}>
              Enter the interest rate
            </Text>
          </View>

          <Counter
            value={interest}
            onIncrement={incrementInterest}
            onDecrement={decrementInterest}
            step={0.5}
            min={0}
            max={20} // Example max value
          />
        </View>
      </View>

      {/* Footer */}
      <TouchableOpacity
        style={tw`bg-black rounded-lg py-3 w-full`}
        onPress={onClose}
      >
        <Text style={tw`text-white text-center text-lg`}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const TransactionScreen = ({ navigation }) => {
  const [showLendSheet, setShowLendSheet] = useState(false);
  const [showLoanSheet, setShowLoanSheet] = useState(false);
  const translateY = useRef(new Animated.Value(1000)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  const openLendSheet = () => {
    setShowLendSheet(true);
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const openLoanSheet = () => {
    setShowLoanSheet(true);
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeLendSheet = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 1000,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowLendSheet(false);
    });
  };

  const closeLoanSheet = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 1000,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowLoanSheet(false);
    });
  };

  // useEffect to subscribe to tabPress event
  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", async (e) => {
      // Reset selectedOption to default or add your business logic here
      closeLendSheet();
      closeLoanSheet();
    });

    // Unsubscribe to event listener when component unmounts
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Transaction Title */}
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Transaction</Text>
      </View>

      {/* List Options */}
      <View style={tw`flex-1 justify-end`}>
        <TouchableOpacity
          style={tw`flex-row items-center p-8 border-t border-b border-gray-200`}
          onPress={openLendSheet}
        >
          <Ionicons
            name="arrow-back-circle-outline"
            size={24}
            style={{ marginRight: 10 }}
          />
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Lend</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`flex-row items-center p-8`}
          onPress={openLoanSheet}
        >
          <Ionicons
            name="arrow-forward-circle-outline"
            size={24}
            style={{ marginRight: 10 }}
          />
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Loan</Text>
        </TouchableOpacity>
      </View>

      {/* Lend Action Sheet */}
      {showLendSheet && (
        <>
          <Animated.View
            style={[styles.overlay, { opacity: overlayOpacity }]}
          />
          <Animated.View
            style={[styles.actionSheet, { transform: [{ translateY }] }]}
          >
            <LendScreen onClose={closeLendSheet} />
          </Animated.View>
        </>
      )}

      {/* Loan Action Sheet */}
      {showLoanSheet && (
        <>
          <Animated.View
            style={[styles.overlay, { opacity: overlayOpacity }]}
          />
          <Animated.View
            style={[styles.actionSheet, { transform: [{ translateY }] }]}
          >
            <LoanScreen onClose={closeLoanSheet} />
          </Animated.View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  actionSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "75%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 20,
    zIndex: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingBottom: 20,
  },
  body: {
    flex: 1,
    // additional styles for body content can be added here
  },
  footer: {
    width: "100%",
  },
  actionContent: {
    alignItems: "flex-start",
    width: "100%",
  },
  closeButton: {
    marginTop: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 9,
  },
});

export default TransactionScreen;
