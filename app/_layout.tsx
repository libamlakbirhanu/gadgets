import { Slot, Stack } from "expo-router";
import "./global.css";
import { ToastProvider } from "react-native-toast-notifications";
import { ErrorProvider } from "../providers/error-provider";
import { AuthProvider } from "../providers/auth-provider";

export default function RootLayout() {
  return (
    <ErrorProvider>
      <AuthProvider>
        <ToastProvider placement="top">
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: "#ddd",
              },
              headerTintColor: "#fff",
            }}
          >
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
            <Stack.Screen name="auth/signup" options={{ headerShown: false }} />
          </Stack>
        </ToastProvider>
      </AuthProvider>
    </ErrorProvider>
  );
}
