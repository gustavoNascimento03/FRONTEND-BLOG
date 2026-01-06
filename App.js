import React from "react";
import { AuthProvider } from "./src/context/AuthContext";
import AppRoutes from "./src/routes/AppRoutes";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
    return (
        <SafeAreaProvider>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </SafeAreaProvider>
    );
}
