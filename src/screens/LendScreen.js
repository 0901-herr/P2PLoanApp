import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../contexts/AuthContext";
import { addLend } from "../services/lendService";
import LoadingDots from "../components/LoadingDots";
import Counter from "../components/Counter";
import tw from "twrnc";
import * as Haptics from "expo-haptics";

const LendScreen = ({ onClose }) => {
  const { user } = useContext(AuthContext);
  const [amount, setAmount] = useState(100);
  const [selectedTiers, setSelectedTiers] = useState([]);
  const [selectedLoanTerms, setSelectedLoanTerms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const incrementAmount = (step) =>
    setAmount((prev) =>
      Math.min(prev + step, Math.floor(user?.availableAmount / 100) * 100)
    );
  const decrementAmount = (step) =>
    setAmount((prev) => Math.max(prev - step, 0));

  const options = [
    {
      id: 1,
      label: "Tier 1",
      defaultRisk: "Low",
      returnRate: "Low",
      rate: 3,
    },
    {
      id: 2,
      label: "Tier 2",
      defaultRisk: "Medium",
      returnRate: "Medium",
      rate: 4,
    },
    {
      id: 3,
      label: "Tier 3",
      defaultRisk: "High",
      returnRate: "High",
      rate: 5.5,
    },
  ];

  const loanTermOptions = [
    {
      id: 1,
      label: "< 1 month",
      description: "No additional return",
      rate: 0,
    },
    {
      id: 2,
      label: "< 2 months",
      description: "Additional 1% return",
      rate: 1,
    },
    {
      id: 3,
      label: "< 3 months",
      description: "Additional 2% return",
      rate: 2,
    },
  ];

  const handleContinue = async () => {
    setIsLoading(true);
    const { min: minReturn, max: maxReturn } = calculateExpectedReturnRange();

    const lend = {
      lenderId: user.userId,
      amount,
      selectedTiers,
      selectedLoanTerms,
      expectedMinReturn: minReturn,
      expectedMaxReturn: maxReturn,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await addLend(lend, user.userId);
      setIsLoading(false);
      setIsCompleted(true);
    } catch (error) {
      console.error("Error adding lend: ", error);
      setIsLoading(false);
    }
  };

  const toggleTierSelection = (optionId) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (selectedTiers.includes(optionId)) {
      setSelectedTiers(selectedTiers.filter((id) => id !== optionId));
    } else {
      setSelectedTiers([...selectedTiers, optionId]);
    }
  };

  const toggleLoanTermSelection = (optionId) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (selectedLoanTerms.includes(optionId)) {
      setSelectedLoanTerms(selectedLoanTerms.filter((id) => id !== optionId));
    } else {
      setSelectedLoanTerms([...selectedLoanTerms, optionId]);
    }
  };

  const getColorForRisk = (risk) => {
    switch (risk) {
      case "Low":
        return "text-green-600";
      case "Medium":
        return "text-yellow-600";
      case "High":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const calculateExpectedReturnRange = () => {
    if (selectedTiers.length === 0 || selectedLoanTerms.length === 0) {
      return { min: 0, max: 0 };
    }

    const selectedTierRates = selectedTiers.map(
      (tierId) => options.find((option) => option.id === tierId).rate
    );
    const selectedLoanTermRates = selectedLoanTerms.map(
      (termId) => loanTermOptions.find((option) => option.id === termId).rate
    );

    const minRate =
      Math.min(...selectedTierRates) + Math.min(...selectedLoanTermRates);
    const maxRate =
      Math.max(...selectedTierRates) + Math.max(...selectedLoanTermRates);

    const minReturn = (amount * minRate) / 100;
    const maxReturn = (amount * maxRate) / 100;

    return { min: minReturn, max: maxReturn };
  };

  const calculateAmountReceived = () => {
    const serviceFee = calculateServiceFee();
    return amount - serviceFee;
  };

  const calculateServiceFee = () => {
    if (selectedLoanTerms.length === 0) return 0;
    const selected = loanTermOptions.find(
      (option) => option.id === selectedLoanTerms[selectedLoanTerms.length - 1]
    );
    const totalRate = selected.rate;
    return (amount * totalRate) / 100;
  };

  const { min: minReturn, max: maxReturn } = calculateExpectedReturnRange();

  return (
    <View style={tw`flex-1 pt-2`}>
      <View style={tw`flex-row justify-between items-center pb-5`}>
        <Text style={tw`text-xl font-semibold`}>Lend</Text>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={28} color="black" />
        </TouchableOpacity>
      </View>

      {!isLoading && !isCompleted && !showSummary && (
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
                  <Text style={tw`text-lg font-semibold`}>Amount</Text>
                  <Text style={tw`text-base text-gray-500 pb-2`}>
                    Up to available amount
                  </Text>
                </View>

                <Counter
                  value={amount}
                  onIncrement={incrementAmount}
                  onDecrement={decrementAmount}
                  step={100}
                  min={100}
                  max={Math.floor(user?.availableAmount / 100) * 100}
                />
              </View>

              <View style={tw`h-px bg-gray-200 my-4`} />

              {/* Tier Section */}
              <View>
                <View>
                  <Text style={tw`text-lg font-semibold`}>Tier</Text>
                  <Text style={tw`text-base text-gray-500 pb-2`}>
                    Select one or more tiers to lend to. Selecting multiple
                    tiers make lending easier.{" "}
                  </Text>
                </View>

                {options.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={tw`mt-2 p-3 bg-gray-100 rounded-lg border-2 ${
                      selectedTiers.includes(option.id)
                        ? "border-black"
                        : "border-white"
                    }`}
                    onPress={() => toggleTierSelection(option.id)}
                  >
                    <View style={tw`flex-row justify-between items-center`}>
                      <View>
                        <Text style={tw`text-lg font-semibold`}>
                          {option.label}
                        </Text>
                        <Text style={tw`text-base text-gray-500 pb-2`}>
                          <Text
                            style={tw`font-semibold mt-2 text-blue-600`} // ${getColorForRisk(option.defaultRisk)}
                          >
                            {option.defaultRisk}
                          </Text>{" "}
                          default risk and return.
                          {"\n"}
                          <Text style={tw`font-semibold mt-2 text-blue-600`}>
                            {option.rate}%
                          </Text>{" "}
                          instant return.
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={tw`h-px bg-gray-200 my-6`} />

              {/* Loan Term Section */}
              <View style={tw`pb-4`}>
                <Text style={tw`text-lg font-semibold`}>Loan term</Text>
                <Text style={tw`text-base text-gray-500 pb-2`}>
                  Select one or more loan return periods. Multiple selections
                  increase lending chances.
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
                        <Text style={tw`text-lg font-semibold`}>
                          {option.label}
                        </Text>

                        {option.id === 1 ? (
                          <Text style={tw`text-base text-gray-500 pb-2`}>
                            No additional return.{" "}
                          </Text>
                        ) : (
                          <Text style={tw`text-base text-gray-500 pb-2`}>
                            Additional{" "}
                            <Text style={tw`font-semibold mt-2 text-blue-600`}>
                              {option.rate}%
                            </Text>{" "}
                            return.
                          </Text>
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          <View style={tw`mt-1 p-2 border-t border-gray-200`}>
            <Text style={tw`text-lg font-bold`}>Summary</Text>

            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-base text-gray-500`}>Total Return:</Text>

              <Text style={tw`text-lg font-bold`}>
                {maxReturn === 0
                  ? "$0.00"
                  : minReturn === maxReturn
                  ? `$${(amount + minReturn).toFixed(2)}`
                  : `$${(amount + minReturn).toFixed(2)} - $${(
                      amount + maxReturn
                    ).toFixed(2)}`}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[
              tw`mt-2 rounded-lg py-3 w-full`,
              amount <= 0 || selectedLoanTerms.length === 0
                ? tw`bg-gray-300`
                : tw`bg-black`,
            ]}
            onPress={() => setShowSummary(true)}
            disabled={amount <= 0 || selectedLoanTerms.length === 0}
          >
            <Text
              style={[
                tw`text-center text-lg`,
                amount <= 0 || selectedLoanTerms.length === 0
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
                  <Text style={tw`text-base text-gray-500`}>Amount</Text>
                  <Text style={tw`text-lg font-semibold`}>
                    ${amount.toFixed(2)}
                  </Text>
                </View>

                <View style={tw`h-px bg-gray-200 my-3`} />

                <View style={tw``}>
                  <Text style={tw`text-base text-gray-500`}>Tiers</Text>
                  <View style={tw`flex flex-row`}>
                    {selectedTiers.map((tierId, index) => (
                      <Text key={tierId} style={tw`text-lg font-semibold`}>
                        {index === 0 ? "" : ", "}
                        {options.find((option) => option.id === tierId).label}
                      </Text>
                    ))}
                  </View>
                </View>

                <View style={tw`h-px bg-gray-200 my-3`} />

                <View style={tw``}>
                  <Text style={tw`text-base text-gray-500`}>Loan Terms</Text>
                  {selectedLoanTerms.map((termId) => (
                    <Text key={termId} style={tw`text-lg font-semibold`}>
                      {
                        loanTermOptions.find((option) => option.id === termId)
                          .label
                      }
                    </Text>
                  ))}
                </View>

                <View style={tw`h-px bg-gray-200 my-3`} />

                <View style={tw``}>
                  <Text style={tw`text-base text-gray-500`}>
                    Immediate Profit
                  </Text>
                  <Text style={tw`text-lg font-semibold`}>
                    {maxReturn === 0
                      ? "$0.00"
                      : minReturn === maxReturn
                      ? `$${minReturn.toFixed(2)}`
                      : `$${minReturn.toFixed(2)} - $${maxReturn.toFixed(2)}`}
                  </Text>
                </View>

                <View style={tw`h-px bg-gray-200 my-3`} />

                <View style={tw``}>
                  <Text style={tw`text-base text-gray-500`}>Service Fee</Text>
                  <Text style={tw`text-lg font-semibold`}>
                    {maxReturn === 0
                      ? "$0.00"
                      : minReturn === maxReturn
                      ? `$${(minReturn * 0.3).toFixed(2)}`
                      : `$${(minReturn * 0.3).toFixed(2)} - $${(
                          maxReturn * 0.3
                        ).toFixed(2)}`}
                  </Text>
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
                We have found you a borrower
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
                  <Text style={tw`text-base text-gray-500`}>
                    Immediate Profit
                  </Text>
                  <Text style={tw`text-lg font-semibold`}>
                    ${calculateServiceFee().toFixed(2)}
                  </Text>
                </View>

                {/* <View style={tw`h-px bg-gray-200 my-3`} /> */}

                {/* <View style={tw``}>
                  <Text style={tw`text-base text-gray-500`}>
                    Amount Received
                  </Text>
                  <Text style={tw`text-lg font-semibold`}>
                    ${calculateAmountReceived().toFixed(2)}
                  </Text>
                </View> */}

                <View style={tw`h-px bg-gray-200 my-3`} />

                <View style={tw``}>
                  <Text style={tw`text-base text-gray-500`}>Loan Amount</Text>
                  <Text style={tw`text-lg font-semibold`}>
                    ${amount.toFixed(2)}
                  </Text>
                </View>

                <View style={tw`h-px bg-gray-200 my-3`} />

                <View style={tw``}>
                  <Text style={tw`text-base text-gray-500`}>Loan Term</Text>
                  <Text style={tw`text-lg font-semibold`}>1 month </Text>
                </View>

                <View style={tw`h-px bg-gray-200 my-3`} />

                <View style={tw``}>
                  <Text style={tw`text-base text-gray-500`}>Service Fee</Text>
                  <Text style={tw`text-lg font-semibold`}>
                    {maxReturn === 0
                      ? "$0.00"
                      : minReturn === maxReturn
                      ? `$${(minReturn * 0.3).toFixed(2)}`
                      : `$${(minReturn * 0.3).toFixed(2)} - $${(
                          maxReturn * 0.3
                        ).toFixed(2)}`}
                  </Text>
                </View>

                {/* <View style={tw`h-px bg-gray-200 my-3`} /> */}

                {/* <View style={tw``}>
                  <Text style={tw`text-base text-gray-500`}>
                    Total Payment:
                  </Text>
                  <Text style={tw`text-lg font-semibold`}>
                    ${(amount + calculateServiceFee()).toFixed(2)}
                  </Text>
                </View> */}
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

export default LendScreen;
