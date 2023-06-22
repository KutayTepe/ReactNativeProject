import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import axios from "axios";

import placeholder from "../assets/placeholder.png";
const ProductDetailScreen = ({ route }) => {
  const { product } = route.params;
  const navigation = useNavigation();
  const [suppliers, setSuppliers] = useState({});

  useFocusEffect(
    React.useCallback(() => {
      navigation.setOptions({
        title: `${product.name}`,
      });
    }, [navigation, product])
  );
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const suppliersResponse = await axios.get(
        `https://northwind.vercel.app/api/suppliers/${product.supplierId}`
      );
      setSuppliers(suppliersResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSupplierInfo = (supplierId) => {
    const category = suppliers.find((c) => c.id === supplierId);
    return category ? category : "Cannot fetch supplier info";
  };
  return (
    <SafeAreaView style={styles.container}>
      <Image style={{ width: 250, height: 250 }} source={placeholder}></Image>
      <Text style={styles.title}>{product.name}</Text>
      <View style={styles.supplier}>
        <Text>
          <Text style={styles.subtitle}>Quantity Per Unit: </Text>
          {product.quantityPerUnit}
        </Text>
        <Text>
          <Text style={styles.subtitle}>Unit Price: </Text>
          {product.unitPrice}
        </Text>
        <Text>
          <Text style={styles.subtitle}>Units In Stock: </Text>
          {product.unitsInStock}
        </Text>
        <Text>
          <Text style={styles.subtitle}>Supplier: </Text>
          {suppliers.companyName}
        </Text>
        <Text>
          <Text style={styles.subtitle}>Contact Name: </Text>
          {suppliers.contactName}
        </Text>
        <Text>
          <Text style={styles.subtitle}>Contact Title: </Text>
          {suppliers.contactTitle}
        </Text>
        <Text>
          <Text style={styles.subtitle}>Address: </Text>
          {suppliers.address?.street}, {suppliers.address?.city},
          {suppliers.address?.country}
        </Text>
        <Text>
          <Text style={styles.subtitle}>Phone: </Text>
          {suppliers.address?.phone}
        </Text>
      </View>
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
  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  supplier: {
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
    gap: 20,
    width: "100%",
    marginLeft: 30,
  },
});

export default ProductDetailScreen;
