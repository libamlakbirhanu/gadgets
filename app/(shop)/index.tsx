import {
  Button,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { PRODUCTS } from "../../assets/products";
import ProductCard from "../../components/product-card";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { CATEGORIES } from "../../assets/categories";
import CategoryCard from "../../components/category-card";
import { useStore } from "../../store/cart-store";
import { Link, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

export default function App() {
  const { getItemCount } = useStore();

  return (
    <>
      <View className="h-[250px]">
        <View className="w-full p-4 flex flex-row justify-between items-center">
          <View className="flex flex-row items-center gap-2">
            <View className="rounded-full w-[40px] aspect-square bg-gray-200 flex items-center justify-center">
              <Text className="font-extrabold">LB</Text>
            </View>
            <Text className="text-gray-500 text-sm font-extrabold">
              Hello, Libamlak
            </Text>
          </View>
          <View className="flex flex-row items-center gap-6">
            <Link asChild href="/cart">
              <Pressable>
                <View className="relative">
                  <FontAwesome name="shopping-cart" size={24} color="#000" />
                  <View className="absolute -top-2 -right-1/2 px-2 py-1 bg-green-500 rounded-full">
                    <Text className="text-white text-xs font-bold">
                      {getItemCount()}
                    </Text>
                  </View>
                </View>
              </Pressable>
            </Link>
            <MaterialCommunityIcons name="logout" size={24} color="red" />
          </View>
        </View>
        <View className="w-full flex-1 px-4 relative">
          {/* <View className="absolute top-4 left-8  z-10">
            <Text className=" text-3xl font-extrabold text-white ">
              Discount
            </Text>
            <Text className=" text-3xl font-extrabold text-white">Sale</Text>
            <Text className="text-sm font-normal text-gray-100">
              Hurry for 25%
            </Text>
            <Text className="text-sm font-normal text-gray-100">Discounts</Text>
            <Button title="Shop Now" />
          </View> */}
          <Image
            source={require("../../assets/images/hero.png")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 10,
            }}
          />
        </View>
      </View>
      <View className="px-4 mt-6">
        <Text className="font-bold text-blue-500 text-2xl">Categories</Text>
        <FlatList
          data={CATEGORIES}
          horizontal
          renderItem={({ item }) => <CategoryCard item={item} />}
          keyExtractor={(item) => item.slug}
          contentContainerStyle={{
            marginTop: 4,
            gap: 4,
            paddingTop: 4,
            width: "100%",
            justifyContent: "space-evenly",
          }}
        />
      </View>
      <View className="flex-1">
        <FlatList
          data={PRODUCTS}
          renderItem={({ item }) => <ProductCard item={item} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          // contentContainerClassName="pb-20 w-full"
          contentContainerStyle={{
            paddingBottom: 10,
          }}
          columnWrapperStyle={{
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            gap: 10,
          }}
          style={{ paddingHorizontal: 10, paddingBottom: 5 }}
        />
      </View>
    </>
  );
}
