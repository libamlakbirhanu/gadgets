import { Link, useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import { PRODUCTS } from "../../../assets/products";
import { Order } from "../../../assets/types/order";
import { ORDERS } from "../../../assets/orders";
import { red } from "react-native-reanimated/lib/typescript/Colors";

const Orders = () => {
  const router = useRouter();

  const renderOrderItem = ({ item }: { item: Order }) => (
    <Link href={`/orders/${item.slug}`} asChild>
      <Pressable style={styles.orderCard}>
        <View>
          <View style={styles.orderHeader}>
            <Text style={styles.orderDate}>{item.date}</Text>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor:
                    item.status === "Completed"
                      ? "#4CAF50"
                      : item.status === "InTransit"
                      ? "#2196F3"
                      : "#FFC107",
                },
              ]}
            >
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          </View>

          <FlatList
            data={item.items}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item: product }) => (
              <View style={styles.productCard}>
                <Image
                  source={product.heroImage}
                  style={styles.productImage}
                  resizeMode="cover"
                />
                <Text style={styles.productTitle} numberOfLines={1}>
                  {product.title}
                </Text>
                <Text style={styles.productPrice}>${product.price}</Text>
              </View>
            )}
            keyExtractor={(product) => product.id.toString()}
            contentContainerStyle={styles.productsContainer}
          />

          <View style={styles.orderFooter}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalAmount}>
              $
              {item.items.reduce((acc, item) => acc + item.price, 0).toFixed(2)}
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>My Orders</Text> */}
      {ORDERS.length > 0 ? (
        <FlatList
          data={ORDERS}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No orders yet</Text>
          <TouchableOpacity
            style={styles.authButton}
            onPress={() => router.push("/auth")}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  listContainer: {
    paddingBottom: 20,
  },
  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  orderDate: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  productsContainer: {
    paddingVertical: 8,
  },
  productCard: {
    width: 120,
    marginRight: 12,
  },
  productImage: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
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
