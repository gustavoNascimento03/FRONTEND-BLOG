import React, { useState, useContext, useCallback } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Alert,
    Platform,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native"; // <--- IMPORTANTE
import { AuthContext } from "../context/AuthContext";
import { Button } from "../components/MyComponents";
import api from "../services/api";

export default function PostDetailScreen({ route, navigation }) {
    const { postId } = route.params;
    const { user } = useContext(AuthContext);
    const [post, setPost] = useState(null);

    // Substituímos o useEffect pelo useFocusEffect
    useFocusEffect(
        useCallback(() => {
            loadPost();
        }, [postId])
    );

    const loadPost = async () => {
        try {
            const response = await api.get(`/posts/${postId}`);
            setPost(response.data);
        } catch (error) {
            // Se o post foi excluído e tentarmos voltar pra cá, tratamos o erro
            console.log("Erro ao carregar post (talvez tenha sido excluído).");
        }
    };

    const performDelete = async () => {
        try {
            await api.delete(`/posts/${postId}`);
            if (Platform.OS === "web") alert("Post excluído!");
            else Alert.alert("Sucesso", "Post excluído!");
            navigation.goBack();
        } catch (error) {
            const msg = error.response?.data?.msg || "Falha ao excluir";
            if (Platform.OS === "web") alert(msg);
            else Alert.alert("Erro", msg);
        }
    };

    const handleDelete = () => {
        if (Platform.OS === "web") {
            if (window.confirm("Tem certeza que deseja excluir?"))
                performDelete();
        } else {
            Alert.alert("Excluir", "Tem certeza?", [
                { text: "Cancelar", style: "cancel" },
                { text: "Sim", style: "destructive", onPress: performDelete },
            ]);
        }
    };

    if (!post)
        return (
            <View style={styles.container}>
                <Text>Carregando...</Text>
            </View>
        );

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.meta}>
                Por {post.author?.name || "Desconhecido"} •{" "}
                {new Date(post.createdAt).toLocaleDateString()}
            </Text>
            <Text style={styles.content}>{post.content}</Text>

            {user?.role === "professor" && (
                <View style={styles.actions}>
                    <Button
                        title="Editar Post"
                        onPress={() =>
                            navigation.navigate("PostForm", { post })
                        }
                        outline
                    />
                    <Button
                        title="Excluir Post"
                        color="#DC2626"
                        onPress={handleDelete}
                    />
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#FFF" },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#1F2937",
        marginBottom: 8,
    },
    meta: { fontSize: 14, color: "#6B7280", marginBottom: 24 },
    content: {
        fontSize: 16,
        lineHeight: 24,
        color: "#374151",
        marginBottom: 40,
    },
    actions: { marginTop: 20, gap: 10 },
});
