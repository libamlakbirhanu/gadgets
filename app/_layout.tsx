import { Slot, Stack } from "expo-router";
import "./global.css";
import { ToastProvider } from "react-native-toast-notifications";

export default function RootLayout() {
  return (
    <ToastProvider placement="top">
      <Stack>
        <Stack.Screen
          name="(shop)"
          options={{ headerShown: false, title: "Shop" }}
        />
        <Stack.Screen
          name="categories/index"
          options={{ headerShown: true, title: "Categories" }}
        />
        <Stack.Screen
          name="product/index"
          options={{ headerShown: true, title: "Product" }}
        />
        <Stack.Screen
          name="cart/index"
          options={{
            presentation: "modal",
            headerShown: true,
            title: "Shopping Cart",
          }}
        />
        <Stack.Screen name="auth/index" options={{ headerShown: false }} />
      </Stack>
    </ToastProvider>
  );
}
