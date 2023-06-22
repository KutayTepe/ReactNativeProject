import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";
import axios from "axios";
import { Icon, ListItem } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProductDetailScreen } from "../screens";
const Products = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigation = useNavigation();

  const Stack = createNativeStackNavigator();

  const Item = ({ item }) => {
    const handleDelete = async () => {
      Alert.alert("Delete", `Are you sure you want to delete ${item.name}?`, [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await axios
                .delete(`https://northwind.vercel.app/api/products/${item.id}`)
                .then(() => {
                  fetchData();
                });
            } catch (error) {
              console.log(error);
            }
          },
        },
      ]);
    };

    return (
      <View style={styles.item}>
        <TouchableOpacity
          style={styles.item}
          onPress={() =>
            navigation.navigate("ProductDetail", { product: item })
          }
        >
          <View style={{ display: "flex", flexDirection: "column" }}>
            <Text style={styles.title}>{item.name}</Text>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={styles.desc}>
                {getCategoryName(item.categoryId)}
              </Text>
              <Text style={styles.desc}> / {item.unitPrice} $ per unit</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete}>
          <Icon
            name="ios-trash"
            type="ionicon"
            color="red"
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://northwind.vercel.app/api/products"
      );
      setData(response.data);
      const categoriesResponse = await axios.get(
        "https://northwind.vercel.app/api/categories"
      );
      setCategories(categoriesResponse.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getCategoryName = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.name : "Unknown Category";
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen name="All Products">
        {() => (
          <View style={styles.container}>
            <FlatList
              data={data}
              renderItem={({ item }) => <Item item={item} />}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        )}
      </Stack.Screen>
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    marginBottom: 120,
  },
  item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e8e8e8",
    borderRadius: 5,
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
  },
  desc: {
    fontSize: 14,
  },
});

export default Products;
