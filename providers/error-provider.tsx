import React, { createContext, useContext, useState, useCallback } from "react";
import { Toast } from "react-native-toast-notifications";

interface ErrorContextType {
  handleError: (error: unknown, customMessage?: string) => void;
  clearError: () => void;
  error: Error | null;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export function ErrorProvider({ children }: { children: React.ReactNode }) {
  const [error, setError] = useState<Error | null>(null);

  const handleError = useCallback((error: unknown, customMessage?: string) => {
    console.error("Error occurred:", error);

    let errorMessage: string;

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    } else {
      errorMessage = "An unexpected error occurred";
    }

    // Handle specific error types
    if (errorMessage.includes("bucket not found")) {
      errorMessage =
        "Storage is not properly configured. Please contact support.";
    } else if (errorMessage.includes("JWT")) {
      errorMessage = "Your session has expired. Please log in again.";
    } else if (errorMessage.includes("network")) {
      errorMessage = "Network error. Please check your internet connection.";
    } else if (
      errorMessage.includes("unauthorized") ||
      errorMessage.includes("unauthenticated")
    ) {
      errorMessage =
        "You are not authorized to perform this action. Please log in or contact support.";
    }

    // Set the error in state
    setError(error instanceof Error ? error : new Error(errorMessage));

    // Show alert to user
    Toast.show(errorMessage, {
      type: "error",
      duration: 5000,
      onClose: clearError,
    });
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <ErrorContext.Provider value={{ handleError, clearError, error }}>
      {children}
    </ErrorContext.Provider>
  );
}

export function useError() {
  const context = useContext(ErrorContext);
  if (context === undefined) {
    throw new Error("useError must be used within an ErrorProvider");
  }
  return context;
}
