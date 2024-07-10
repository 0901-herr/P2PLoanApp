import React, { useState, useContext } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../contexts/AuthContext";
import { addLoan } from "../services/loanService";
import Counter from "../components/Counter";
import LoadingDots from "../components/LoadingDots";
import tw from "twrnc";
import { tierMappings } from "../algorithms/tierMappings";
import * as Haptics from "expo-haptics";

const getTierDetails = (tier) => {
  const details = tierMappings[tier - 1];
  if (details) {
    return details;
  } else {
    throw new Error(`Invalid tier: ${tier}`);
  }
};

const LoanScreen = ({ onClose, navigation }) => {
  const { user } = useContext(AuthContext);
  const { baseRate, maxAmount } = getTierDetails(user?.tier);
  const [amount, setAmount] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const incrementAmount = (step) =>
    setAmount((prev) => Math.min(prev + step, maxAmount));
  const decrementAmount = (step) =>
    setAmount((prev) => Math.max(prev - step, 0));

  const options = [
    {
      id: 1,
      label: "< 1 month",
      rate: 0,
    },
    {
      id: 2,
      label: "< 2 months",
      rate: 1,
    },
    {
      id: 3,
      label: "< 3 months",
      rate: 2,
    },
  ];

  const handleContinue = async () => {
    setIsLoading(true);
    const serviceFee = calculateServiceFee();
    const amountReceived = calculateAmountReceived();

    const loan = {
      lenderId: user.userId,
      amount,
      baseRate,
      additionalRate: options.find((option) => option.id === selectedOption)
        .rate,
      totalServiceFee: serviceFee,
      amountReceived,
      loanTerm: options.find((option) => option.id === selectedOption).label,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await addLoan(loan, user.userId);
      setIsLoading(false);
      setIsCompleted(true);
    } catch (error) {
      console.error("Error adding loan: ", error);
      setIsLoading(false);
    }
  };

  const calculateServiceFee = () => {
    if (selectedOption === null) return 0;
    const selected = options.find((option) => option.id === selectedOption);
    const totalRate = baseRate + selected.rate;
    return (amount * totalRate) / 100;
  };

  const calculateAmountReceived = () => {
    const serviceFee = calculateServiceFee();
    return amount - serviceFee;
  };

  const calculateFutureDate = (months) => {
    const currentDate = new Date();
    const futureDate = new Date(
      currentDate.setMonth(currentDate.getMonth() + months)
    );
    return futureDate.toDateString();
  };

  return (
    <View style={tw`flex-1 pt-2`}>
      <View style={tw`flex-row justify-between items-center pb-5`}>
        <Text style={tw`text-xl font-semibold`}>Loan</Text>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={28} color="black" />
        </TouchableOpacity>
      </View>

      {!isLoading && !isCompleted && !showSummary && (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`w-full`}
          >
            {/* Body */}
            <View style={tw`flex-1 pb-4`}>
              <TouchableOpacity
                style={tw`mt-2 p-3 mb-2 border border-gray-200 rounded-lg`}
                onPress={() => navigation.navigate("TierInfo")}
              >
                <View style={tw`flex-row justify-between items-center`}>
                  <View>
                    <Text style={tw`text-lg font-semibold`}>
                      You are in{" "}
                      <Text style={tw`text-blue-600`}>Tier {user?.tier}</Text>
                    </Text>
                    <Text style={tw`text-base text-gray-500 pb-2`}>
                      Your base service fee is {baseRate}%, and you can loan up
                      to ${maxAmount}.
                      <Text style={tw`text-blue-600`}> Learn more.</Text>
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              {/* Amount Section */}
              <View style={tw`flex-row justify-between mt-2`}>
                <View>
                  <Text style={tw`text-lg font-semibold`}>Amount</Text>
                  <Text style={tw`text-base text-gray-500 pb-2`}>
                    Enter the amount
                  </Text>
                </View>

                <Counter
                  value={amount}
                  onIncrement={incrementAmount}
                  onDecrement={decrementAmount}
                  step={100}
                  min={0}
                  max={maxAmount}
                />
              </View>

              <View style={tw`h-px bg-gray-200 my-4`} />

              {/* Interest Rate Section */}
              <View>
                <Text style={tw`text-lg font-semibold`}>Loan term</Text>
                <Text style={tw`text-base text-gray-500 pb-2`}>
                  An additional service fee is added to your base service fee.
                  Enjoy a 0.5% rebate for early repayments.
                </Text>
              </View>

              {options.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={tw`mt-2 p-3 bg-gray-100 rounded-lg border-2 ${
                    selectedOption === option.id
                      ? "border-black"
                      : "border-white"
                  }`}
                  onPress={() => {
                    setSelectedOption(option.id);
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }}
                >
                  <View style={tw`flex-row justify-between items-center`}>
                    <View>
                      <Text style={tw`text-lg font-semibold`}>
                        {option.label}
                      </Text>
                      {option.rate === 0 ? (
                        <Text style={tw`text-base text-gray-500 pb-2`}>
                          No additional service fee.
                        </Text>
                      ) : (
                        <Text style={tw`text-base text-gray-500 pb-2`}>
                          Additional{" "}
                          <Text style={tw`text-blue-600 font-semibold`}>
                            {option.rate}%
                          </Text>{" "}
                          service fee.
                        </Text>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <View style={tw`mt-1 p-2 border-t border-gray-200`}>
            <Text style={tw`text-lg font-semibold`}>Summary</Text>

            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-base text-gray-500`}>
                Total Service Fee:
              </Text>
              <Text style={tw`text-lg font-semibold`}>
                ${calculateServiceFee().toFixed(2)}
              </Text>
            </View>

            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-base text-gray-500`}>Amount Received:</Text>
              <Text style={tw`text-lg font-semibold`}>
                ${calculateAmountReceived().toFixed(2)}
              </Text>
            </View>
          </View>

          {/* Footer */}

          <TouchableOpacity
            style={tw`mt-2 py-3 w-full rounded-lg ${
              amount > 0 && selectedOption !== null ? "bg-black" : "bg-gray-300"
            }`}
            onPress={() => setShowSummary(true)}
            disabled={amount <= 0 || selectedOption === null}
          >
            <Text
              style={[
                tw`text-center text-lg`,
                amount <= 0 || selectedOption === null
                  ? tw`text-gray-500`
                  : tw`text-white`,
              ]}
            >
              Continue
            </Text>
          </TouchableOpacity>
        </>
      )}

      {!isLoading && !isCompleted && showSummary && (
        <>
          <ScrollView
            contentContainerStyle={tw`w-full`}
            showsVerticalScrollIndicator={false}
          >
            <View style={tw`flex-1`}>
              <Text style={tw`text-xl font-semibold mb-4 pt-2 text-left`}>
                Review your selections
              </Text>

              <View style={tw`w-full pb-12`}>
                <View style={tw``}>
                  <Text style={tw`text-base text-gray-500`}>Loan Amount:</Text>
                  <Text style={tw`text-lg font-semibold`}>
                    ${amount.toFixed(2)}
                  </Text>
                </View>

                <View style={tw`h-px bg-gray-200 my-3`} />

                <View style={tw`w-full pb-12`}>
                  <View style={tw``}>
                    <Text style={tw`text-base text-gray-500`}>
                      Total Service Fee:
                    </Text>
                    <Text style={tw`text-lg font-semibold`}>
                      ${calculateServiceFee().toFixed(2)}
                    </Text>
                  </View>

                  <View style={tw`h-px bg-gray-200 my-3`} />

                  <View style={tw``}>
                    <Text style={tw`text-base text-gray-500`}>
                      Amount Received:
                    </Text>
                    <Text style={tw`text-lg font-semibold`}>
                      ${calculateAmountReceived().toFixed(2)}
                    </Text>
                  </View>

                  <View style={tw`h-px bg-gray-200 my-3`} />

                  <View style={tw``}>
                    <Text style={tw`text-base text-gray-500`}>Loan Term:</Text>
                    <Text style={tw`text-lg font-semibold`}>
                      {selectedOption} month{selectedOption > 1 && "s"}
                    </Text>
                  </View>

                  <View style={tw`h-px bg-gray-200 my-3`} />

                  <View style={tw``}>
                    <Text style={tw`text-base text-gray-500`}>
                      Repayment Before
                    </Text>
                    <Text style={tw`text-lg font-semibold`}>
                      {calculateFutureDate(selectedOption)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={tw`w-full mt-auto flex-row`}>
            <TouchableOpacity
              style={tw`rounded-lg py-3 px-6 w-1/2 bg-gray-300 mr-1`}
              onPress={() => setShowSummary(false)}
            >
              <Text style={tw`text-center text-lg text-gray-800`}>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={tw`rounded-lg py-3 px-6 w-1/2 bg-black`}
              onPress={handleContinue}
            >
              <Text style={tw`text-center text-lg text-white`}>Confirm</Text>
            </TouchableOpacity>
          </View>
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
            <View style={tw`flex-1 pt-5`}>
              <Text style={tw`text-xl font-semibold mb-4 text-left`}>
                We have found you a lender
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
                    <Text style={tw`text-xl font-semibold`}>John Lee</Text>
                    <Text style={tw`text-gray-600 mt-2`}>Tier 2</Text>
                    <Text style={tw`text-blue-600 mt-2`}>
                      View full profile
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              <Text style={tw`text-xl font-semibold mb-4 text-left`}>
                Summary
              </Text>

              <View style={tw`w-full pb-12`}>
                <View style={tw``}>
                  <Text style={tw`text-base text-gray-500`}>Loan Amount:</Text>
                  <Text style={tw`text-lg font-semibold`}>
                    ${amount.toFixed(2)}
                  </Text>
                </View>

                <View style={tw`h-px bg-gray-200 my-3`} />

                <View style={tw``}>
                  <Text style={tw`text-base text-gray-500`}>
                    Total Service Fee:
                  </Text>
                  <Text style={tw`text-lg font-semibold`}>
                    ${calculateServiceFee().toFixed(2)}
                  </Text>
                </View>

                <View style={tw`h-px bg-gray-200 my-3`} />

                <View style={tw``}>
                  <Text style={tw`text-base text-gray-500`}>
                    Amount Received:
                  </Text>
                  <Text style={tw`text-lg font-semibold`}>
                    ${calculateAmountReceived().toFixed(2)}
                  </Text>
                </View>

                <View style={tw`h-px bg-gray-200 my-3`} />

                <View style={tw``}>
                  <Text style={tw`text-base text-gray-500`}>Loan Term:</Text>
                  <Text style={tw`text-lg font-semibold`}>1 month </Text>
                </View>

                <View style={tw`h-px bg-gray-200 my-3`} />

                <View style={tw``}>
                  <Text style={tw`text-base text-gray-500`}>
                    Repayment Before
                  </Text>
                  <Text style={tw`text-lg font-semibold`}>
                    {calculateFutureDate(selectedOption)}
                  </Text>
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

export default LoanScreen;
