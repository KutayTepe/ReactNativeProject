import {
  SafeAreaView,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { ListItem, Icon, BottomSheet, Input } from "@rneui/themed";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { CategoryDetailScreen } from "../screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Categories = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const [categoryName, setCategoryName] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [categoryCount, setCategoryCount] = useState(0);
  const [sheetCategoryId, setSheetCategoryId] = useState(0);

  const Stack = createNativeStackNavigator();

  const [isVisible, setIsVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://northwind.vercel.app/api/categories"
      );
      setData(response.data);
      setCategoryCount(data.length);
    } catch (error) {
      console.log(error);
    }
  };
  const updateCategory = async () => {
    if (newCategoryName == "" || newCategoryDescription == "") {
      Alert.alert("Error", "Please fill all the fields.", [
        {
          text: "Okay",
          style: "cancel",
        },
      ]);
    } else {
      try {
        console.log(
          "data to be posted",
          sheetCategoryId,
          newCategoryName,
          newCategoryDescription
        );
        await axios.put(
          `https://northwind.vercel.app/api/categories/${sheetCategoryId}`,
          {
            id: sheetCategoryId,
            description: newCategoryDescription,
            name: newCategoryName,
          }
        );
        fetchData();
        setIsEditVisible(false);
      } catch (error) {
        console.log(error);
      }
      setNewCategoryName("");
      setNewCategoryDescription("");
    }
  };
  const addCategory = async () => {
    if (categoryName == "" || categoryDescription == "") {
      Alert.alert("Error", "Please fill all the fields.", [
        {
          text: "Okay",
          style: "cancel",
        },
      ]);
    } else {
      // Increment category count and generate a new ID
      const newCategoryCount = categoryCount + 1;
      const newCategoryId = newCategoryCount.toString();

      console.log(newCategoryId, categoryName, categoryDescription);
      // Make the POST request using Axios
      try {
        const response = await axios.post(
          "https://northwind.vercel.app/api/categories",
          {
            id: newCategoryId,
            name: categoryName,
            description: categoryDescription,
          }
        );
        fetchData();
        setIsVisible(false);
      } catch (error) {
        console.error(error);
      }
      // Update the category count and clear the input value
      setCategoryName("");
      setCategoryDescription("");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
                .delete(
                  `https://northwind.vercel.app/api/categories/${item.id}`
                )
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

    const handleEdit = async () => {
      setSheetCategoryId(Number(item.id));
      setIsEditVisible(true);
    };

    return (
      <View style={styles.item}>
        <TouchableOpacity
          style={styles.item}
          onPress={() =>
            navigation.navigate("CategoryDetail", { category: item })
          }
        >
          <View style={{ display: "flex", flexDirection: "column" }}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.desc}>{item.description}</Text>
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
        <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
          <Icon
            name="ios-pencil"
            type="ionicon"
            style={{ marginRight: 5 }}
            color="black"
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Stack.Navigator>
      <Stack.Screen name="All Categories">
        {() => (
          <View style={styles.container}>
            <FlatList
              data={data}
              renderItem={({ item }) => <Item item={item} />}
              keyExtractor={(item) => item.id.toString()}
            />
            <TouchableOpacity
              onPress={() => setIsVisible(true)}
              style={styles.addButton}
            >
              <Icon name="ios-add" type="ionicon" raised color="black" />
            </TouchableOpacity>
            {/* EDIT CATEGORY SHEET */}
            <SafeAreaProvider>
              <BottomSheet
                modalProps={{}}
                containerStyle={{
                  paddingBottom: "100%",
                }}
                isVisible={isEditVisible}
              >
                <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                  <Input
                    placeholder="New Category Name"
                    inputStyle={{
                      backgroundColor: "white",
                      padding: 15,
                      borderRadius: 5,
                    }}
                    value={newCategoryName}
                    onChangeText={setNewCategoryName}
                  />
                  <Input
                    placeholder="New Category Description"
                    inputStyle={{
                      backgroundColor: "white",
                      padding: 15,
                      borderRadius: 5,
                    }}
                    value={newCategoryDescription}
                    onChangeText={setNewCategoryDescription}
                  />
                  <View style={styles.sheetButtons}>
                    <TouchableOpacity
                      style={styles.cancel}
                      onPress={() => setIsEditVisible(false)}
                    >
                      <Text>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.addCategory}
                      onPress={() => updateCategory()}
                    >
                      <Text>Update Category</Text>
                    </TouchableOpacity>
                  </View>
                </KeyboardAvoidingView>
              </BottomSheet>
            </SafeAreaProvider>
            {/* NEW CATEGORY SHEET */}
            <SafeAreaProvider>
              <BottomSheet
                modalProps={{}}
                containerStyle={{
                  paddingBottom: "100%",
                }}
                isVisible={isVisible}
              >
                <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                  <Input
                    placeholder="Category Name"
                    inputStyle={{
                      backgroundColor: "white",
                      padding: 15,
                      borderRadius: 5,
                    }}
                    value={categoryName}
                    onChangeText={setCategoryName}
                  />
                  <Input
                    placeholder="Category Description"
                    inputStyle={{
                      backgroundColor: "white",
                      padding: 15,
                      borderRadius: 5,
                    }}
                    value={categoryDescription}
                    onChangeText={setCategoryDescription}
                  />
                  <View style={styles.sheetButtons}>
                    <TouchableOpacity
                      style={styles.cancel}
                      onPress={() => setIsVisible(false)}
                    >
                      <Text>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.addCategory}
                      onPress={() => addCategory()}
                    >
                      <Text>Add Category</Text>
                      <Icon name="ios-add" type="ionicon" color="black" />
                    </TouchableOpacity>
                  </View>
                </KeyboardAvoidingView>
              </BottomSheet>
            </SafeAreaProvider>
          </View>
        )}
      </Stack.Screen>
      <Stack.Screen name="CategoryDetail" component={CategoryDetailScreen} />
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
  sheetButtons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  addButton: {
    position: "absolute",
    borderRadius: 100,
    bottom: 0,
    right: 50,
  },
  addCategory: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    justifyContent: "center",
    backgroundColor: "lightgreen",
    width: "40%",
    height: 50,
    borderRadius: 5,
    alignSelf: "center",
  },
  cancel: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    justifyContent: "center",
    backgroundColor: "#fe8f8f",
    width: "40%",
    height: 50,
    borderRadius: 5,
    alignSelf: "center",
  },
});
export default Categories;
