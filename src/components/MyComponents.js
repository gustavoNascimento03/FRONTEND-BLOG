import React from "react";
import {
    TouchableOpacity,
    Text,
    TextInput,
    View,
    StyleSheet,
} from "react-native";

export const Button = ({
    title,
    onPress,
    color = "#2563EB",
    outline = false,
}) => (
    <TouchableOpacity
        style={[
            styles.btn,
            {
                backgroundColor: outline ? "transparent" : color,
                borderWidth: outline ? 1 : 0,
                borderColor: color,
            },
        ]}
        onPress={onPress}
    >
        <Text style={[styles.btnText, { color: outline ? color : "#FFF" }]}>
            {title}
        </Text>
    </TouchableOpacity>
);

export const Input = ({
    label,
    style,
    secureTextEntry,
    multiline,
    ...props
}) => {
    // LÓGICA DE PROTEÇÃO:
    // Se vier "true" (texto), vira true (booleano).
    // Se vier true (booleano), continua true.
    // Se não vier nada (undefined), vira false.
    const isSecure =
        String(secureTextEntry) === "true" || secureTextEntry === true;
    const isMultiline = String(multiline) === "true" || multiline === true;

    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[styles.input, style]}
                placeholderTextColor="#9CA3AF"
                // Aqui usamos as variáveis tratadas, garantindo que nunca quebre
                secureTextEntry={isSecure}
                multiline={isMultiline}
                {...props}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    btn: {
        padding: 14,
        borderRadius: 8,
        alignItems: "center",
        marginVertical: 8,
    },
    btnText: { fontWeight: "bold", fontSize: 16 },
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
