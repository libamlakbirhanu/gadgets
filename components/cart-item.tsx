import { Image, Text, TouchableOpacity, View } from "react-native";
import { CartItemType, useStore } from "../store/cart-store";
import { useToast } from "react-native-toast-notifications";
import { PRODUCTS } from "../assets/products";
import { StyleSheet } from "react-native";

type Props = {
  item: CartItemType;
};

const CartItem = ({ item }: Props) => {
  const toast = useToast();
  const product = PRODUCTS.find((product) => product.id === item.id);
  const { incrementItem, decrementItem, removeItem } = useStore();

  const increaseQuantity = () => {
    if (product?.maxQuantity && item.quantity >= product?.maxQuantity) {
      return;
    }
    incrementItem(item.id);
  };

  const decreaseQuantity = () => {
    if (item.quantity <= 1) {
      return;
    }
    decrementItem(item.id);
  };

  return (
    <View
      className="p-2 rounded-md bg-red-500 flex flex-row justify-between items-center"
      style={{ backgroundColor: "#edf2ed" }}
    >
      <View className="flex flex-row gap-4 items-center">
        <View>
          <Image
            source={require("../assets/images/i-phone-1.jpg")}
            className="w-[100px] aspect-square rounded-md"
            style={{ width: 80, height: 80 }}
          />
        </View>
        <View>
          <Text className="font-bold text-lg">{item.title}</Text>
          <Text className="text-sm font-bold text-gray-500">${item.price}</Text>
          <View className="flex flex-row gap-2 items-center mt-2">
            <TouchableOpacity
              onPress={decreaseQuantity}
              style={styles.actionButton}
            >
              <Text className="text-white">-</Text>
            </TouchableOpacity>
            <Text className="font-bold">{item.quantity}</Text>
            <TouchableOpacity
              onPress={increaseQuantity}
              style={styles.actionButton}
            >
              <Text className="text-white">+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "red",
          borderRadius: 10,
          paddingHorizontal: 12,
          paddingVertical: 8,
        }}
        onPress={() => removeItem(item)}
      >
        <Text className="text-white text-sm">Remove</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  actionButton: {
    width: 32, // 32px
    height: 32, // 32px
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16, // Half of the width/height for a perfect circle
    backgroundColor: "#8c8c8c",
  },
});
