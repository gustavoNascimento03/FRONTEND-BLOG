import React, { useState, useCallback } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Platform,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Edit2, Trash2, Plus, User, GraduationCap } from "lucide-react-native";
import api from "../services/api";

export default function UserListScreen({ navigation }) {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("professor"); // 'professor' ou 'student'

    useFocusEffect(
        useCallback(() => {
            loadUsers();
        }, [])
    );

    const loadUsers = async () => {
        try {
            // Assume que existe uma rota GET /users que retorna todos
            // Se não existir, teremos que criar no backend ou usar o que tiver
            const response = await api.get("/users");
            setUsers(response.data);
        } catch (error) {
            console.log(
                "Erro ao listar usuários. Verifique se a rota GET /users existe."
            );
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = async () => {
            try {
                await api.delete(`/users/${id}`);
                if (Platform.OS === "web") alert("Usuário excluído");
                loadUsers();
            } catch (error) {
                alert("Erro ao excluir");
            }
        };

        if (Platform.OS === "web") {
            if (window.confirm("Excluir usuário?")) confirmDelete();
        } else {
            Alert.alert("Excluir", "Tem certeza?", [
                { text: "Cancelar" },
                { text: "Sim", onPress: confirmDelete },
            ]);
        }
    };

    // Filtra a lista com base na aba selecionada
    const filteredUsers = users.filter((u) => u.role === filter);

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.email}>{item.email}</Text>
                <Text style={styles.role}>
                    {item.role === "professor" ? "Professor" : "Aluno"}
                </Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("UserForm", { user: item })
                    }
                    style={styles.btnIcon}
                >
                    <Edit2 size={20} color="#2563EB" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleDelete(item._id)}
                    style={styles.btnIcon}
                >
                    <Trash2 size={20} color="#DC2626" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Abas de Filtro */}
            <View style={styles.tabs}>
                <TouchableOpacity
                    style={[
                        styles.tab,
                        filter === "professor" && styles.activeTab,
                    ]}
                    onPress={() => setFilter("professor")}
                >
                    <User
                        size={20}
                        color={filter === "professor" ? "#FFF" : "#374151"}
                    />
                    <Text
                        style={[
                            styles.tabText,
                            filter === "professor" && styles.activeTabText,
                        ]}
                    >
                        Professores
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.tab,
                        filter === "student" && styles.activeTab,
                    ]}
                    onPress={() => setFilter("student")}
                >
                    <GraduationCap
                        size={20}
                        color={filter === "student" ? "#FFF" : "#374151"}
                    />
                    <Text
                        style={[
                            styles.tabText,
                            filter === "student" && styles.activeTabText,
                        ]}
                    >
                        Alunos
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={filteredUsers}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />

            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate("UserForm")}
            >
                <Plus color="#FFF" size={24} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F3F4F6" },
    tabs: {
        flexDirection: "row",
        padding: 10,
        backgroundColor: "#FFF",
        elevation: 2,
    },
    tab: {
        flex: 1,
        flexDirection: "row",
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        gap: 8,
    },
    activeTab: { backgroundColor: "#2563EB" },
    tabText: { fontWeight: "600", color: "#374151" },
    activeTabText: { color: "#FFF" },
    list: { padding: 20 },
    card: {
        backgroundColor: "#FFF",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        elevation: 1,
    },
    name: { fontSize: 16, fontWeight: "bold", color: "#1F2937" },
    email: { fontSize: 14, color: "#6B7280" },
    role: { fontSize: 12, color: "#2563EB", marginTop: 4 },
    actions: { flexDirection: "row", gap: 15 },
    fab: {
        position: "absolute",
        right: 20,
        bottom: 20,
        backgroundColor: "#10B981",
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
    },
});
