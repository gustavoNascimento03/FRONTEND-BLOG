import React, { useState } from "react";
import { View, StyleSheet, Alert, TextInput, Text } from "react-native";
import { Button } from "../components/MyComponents";
import api from "../services/api";

export default function PostFormScreen({ route, navigation }) {
    const postToEdit = route.params?.post;

    const [title, setTitle] = useState(postToEdit?.title || "");
    const [content, setContent] = useState(postToEdit?.content || "");

    const handleSave = async () => {
        try {
            if (postToEdit) {
                await api.put(`/posts/${postToEdit._id}`, { title, content });
                Alert.alert("Sucesso", "Post atualizado!");
            } else {
                await api.post("/posts", { title, content });
                Alert.alert("Sucesso", "Post criado!");
            }
            navigation.goBack();
        } catch (error) {
            Alert.alert("Erro", "Falha ao salvar o post.");
        }
    };

    return (
        <View style={styles.container}>
            {/* TÍTULO */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Título do Post</Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                />
            </View>

            {/* CONTEÚDO (Multiline Nativo) */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Conteúdo</Text>
                <TextInput
                    style={[
                        styles.input,
                        { height: 150, textAlignVertical: "top" },
                    ]}
                    value={content}
                    onChangeText={setContent}
                    multiline={true} // Direto e reto
                    numberOfLines={6}
                />
            </View>

            <Button
                title={postToEdit ? "Salvar Alterações" : "Criar Post"}
                onPress={handleSave}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#FFF" },
    inputContainer: { marginBottom: 16 },
    label: { marginBottom: 6, color: "#374151", fontWeight: "600" },
    input: {
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: "#FFF",
    },
});
