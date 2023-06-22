import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import placeholder from "../assets/placeholder.png";
const CategoryDetailScreen = ({ route }) => {
  const { category } = route.params;
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      navigation.setOptions({
        title: `${category.name}`,
      });
    }, [navigation, category])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Image style={{ width: 250, height: 250 }} source={placeholder}></Image>
      <Text style={styles.title}>{category.name}</Text>
      <Text style={styles.title}>{category.description}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: "bold",
  },
});

export default CategoryDetailScreen;
