import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";

const ShopLayout = () => {
  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            title: "Home",
            tabBarIcon({ color }) {
              return <FontAwesome size={28} name="home" color={color} />;
            },
          }}
        />
        <Tabs.Screen
          name="orders"
          options={{
            headerShown: false,
            title: "Orders",
            tabBarIcon({ color }) {
              return (
                <FontAwesome name="shopping-basket" size={24} color={color} />
              );
            },
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default ShopLayout;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    margin: 0,
    padding: 0,
  },
});
