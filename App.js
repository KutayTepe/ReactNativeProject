// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./navigation/tabs";

export default function App() {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}

// export default function App() {
//   return MyStack();
// }

// const Stack = createNativeStackNavigator();

// const MyStack = () => {
//   return (
// <NavigationContainer>
//   <Stack.Navigator>
//     <Stack.Screen
//       name="Home"
//       component={HomeScreen}
//       options={{ title: "Welcome" }}
//     />
//     <Stack.Screen name="Profile" component={ProfileScreen} />
//   </Stack.Navigator>
// </NavigationContainer>
//   );
// };

// const HomeScreen = ({ navigation }) => {
//   return (
//     <Button
//       title="Go to Jane's profile"
//       onPress={() => navigation.navigate("Profile", { name: "Jane" })}
//     />
//   );
// };
// const ProfileScreen = ({ navigation, route }) => {
//   return <Text>This is {route.params.name}'s profile</Text>;
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
