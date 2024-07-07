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
import LendScreen from "./LendScreen";
import LoanScreen from "./LoanScreen";

const TransactionScreen = ({ navigation }) => {
  const [showLendSheet, setShowLendSheet] = useState(false);
  const [showLoanSheet, setShowLoanSheet] = useState(false);
  const translateY = useRef(new Animated.Value(2000)).current;
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
        toValue: 2000,
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
        toValue: 2000,
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
      <View style={tw`p-4`}>
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
            <LendScreen onClose={closeLendSheet} navigation={navigation} />
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
            <LoanScreen onClose={closeLoanSheet} navigation={navigation} />
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
    height: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
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
