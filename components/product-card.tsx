import React from "react";
import { Product } from "../assets/types/product";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

type Props = {
  item: Product;
};

const ProductCard = ({ item }: Props) => {
  return (
    <Link asChild href={`/product/${item.slug}`}>
      <Pressable
        style={{
          width: "48%",
          marginVertical: 8,
          backgroundColor: "#fff",
          borderRadius: 10,
        }}
      >
        <View
          style={{
            width: "100%",
            height: 150,
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <Image source={item.heroImage} style={styles.productImage} />
        </View>

        <View
          style={{ padding: 10, marginVertical: 2, display: "flex", gap: 4 }}
        >
          <Text className="font-bold text-lg text-black">{item.title}</Text>
          <Text style={{ color: "#8c8c8c" }}>{item.price.toFixed(2)}</Text>
        </View>
      </Pressable>
    </Link>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  productImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});
