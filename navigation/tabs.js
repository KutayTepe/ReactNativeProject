import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { ProductsScreen, OrdersScreen, CategoriesScreen } from "../screens";
import { Icon } from "@rneui/themed";
import { SIZES, SHADOWS } from "../constants";
import { Text, View } from "react-native";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 45,
          left: 25,
          right: 25,
          elevation: 0,
          backgroundColor: "#ffffff",
          borderRadius: 15,
          height: 70,
          ...SHADOWS,
        },
      }}
    >
      <Tab.Screen
        name="Products"
        component={ProductsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 15,
              }}
            >
              <Icon
                name="ios-home"
                type="ionicon"
                color={focused ? "#e32f45" : "#748c94"}
              />
              <Text
                style={{
                  color: focused ? "#e32f45" : "#748c94",
                  fontSize: SIZES.small,
                }}
              >
                Products
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 15,
              }}
            >
              <Icon
                name="ios-albums"
                type="ionicon"
                color={focused ? "#e32f45" : "#748c94"}
              />
              <Text
                style={{
                  color: focused ? "#e32f45" : "#748c94",
                  fontSize: SIZES.small,
                }}
              >
                Categories
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 15,
              }}
            >
              <Icon
                name="ios-card"
                type="ionicon"
                color={focused ? "#e32f45" : "#748c94"}
              />
              <Text
                style={{
                  color: focused ? "#e32f45" : "#748c94",
                  fontSize: SIZES.small,
                }}
              >
                Orders
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
