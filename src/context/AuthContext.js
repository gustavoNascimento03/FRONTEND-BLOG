import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData() {
            const storageToken = await AsyncStorage.getItem("@blog_token");

            if (storageToken) {
                api.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${storageToken}`;
                try {
                    const decoded = jwtDecode(storageToken);
                    // O backend deve garantir que 'user' ou 'role' venha no payload do token
                    setUser(decoded.user || decoded);
                } catch (error) {
                    console.log("Token expirado ou inválido");
                }
            }
            setLoading(false);
        }

        loadStorageData();
    }, []);

    const signIn = async (email, password) => {
        const response = await api.post("/login", { email, password });
        const { token } = response.data;

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        await AsyncStorage.setItem("@blog_token", token);

        const decoded = jwtDecode(token);
        setUser(decoded.user || decoded);
    };

    const signOut = async () => {
        await AsyncStorage.clear();
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{ signed: !!user, user, signIn, signOut, loading }}
        >
            {children}
        </AuthContext.Provider>
    );
};
