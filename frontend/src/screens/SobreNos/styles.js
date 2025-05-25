import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#015486',
        paddingTop: 50,
    },

    header: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginHorizontal: 20,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#015486',
    },

    description: {
        fontSize: 16,
        fontWeight: '400',
        color: '#555',
        textAlign: 'justify',
    },

    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 20,
    },

    instagramButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 12,
        borderRadius: 12,
        width: '48%',
    },

    instagramButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#015486',
    },

    emailButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 12,
        borderRadius: 12,
        width: '48%',
    },

    emailButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#015486',
    },

    logoUFF: {
        width: 100,
        height: 100,
    }
});