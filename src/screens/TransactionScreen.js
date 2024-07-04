// src/screens/TransactionScreen.js
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import LoadingDots from "../components/LoadingDots";

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

const BorrowScreen = ({ onClose }) => {
  const [amount, setAmount] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const incrementAmount = (step) =>
    setAmount((prev) => Math.min(prev + step, 1000)); // Example max value 1000
  const decrementAmount = (step) =>
    setAmount((prev) => Math.max(prev - step, 0)); // Example min value 0

  const options = [
    { id: 1, label: "< 1 month", description: "Extra 1% interest rate" },
    { id: 2, label: "< 2 months", description: "Extra 1.5% interest rate" },
    { id: 3, label: "< 3 months", description: "Extra 2% interest rate" },
  ];

  const handleContinue = () => {
    setIsLoading(true);
    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
      setIsCompleted(true);
    }, 3000); // Example loading time
  };

  return (
    <View style={tw`flex-1 pt-2`}>
      <View style={tw`flex-row justify-between items-center pb-5`}>
        <Text style={tw`text-xl font-bold`}>Borrow</Text>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={28} color="black" />
        </TouchableOpacity>
      </View>

      {!isLoading && !isCompleted && (
        <>
          {/* Body */}
          <View style={tw`flex-1 pt-2`}>
            {/* Amount Section */}
            <View style={tw`flex-row justify-between`}>
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

            <View style={tw`h-px bg-gray-300 my-4`} />

            {/* Interest Rate Section */}
            <View>
              <Text style={tw`text-lg font-bold`}>Loan term</Text>
              <Text style={tw`text-base text-gray-500 pb-2`}>
                The extra interest rate is added to your base interest rate.
              </Text>
            </View>

            {options.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={tw`mt-2 p-3 bg-gray-100 rounded-lg border-2 ${
                  selectedOption === option.id ? "border-black" : "border-white"
                }`}
                onPress={() => setSelectedOption(option.id)}
              >
                <View style={tw`flex-row justify-between items-center`}>
                  <View>
                    <Text style={tw`text-lg font-bold`}>{option.label}</Text>
                    <Text style={tw`text-base text-gray-500 pb-2`}>
                      {option.description}
                    </Text>
                  </View>
                  {selectedOption === option.id && (
                    <Ionicons name="checkmark" size={28} color="black" />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Footer */}
          <TouchableOpacity
            style={tw`mt-2 bg-black rounded-lg py-3 w-full`}
            onPress={handleContinue}
          >
            <Text style={tw`text-white text-center text-lg`}>Continue</Text>
          </TouchableOpacity>
        </>
      )}

      {isLoading && (
        <View style={tw`flex-1 justify-center items-center`}>
          <LoadingDots />
        </View>
      )}

      {isCompleted && (
        <>
          <ScrollView contentContainerStyle={tw`w-full`}>
            <View style={tw`flex-1 p-2 pt-5`}>
              <Text style={tw`text-xl font-bold mb-4 text-left`}>
                We have found you a lender.
              </Text>

              <TouchableOpacity>
                <View
                  style={tw`w-full border rounded-xl border-gray-300 p-5 flex-row items-center mb-4`}
                >
                  <View
                    style={tw`w-16 h-16 bg-white border border-gray-300 rounded-full justify-center items-center`}
                    onPress={() => {}}
                  >
                    <Text style={tw`text-2xl font-bold`}>J</Text>
                  </View>

                  <View style={tw`pl-8`}>
                    <Text style={tw`text-xl font-bold`}>John Doe</Text>
                    {/* <Text style={tw`text-lg text-gray-500`}>
                    Loan Amount: $500
                  </Text> */}
                    {/* <Text style={tw`text-base text-gray-500`}>Tier 2</Text> */}
                    {/* <View style={tw`absolute bottom-0 right-0 `}> */}
                    <Text style={tw`text-blue-600 mt-2`}>See full profile</Text>
                    {/* </View> */}
                  </View>
                </View>
              </TouchableOpacity>

              <Text style={tw`text-xl font-bold mb-4 text-left`}>Summary</Text>

              <View
                style={tw`w-full border rounded-xl border-gray-300 px-3 py-2 mb-4`}
              >
                <View style={tw``}>
                  <Text style={tw`text-base text-gray-500`}>Loan Amount</Text>
                  <Text style={tw`text-lg font-bold`}>$500</Text>
                </View>

                <View style={tw`mt-2`}>
                  <Text style={tw`text-base text-gray-500`}>
                    Repayment Period
                  </Text>
                  <Text style={tw`text-lg font-bold`}>12 months</Text>
                </View>

                <View style={tw`mt-2`}>
                  <Text style={tw`text-base text-gray-500`}>
                    Monthly Payment
                  </Text>
                  <Text style={tw`text-lg font-bold`}>$45.83</Text>
                </View>

                <View style={tw`mt-2`}>
                  <Text style={tw`text-base text-gray-500`}>Total Payment</Text>
                  <Text style={tw`text-lg font-bold`}>$550</Text>
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={tw`w-full mt-auto`}>
            <TouchableOpacity
              style={tw`bg-black rounded-lg py-3 w-full`}
              onPress={onClose}
            >
              <Text style={tw`text-white text-center text-lg`}>Done</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* {isCompleted && (
        <View style={tw`flex-1 justify-center items-center px-5`}>
          <View style={tw`absolute top-1/4 justify-center items-center w-full`}>
            <View style={tw`justify-center items-center mb-4`}>
              <View
                style={tw`w-20 h-20 border-4 rounded-full justify-center items-center mb-6`}
              >
                <Ionicons name="checkmark" size={48} color="black" />
              </View>
              <Text style={tw`text-2xl font-bold mb-4`}>Loan Submitted</Text>
              <Text style={tw`text-lg text-gray-500`}>Thank you</Text>
            </View>
          </View>

          <TouchableOpacity
            style={tw`mt-auto mb-4 bg-black rounded-lg py-3 w-full`}
            onPress={onClose}
          >
            <Text style={tw`text-white text-center text-lg`}>Done</Text>
          </TouchableOpacity>
        </View>
      )} */}
    </View>
  );
};

const LendScreen = ({ onClose }) => {
  const [amount, setAmount] = useState(0);
  const [selectedTier, setSelectedTier] = useState(null);
  const [selectedLoanTerms, setSelectedLoanTerms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const incrementAmount = (step) =>
    setAmount((prev) => Math.min(prev + step, 1000)); // Example max value 1000
  const decrementAmount = (step) =>
    setAmount((prev) => Math.max(prev - step, 0)); // Example min value 0

  const options = [
    { id: 1, label: "Tier 1", description: "Extra 1% interest rate" },
    { id: 2, label: "Tier 2", description: "Extra 1.5% interest rate" },
    { id: 3, label: "Tier 3", description: "Extra 2% interest rate" },
  ];

  const loanTermOptions = [
    { id: 1, label: "< 1 month", description: "Extra 1% interest rate" },
    { id: 2, label: "< 2 months", description: "Extra 1.5% interest rate" },
    { id: 3, label: "< 3 months", description: "Extra 2% interest rate" },
  ];

  const handleContinue = () => {
    setIsLoading(true);
    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
      setIsCompleted(true);
    }, 3000); // Example loading time
  };

  const toggleLoanTermSelection = (optionId) => {
    if (selectedLoanTerms.includes(optionId)) {
      setSelectedLoanTerms(selectedLoanTerms.filter((id) => id !== optionId));
    } else {
      setSelectedLoanTerms([...selectedLoanTerms, optionId]);
    }
  };

  return (
    <View style={tw`flex-1 pt-2`}>
      <View style={tw`flex-row justify-between items-center pb-5`}>
        <Text style={tw`text-xl font-bold`}>Lend</Text>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={28} color="black" />
        </TouchableOpacity>
      </View>

      {!isLoading && !isCompleted && (
        <>
          <ScrollView
            contentContainerStyle={tw`w-full`}
            showsVerticalScrollIndicator={false}
          >
            {/* Body */}
            <View style={tw`flex-1 pt-2`}>
              {/* Amount Section */}
              <View style={tw`flex-row justify-between`}>
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

              <View style={tw`h-px bg-gray-300 my-4`} />

              {/* Tier Section */}
              <View>
                <View>
                  <Text style={tw`text-lg font-bold`}>Tier</Text>
                  <Text style={tw`text-base text-gray-500 pb-2`}>
                    The extra interest rate is added to your base interest rate.
                  </Text>
                </View>

                {options.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={tw`mt-2 p-3 bg-gray-100 rounded-lg border-2 ${
                      selectedTier === option.id
                        ? "border-black"
                        : "border-white"
                    }`}
                    onPress={() => setSelectedTier(option.id)}
                  >
                    <View style={tw`flex-row justify-between items-center`}>
                      <View>
                        <Text style={tw`text-lg font-bold`}>
                          {option.label}
                        </Text>
                        <Text style={tw`text-base text-gray-500 pb-2`}>
                          {option.description}
                        </Text>
                      </View>
                      {selectedTier === option.id && (
                        <Ionicons name="checkmark" size={28} color="black" />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={tw`h-px bg-gray-300 my-6`} />

              {/* Loan Term Section */}
              <View style={tw`pb-4`}>
                <Text style={tw`text-lg font-bold`}>Loan term</Text>
                <Text style={tw`text-base text-gray-500 pb-2`}>
                  Select multiple options for your expected loan return period.
                </Text>

                {loanTermOptions.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={tw`mt-2 p-3 bg-gray-100 rounded-lg border-2 ${
                      selectedLoanTerms.includes(option.id)
                        ? "border-black"
                        : "border-white"
                    }`}
                    onPress={() => toggleLoanTermSelection(option.id)}
                  >
                    <View style={tw`flex-row justify-between items-center`}>
                      <View>
                        <Text style={tw`text-lg font-bold`}>
                          {option.label}
                        </Text>
                        <Text style={tw`text-base text-gray-500 pb-2`}>
                          {option.description}
                        </Text>
                      </View>
                      {selectedLoanTerms.includes(option.id) && (
                        <Ionicons name="checkmark" size={28} color="black" />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          {/* Footer */}
          <TouchableOpacity
            style={tw`mt-2 bg-black rounded-lg py-3 w-full`}
            onPress={handleContinue}
          >
            <Text style={tw`text-white text-center text-lg`}>Continue</Text>
          </TouchableOpacity>
        </>
      )}

      {isLoading && (
        <View style={tw`flex-1 justify-center items-center`}>
          <LoadingDots />
        </View>
      )}

      {isCompleted && (
        <>
          <ScrollView
            contentContainerStyle={tw`w-full`}
            showsVerticalScrollIndicator={false}
          >
            <View style={tw`flex-1 p-2 pt-5`}>
              <Text style={tw`text-xl font-bold mb-4 text-left`}>
                We have found you a lender.
              </Text>

              <TouchableOpacity>
                <View
                  style={tw`w-full border rounded-xl border-gray-300 p-5 flex-row items-center mb-4`}
                >
                  <View
                    style={tw`w-16 h-16 bg-white border border-gray-300 rounded-full justify-center items-center`}
                    onPress={() => {}}
                  >
                    <Text style={tw`text-2xl font-bold`}>J</Text>
                  </View>

                  <View style={tw`pl-8`}>
                    <Text style={tw`text-xl font-bold`}>John Doe</Text>
                    <Text style={tw`text-blue-600 mt-2`}>See full profile</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <Text style={tw`text-xl font-bold mb-4 text-left`}>Summary</Text>

              <View
                style={tw`w-full border rounded-xl border-gray-300 px-3 py-2 mb-4`}
              >
                <View style={tw``}>
                  <Text style={tw`text-base text-gray-500`}>Loan Amount</Text>
                  <Text style={tw`text-lg font-bold`}>$500</Text>
                </View>

                <View style={tw`mt-2`}>
                  <Text style={tw`text-base text-gray-500`}>
                    Repayment Period
                  </Text>
                  <Text style={tw`text-lg font-bold`}>12 months</Text>
                </View>

                <View style={tw`mt-2`}>
                  <Text style={tw`text-base text-gray-500`}>
                    Monthly Payment
                  </Text>
                  <Text style={tw`text-lg font-bold`}>$45.83</Text>
                </View>

                <View style={tw`mt-2`}>
                  <Text style={tw`text-base text-gray-500`}>Total Payment</Text>
                  <Text style={tw`text-lg font-bold`}>$550</Text>
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={tw`w-full mt-auto`}>
            <TouchableOpacity
              style={tw`bg-black rounded-lg py-3 w-full`}
              onPress={onClose}
            >
              <Text style={tw`text-white text-center text-lg`}>Done</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
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
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Borrow</Text>
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
            <BorrowScreen onClose={closeLoanSheet} />
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
    height: "95%",
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
