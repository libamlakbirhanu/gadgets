import { Redirect, Stack, useLocalSearchParams } from "expo-router";
import {
  Button,
  FlatList,
  Image,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { useToast } from "react-native-toast-notifications";
import { PRODUCTS } from "../../assets/products";
import { useStore } from "../../store/cart-store";
import { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";

type Props = {};

const ProductDetail = (props: Props) => {
  const toast = useToast();
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { items, addItem, decrementItem, incrementItem } = useStore();

  const product = PRODUCTS.find((product) => product.slug === slug);

  if (!product) {
    toast.show("Product not found", {
      type: "warning",
    });
    return <Redirect href="/404" />;
  }

  const cartItem = items.find((item) => item.id === product.id);
  const initialQuantity = cartItem ? cartItem.quantity : 1;

  const [quantity, setQuantity] = useState(initialQuantity);

  const increaseQuantity = () => {
    if (quantity >= product.maxQuantity) {
      toast.show("Maximum quantity reached", {
        type: "warning",
      });
      return;
    }
    incrementItem(product.id);
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) {
      toast.show("Minimum quantity reached", {
        type: "warning",
      });
      return;
    }
    decrementItem(product.id);
    setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    if (cartItem) {
      increaseQuantity();
    } else {
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity,
        image: product.heroImage,
      });

      toast.show("item added to cart", {
        type: "success",
      });
    }
  };

  return (
    <View className="flex-1 pb-10">
      <Stack.Screen options={{ title: product.title }} />
      <Image source={product.heroImage} className="w-full h-[300px]" />
      <View className="px-4 flex-1">
        <Text className="font-bold text-lg mt-4">{product.title}</Text>
        <Text className="text-sm font-bold text-gray-500 mb-4">
          {product.price.toFixed(2)}
        </Text>
        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row items-center gap-4">
            <Text className="text-sm font-bold">Quantity</Text>
            <View className="flex flex-row items-center gap-1">
              <Text className="text-sm font-bold text-gray-500">
                {quantity}{" "}
              </Text>
              <Text className="text-sm font-bold text-gray-500">/</Text>
              <Text className="text-sm font-bold text-gray-500">
                {product.maxQuantity}
              </Text>
            </View>
          </View>
          <View className="flex flex-row items-center gap-4">
            <Text className="text-sm font-bold">Total Price</Text>
            <Text className="text-sm font-bold text-gray-500">
              {(product.price * quantity).toFixed(2)}
            </Text>
          </View>
        </View>

        <View className="flex-1">
          <FlatList
            data={product.imagesUrl}
            horizontal
            keyExtractor={(item) => item.toString()}
            contentContainerStyle={{
              marginTop: 12,
              gap: 6,
            }}
            renderItem={({ item }) => (
              <Image
                source={item}
                className="w-[80px] aspect-square object-cover rounded-md"
              />
            )}
          />
        </View>

        <View className="flex flex-row gap-4 items-center px-4">
          <View className="flex flex-row items-center gap-4">
            <TouchableOpacity
              onPress={decreaseQuantity}
              className="flex items-center justify-center gap-2 bg-blue-500 rounded-full w-10 h-10"
            >
              <Text className="text-sm font-bold text-white">-</Text>
            </TouchableOpacity>
            <Text className="font-bold text-xl">{quantity}</Text>
            <TouchableOpacity
              onPress={increaseQuantity}
              className="flex flex-row items-center justify-center gap-2 bg-blue-500 rounded-full w-10 h-10"
            >
              <Text className="text-sm font-bold text-white">+</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-1">
            <TouchableOpacity
              onPress={handleAddToCart}
              className="flex flex-row items-center justify-center gap-2 bg-green-500 rounded-md py-3"
            >
              <FontAwesome name="shopping-cart" size={24} color="black" />
              <Text className="text-white font-bold">Add to cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductDetail;
