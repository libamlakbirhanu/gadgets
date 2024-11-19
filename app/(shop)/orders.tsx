import { useRouter } from "expo-router";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const Orders = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Orders</Text>
      <TouchableOpacity
        style={styles.authButton}
        onPress={() => router.push("/auth")}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  authButton: {
    backgroundColor: "#8c8c8c",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
