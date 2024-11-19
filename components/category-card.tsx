import React from "react";
import { Product } from "../assets/types/product";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { Category } from "../assets/types/category";

type Props = {
  item: Category;
};

const CategoryCard = ({ item }: Props) => {
  return (
    <Link asChild href={`/categories/${item.slug}`}>
      <Pressable
        style={{
          aspectRatio: "1/1",
          borderRadius: 50,
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 50,
            overflow: "hidden",
          }}
        >
          <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
        </View>

        <View style={{ padding: 10, marginVertical: 2 }}>
          <Text className="font-bold text-lg text-black">{item.name}</Text>
        </View>
      </Pressable>
    </Link>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  productImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});
