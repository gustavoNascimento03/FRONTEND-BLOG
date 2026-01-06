import React, { useState, useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Alert,
    TouchableOpacity,
} from "react-native";
import { AuthContext } from "../context/AuthContext";

// Botão simples direto no arquivo para evitar problemas de importação
const SimpleButton = ({ title, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.btn}>
        <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
);

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signIn } = useContext(AuthContext);

    const handleLogin = async () => {
        try {
            await signIn(email, password);
        } catch (error) {
            Alert.alert("Erro", "Falha no login");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Teste Rápido</Text>

            <View style={styles.inputBox}>
                <Text>Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />
            </View>

            <View style={styles.inputBox}>
                <Text>Senha (Visível para Teste)</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    // REMOVI O secureTextEntry PARA NÃO DAR ERRO
                />
            </View>

            <SimpleButton title="ENTRAR" onPress={handleLogin} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#DDD",
    },
    title: { fontSize: 24, textAlign: "center", marginBottom: 20 },
    inputBox: {
        marginBottom: 15,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 8,
    },
    input: { borderBottomWidth: 1, height: 40, marginTop: 5 },
    btn: {
        backgroundColor: "blue",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    btnText: { color: "white", fontWeight: "bold" },
});
