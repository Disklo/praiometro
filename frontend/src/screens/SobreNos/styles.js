import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#015486',
        paddingVertical: 20,
        alignItems: 'center',   
    },
    header: {
        backgroundColor: '#fff',
        paddingHorizontal: 22,
        paddingTop: 22,
        paddingBottom: 22,
        borderRadius: 12,
        width: '90%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#015486',
    },
    description: {
        fontSize: 16,
        fontWeight: '400',
        color: '#555',
        textAlign: 'justify',
        lineHeight: 22,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginTop: 16,
    },
    instagramButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 14,
        borderRadius: 8,
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
        paddingVertical: 14,
        borderRadius: 8,
        width: '48%',
    },
    emailButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#015486',
    },
});