import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../context/AuthContext";
import { View, ActivityIndicator } from "react-native";

import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import PostDetailScreen from "../screens/PostDetailScreen";
import PostFormScreen from "../screens/PostFormScreen";

import UserListScreen from "../screens/UserListScreen";
import UserFormScreen from "../screens/UserFormScreen";

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
    const { signed, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size="large" color="#2563EB" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {signed ? (
                    // Rotas Autenticadas (App)
                    <>
                        <Stack.Screen
                            name="Home"
                            component={HomeScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="PostDetail"
                            component={PostDetailScreen}
                            options={{ title: "Detalhes" }}
                        />
                        <Stack.Screen
                            name="PostForm"
                            component={PostFormScreen}
                            options={{ title: "Editor" }}
                        />
                        <Stack.Screen
                            name="UserList"
                            component={UserListScreen}
                            options={{ title: "Gerenciar Usuários" }}
                        />
                        <Stack.Screen
                            name="UserForm"
                            component={UserFormScreen}
                            options={{ title: "Dados do Usuário" }}
                        />
                    </>
                ) : (
                    // Rotas Públicas (Auth)
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{ headerShown: false }}
                    />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
