import { Slot, Stack, useRouter, useSegments } from "expo-router";
import "./global.css";
import { ToastProvider } from "react-native-toast-notifications";
import { ErrorProvider } from "../providers/error-provider";
import { AuthProvider, useAuth } from "../providers/auth-provider";
import { useEffect, PropsWithChildren } from "react";

function AuthGuard({ children }: PropsWithChildren) {
  const segments = useSegments();
  const { session } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";
    const inProtectedGroup = segments[0] === "(shop)";

    if (!session && inProtectedGroup) {
      router.push("/auth");
    } else if (session && inAuthGroup) {
      router.push("/");
    }
  }, [session, segments]);

  return children;
}

export default function RootLayout() {
  return (
    <ErrorProvider>
      <AuthProvider>
        <ToastProvider placement="top">
          <AuthGuard>
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
              <Stack.Screen
                name="auth/index"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="auth/signup"
                options={{ headerShown: false }}
              />
            </Stack>
          </AuthGuard>
        </ToastProvider>
      </AuthProvider>
    </ErrorProvider>
  );
}
