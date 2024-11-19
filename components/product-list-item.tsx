import { Link } from "expo-router";
import { Product } from "../assets/types/product";
import { Image, Text, View } from "react-native";

type Props = { item: Product };

const ProductListItem = ({ item }: Props) => {
  return (
    <Link key={item?.id} asChild href={`/product/${item?.slug}`}>
      <View style={{ width: "48%" }}>
        <Image
          source={item?.heroImage}
          className="w-full object-cover rounded-lg"
          style={{ height: 120 }}
        />
        <Text className="text-sm font-bold text-gray-500 mt-2">
          {item?.title}
        </Text>
        <Text className="text-sm font-bold text-gray-500 mt-2">
          {item?.price?.toFixed(2)}
        </Text>
      </View>
    </Link>
  );
};

export default ProductListItem;
