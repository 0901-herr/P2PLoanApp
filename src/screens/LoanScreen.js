import React, { useState, useContext } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../contexts/AuthContext";
import { addLoan } from "../services/loanService";
import Counter from "../components/Counter";
import LoadingDots from "../components/LoadingDots";
import tw from "twrnc";

const tierMappings = [
  { baseRate: 5, maxAmount: 2000 },
  { baseRate: 7, maxAmount: 1500 },
  { baseRate: 10, maxAmount: 1000 },
];

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

  const incrementAmount = (step) =>
    setAmount((prev) => Math.min(prev + step, maxAmount));
  const decrementAmount = (step) =>
    setAmount((prev) => Math.max(prev - step, 0));

  const options = [
    {
      id: 1,
      label: "< 1 month",
      description: "Additional 1% of service fee",
      rate: 0,
    },
    {
      id: 2,
      label: "< 2 months",
      description: "Additional 1.5% service fee",
      rate: 1,
    },
    {
      id: 3,
      label: "< 3 months",
      description: "Additional 2% service fee",
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

  return (
    <View style={tw`flex-1 pt-2`}>
      <View style={tw`flex-row justify-between items-center pb-5`}>
        <Text style={tw`text-xl font-bold`}>Loan</Text>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={28} color="black" />
        </TouchableOpacity>
      </View>

      {!isLoading && !isCompleted && (
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
                    <Text style={tw`text-lg font-bold`}>
                      You are in{" "}
                      <Text style={tw`text-blue-600`}>Tier {user?.tier}</Text>
                    </Text>
                    <Text style={tw`text-base text-gray-500 pb-2`}>
                      Your base service fee is {baseRate}%, and you can loan up
                      to $2000.
                      <Text style={tw`text-blue-600`}> Learn more.</Text>
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              {/* Amount Section */}
              <View style={tw`flex-row justify-between mt-2`}>
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
                  step={100}
                  min={0}
                  max={maxAmount}
                />
              </View>

              <View style={tw`h-px bg-gray-200 my-4`} />

              {/* Interest Rate Section */}
              <View>
                <Text style={tw`text-lg font-bold`}>Loan term</Text>
                <Text style={tw`text-base text-gray-500 pb-2`}>
                  The additional service fee is applied on top of your base
                  service fee.
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
                  onPress={() => setSelectedOption(option.id)}
                >
                  <View style={tw`flex-row justify-between items-center`}>
                    <View>
                      <Text style={tw`text-lg font-bold`}>{option.label}</Text>
                      {option.rate === 0 ? (
                        <Text style={tw`text-base text-gray-500 pb-2`}>
                          No additional service fee.
                        </Text>
                      ) : (
                        <Text style={tw`text-base text-gray-500 pb-2`}>
                          Additional{" "}
                          <Text style={tw`text-blue-600 font-bold`}>
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
            <Text style={tw`text-lg font-bold`}>Summary</Text>

            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-base text-gray-500`}>
                Total Service Fee:
              </Text>
              <Text style={tw`text-lg font-bold text-blue-600`}>
                ${calculateServiceFee().toFixed(2)}
              </Text>
            </View>

            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-base text-gray-500`}>Amount Received:</Text>
              <Text style={tw`text-lg font-bold text-blue-600`}>
                ${calculateAmountReceived().toFixed(2)}
              </Text>
            </View>
          </View>

          {/* Footer */}

          <TouchableOpacity
            style={tw`mt-2 py-3 w-full rounded-lg ${
              amount > 0 && selectedOption !== null ? "bg-black" : "bg-gray-300"
            }`}
            onPress={handleContinue}
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
              <Text style={tw`text-xl font-bold mb-4 text-left`}>
                We have found you a lender
              </Text>

              <TouchableOpacity>
                <View
                  style={tw`w-full border rounded-xl border-gray-200 p-5 flex-row items-center mb-4`}
                >
                  <View
                    style={tw`w-16 h-16 bg-white border border-gray-200 rounded-full justify-center items-center`}
                    onPress={() => {}}
                  >
                    <Text style={tw`text-2xl font-bold`}>J</Text>
                  </View>

                  <View style={tw`pl-8`}>
                    <Text style={tw`text-xl font-bold`}>John Lee</Text>
                    <Text style={tw`text-blue-600 mt-2`}>See full profile</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <Text style={tw`text-xl font-bold mb-4 text-left`}>Summary</Text>

              <View style={tw`w-full pb-12`}>
                <View style={tw``}>
                  <Text style={tw`text-base text-gray-500`}>
                    Total Service Fee:
                  </Text>
                  <Text style={tw`text-lg font-bold`}>
                    ${calculateServiceFee().toFixed(2)}
                  </Text>
                </View>

                <View style={tw`h-px bg-gray-200 my-2`} />

                <View style={tw``}>
                  <Text style={tw`text-base text-gray-500`}>
                    Amount Received:
                  </Text>
                  <Text style={tw`text-lg font-bold`}>
                    ${calculateAmountReceived().toFixed(2)}
                  </Text>
                </View>

                <View style={tw`h-px bg-gray-200 my-2`} />

                <View style={tw``}>
                  <Text style={tw`text-base text-gray-500`}>Loan Amount:</Text>
                  <Text style={tw`text-lg font-bold`}>
                    ${amount.toFixed(2)}
                  </Text>
                </View>

                <View style={tw`h-px bg-gray-200 my-2`} />

                <View style={tw``}>
                  <Text style={tw`text-base text-gray-500`}>Loan Amount:</Text>
                  <Text style={tw`text-lg font-bold`}>1 month </Text>
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
