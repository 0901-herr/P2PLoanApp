import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../contexts/AuthContext";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigation.replace("Main");
    } catch (error) {
      setError(error.message);
    }
  };

  const isButtonDisabled = email === "" || password === "";

  return (
    <SafeAreaView style={tw`flex-1 bg-white p-6`}>
      <View style={tw`items-center mb-6`}></View>
      <Text style={tw`text-3xl font-bold mb-4`}>Log in</Text>

      <View style={tw`mb-4`}>
        <Text style={tw`text-gray-600`}>Email</Text>
        <TextInput
          style={[
            tw`border border-gray-200 p-4 rounded-xl mt-2`,
            { fontSize: 16 },
          ]}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <View style={tw`mb-4`}>
        <Text style={tw`text-gray-600`}>Password</Text>
        <View
          style={tw`flex-row items-center border border-gray-200 rounded-xl mt-2 p-4`}
        >
          <TextInput
            style={[tw`flex-1`, { fontSize: 16 }]}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={18}
              color="gray"
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={[
          tw`rounded-lg py-3 my-4`,
          isButtonDisabled ? tw`bg-gray-300` : tw`bg-black`,
        ]}
        onPress={handleLogin}
        disabled={isButtonDisabled}
      >
        <Text
          style={[
            tw`text-center text-lg`,
            isButtonDisabled ? tw`text-gray-500` : tw`text-white`,
          ]}
        >
          Continue
        </Text>
      </TouchableOpacity>

      {error ? <Text style={tw`text-red-500 text-center`}>{error}</Text> : null}

      <View style={tw`flex-row justify-center`}>
        <Text style={tw`text-gray-600`}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={tw`text-blue-600`}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
