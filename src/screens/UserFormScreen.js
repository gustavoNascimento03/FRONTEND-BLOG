import React, { useState } from "react";
import { View, StyleSheet, Alert, Text, Switch } from "react-native";
import { Button, Input } from "../components/MyComponents";
import api from "../services/api";

export default function UserFormScreen({ route, navigation }) {
    const userToEdit = route.params?.user;

    const [name, setName] = useState(userToEdit?.name || "");
    const [email, setEmail] = useState(userToEdit?.email || "");
    const [password, setPassword] = useState(""); // Senha vazia na edição (só preenche se quiser mudar)
    const [isProfessor, setIsProfessor] = useState(
        userToEdit?.role === "professor"
    );

    const handleSave = async () => {
        try {
            const payload = {
                name,
                email,
                role: isProfessor ? "professor" : "student",
            };

            // Se tiver senha preenchida ou for criação, adiciona a senha
            if (password || !userToEdit) {
                payload.password = password;
            }

            if (userToEdit) {
                // EDIÇÃO (PUT /users/:id) - Verifique se a rota do seu backend é /users
                await api.put(`/users/${userToEdit._id}`, payload);
                Alert.alert("Sucesso", "Usuário atualizado!");
            } else {
                // CRIAÇÃO (POST /register ou /users)
                await api.post("/register", payload); // Usamos /register pois sabemos que funciona
                Alert.alert("Sucesso", "Usuário criado!");
            }
            navigation.goBack();
        } catch (error) {
            const msg = error.response?.data?.msg || "Erro ao salvar";
            Alert.alert("Erro", msg);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {userToEdit ? "Editar Usuário" : "Novo Usuário"}
            </Text>

            <Input label="Nome" value={name} onChangeText={setName} />
            <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />

            <Input
                label={
                    userToEdit
                        ? "Nova Senha (deixe em branco para manter)"
                        : "Senha"
                }
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <View style={styles.switchContainer}>
                <Text style={styles.label}>É Professor?</Text>
                <Switch
                    value={isProfessor}
                    onValueChange={setIsProfessor}
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isProfessor ? "#2563EB" : "#f4f3f4"}
                />
            </View>

            <Button title="Salvar" onPress={handleSave} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#FFF" },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#1F2937",
        textAlign: "center",
    },
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        marginTop: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 8,
    },
    label: { fontSize: 16, fontWeight: "600", color: "#374151" },
});
