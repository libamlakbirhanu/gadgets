import { Link, Redirect, Stack, useLocalSearchParams } from "expo-router";
import { FlatList, Image, Text, View } from "react-native";
import { CATEGORIES } from "../../assets/categories";
import { PRODUCTS } from "../../assets/products";
import ProductListItem from "../../components/product-list-item";

type Props = {};

const CategoryDetail = (props: Props) => {
  const { slug } = useLocalSearchParams<{ slug: string }>();

  const category = CATEGORIES.find((category) => category.slug === slug);

  if (!category) {
    return <Redirect href="/404" />;
  }

  const products = PRODUCTS.filter(
    (product) => product.category.slug === category.slug
  );

  return (
    <View className="flex-1 bg-white p-4">
      <Stack.Screen
        options={{
          title: category.name,
        }}
      />
      <Image
        source={{ uri: category.imageUrl }}
        className="w-full h-[180px] object-cover rounded-lg"
      />
      <Text className="font-bold text-lg my-4">{category.name}</Text>
      <FlatList
        data={products}
        keyExtractor={(product) => product.id.toString()}
        numColumns={2}
        contentContainerStyle={{
          paddingBottom: 10,
        }}
        columnWrapperStyle={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          gap: 10,
        }}
        renderItem={({ item }) => <ProductListItem item={item} />}
      />
    </View>
  );
};

export default CategoryDetail;
