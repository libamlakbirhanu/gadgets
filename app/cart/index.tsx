import {
  Alert,
  FlatList,
  Platform,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { CartItemType, useStore } from "../../store/cart-store";
import { StatusBar } from "expo-status-bar";
import CartItem from "../../components/cart-item";

const Cart = () => {
  const { items, getTotalPrice, getItemCount } = useStore();

  const handleCheckout = () => {
    Alert.alert("Proceeding to checkout", `Total amount: $${getTotalPrice()}`);
  };

  return (
    <View className="flex-1 bg-white p-4">
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          paddingBottom: 10,
          gap: 12,
        }}
        numColumns={1}
        renderItem={(item) => <CartItem item={item.item} />}
      />

      <View className="flex flex-col items-center justify-center gap-2 mt-4 border-t border-gray-200 pt-4">
        <View className="flex flex-row items-center justify-center gap-4">
          <Text className="text-sm font-bold text-gray-500">Total</Text>
          <Text className="text-sm font-bold text-gray-500">
            ${getTotalPrice()}
          </Text>
        </View>
        {getItemCount() > 0 && (
          <TouchableOpacity
            onPress={handleCheckout}
            className="flex flex-row items-center justify-center gap-4 bg-green-500 rounded-md w-40 h-10"
          >
            <Text className="text-white font-bold">Checkout</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Cart;
