import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../contexts/AuthContext";

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { signup } = useContext(AuthContext);

  const handleSignup = async () => {
    try {
      await signup(email, password, name);
      navigation.replace("Login"); // Navigate to Main tabs
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white py-6 px-7`}>
      {/* <View style={tw`items-center mb-6`}> */}
      {/* <Image
          source={require("../../assets/signup-image.png")}
          style={tw`w-full h-48`}
          resizeMode="contain"
        /> */}
      {/* </View> */}
      <Text style={tw`text-3xl font-bold mt-6 mb-4`}>Sign up</Text>

      {/* <ScrollView> */}
      <View style={tw`mb-4`}>
        <Text style={tw`text-gray-600`}>Name</Text>
        <TextInput
          style={[
            tw`border border-gray-300 p-3.5 rounded-xl mt-2`,
            { fontSize: 16 },
          ]}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={tw`mb-4`}>
        <Text style={tw`text-gray-600`}>Email</Text>
        <TextInput
          style={[
            tw`border border-gray-300 p-3.5 rounded-xl mt-2`,
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
          style={tw`flex-row items-center border border-gray-300 rounded-xl mt-2 p-3.5`}
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
        style={tw`bg-black rounded-lg py-3 my-4`}
        onPress={handleSignup}
      >
        <Text style={tw`text-white text-center text-lg`}>Continue</Text>
      </TouchableOpacity>

      {error ? <Text>{error}</Text> : null}

      <View style={tw`flex-row justify-center`}>
        <Text style={tw`text-gray-600`}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={tw`text-blue-600`}>Log in</Text>
        </TouchableOpacity>
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default SignupScreen;
