import React, { useEffect, useState, useContext, useCallback } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    TextInput,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

// Ícones (instale se precisar: npm install lucide-react-native)
import { Plus, Search } from "lucide-react-native";

export default function HomeScreen({ navigation }) {
    const { user, signOut } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [searchText, setSearchText] = useState(""); // Estado da busca
    const [filteredPosts, setFilteredPosts] = useState([]); // Lista filtrada

    useFocusEffect(
        useCallback(() => {
            loadPosts();
        }, [])
    );

    // Efeito para filtrar sempre que o texto ou os posts mudarem
    useEffect(() => {
        if (searchText === "") {
            setFilteredPosts(posts);
        } else {
            const lowerSearch = searchText.toLowerCase();
            const filtered = posts.filter(
                (post) =>
                    post.title.toLowerCase().includes(lowerSearch) ||
                    post.content.toLowerCase().includes(lowerSearch)
            );
            setFilteredPosts(filtered);
        }
    }, [searchText, posts]);

    const loadPosts = async () => {
        try {
            const response = await api.get("/posts");
            setPosts(response.data);
        } catch (error) {
            console.log("Erro ao carregar posts");
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() =>
                navigation.navigate("PostDetail", { postId: item._id })
            }
        >
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardAuthor}>
                Por: {item.author?.name || "Autor desconhecido"}
            </Text>
            <Text numberOfLines={2} style={styles.cardPreview}>
                {item.content}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Cabeçalho */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.welcome}>
                        Olá, {user?.name || "Visitante"}
                    </Text>
                    <Text style={styles.role}>
                        Perfil:{" "}
                        {user?.role === "professor"
                            ? "Professor 👨‍🏫"
                            : "Aluno 👨‍🎓"}
                    </Text>
                </View>
                <TouchableOpacity onPress={signOut}>
                    <Text style={styles.logoutText}>Sair</Text>
                </TouchableOpacity>
            </View>

            {/* REQUISITO: Campo de Busca  */}
            <View style={styles.searchContainer}>
                <Search size={20} color="#6B7280" style={{ marginRight: 8 }} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar posts..."
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>

            {/* REQUISITO: Botão de Admin  */}
            {user?.role === "professor" && (
                <TouchableOpacity
                    style={styles.adminButton}
                    onPress={() => navigation.navigate("UserList")}
                >
                    <Text style={styles.adminButtonText}>
                        ⚙️ Gerenciar Usuários (Profs/Alunos)
                    </Text>
                </TouchableOpacity>
            )}

            {/* Lista de Posts */}
            <FlatList
                data={filteredPosts} // Usamos a lista filtrada
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <Text style={styles.empty}>Nenhum post encontrado.</Text>
                }
            />

            {/* Botão Flutuante (FAB) - SÓ PARA PROFESSORES  */}
            {user?.role === "professor" && (
                <TouchableOpacity
                    style={styles.fab}
                    onPress={() => navigation.navigate("PostForm")}
                >
                    <Plus color="#FFF" size={24} />
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F3F4F6" },
    header: {
        padding: 20,
        backgroundColor: "#FFF",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        elevation: 2,
    },
    welcome: { fontSize: 18, fontWeight: "bold", color: "#1F2937" },
    role: { fontSize: 14, color: "#6B7280" },
    logoutText: { color: "#DC2626", fontWeight: "600" },

    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF",
        margin: 20,
        paddingHorizontal: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    searchInput: { flex: 1, height: 45 },

    list: { paddingHorizontal: 20, paddingBottom: 80 },
    card: {
        backgroundColor: "#FFF",
        padding: 15,
        borderRadius: 12,
        marginBottom: 12,
        elevation: 1,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#1F2937",
        marginBottom: 4,
    },
    cardAuthor: { fontSize: 12, color: "#6B7280", marginBottom: 8 },
    cardPreview: { fontSize: 14, color: "#4B5563" },
    empty: { textAlign: "center", marginTop: 50, color: "#9CA3AF" },

    fab: {
        position: "absolute",
        right: 20,
        bottom: 20,
        backgroundColor: "#2563EB",
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
    },

    adminButton: {
        backgroundColor: "#E0E7FF",
        padding: 12,
        marginHorizontal: 20,
        marginBottom: 10,
        borderRadius: 8,
        alignItems: "center",
    },
    adminButtonText: { color: "#2563EB", fontWeight: "bold" },
});
