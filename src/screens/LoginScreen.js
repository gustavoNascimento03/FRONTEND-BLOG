import React, { useState, useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Platform,
    Alert,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { Button, Input } from "../components/MyComponents";
import { Eye, EyeOff } from "lucide-react-native";

export default function LoginScreen({ navigation }) {
    const { signIn } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Estado para controlar se mostra ou esconde a senha
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        try {
            await signIn(email, password);
        } catch (error) {
            const msg = error.response?.data?.msg || "Erro ao fazer login";
            if (Platform.OS === "web") alert(msg);
            else Alert.alert("Erro", msg);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo ao Blog 🎓</Text>
            <Text style={styles.subtitle}>Faça login para continuar</Text>

            {/* Input de Email */}
            <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />

            {/* CAMPO DE SENHA CUSTOMIZADO COM ÍCONE */}
            <View style={styles.passwordContainer}>
                <Text style={styles.label}>Senha</Text>
                <View style={styles.inputRow}>
                    <TextInput
                        style={styles.inputField}
                        value={password}
                        onChangeText={setPassword}
                        // Se showPassword for FALSE, secureTextEntry é TRUE (oculta)
                        secureTextEntry={!showPassword}
                        placeholder="Digite sua senha"
                    />
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.iconButton}
                    >
                        {/* Troca o ícone dependendo do estado */}
                        {showPassword ? (
                            <EyeOff size={24} color="#6B7280" />
                        ) : (
                            <Eye size={24} color="#6B7280" />
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            <Button title="Entrar" onPress={handleLogin} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#F3F4F6",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#1F2937",
        textAlign: "center",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: "#6B7280",
        textAlign: "center",
        marginBottom: 40,
    },

    // Estilos do container de senha para ficar igual ao componente Input
    passwordContainer: { marginBottom: 15 },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#374151",
        marginBottom: 5,
    },
    inputRow: {
        flexDirection: "row", // Coloca Input e Ícone lado a lado
        alignItems: "center",
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 50, // Altura fixa para alinhar
    },
    inputField: {
        flex: 1, // Ocupa todo o espaço sobrando
        height: "100%",
        color: "#1F2937",
    },
    iconButton: {
        padding: 5, // Aumenta a área de toque
    },
});
