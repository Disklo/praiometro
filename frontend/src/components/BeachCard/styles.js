import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        backgroundColor: '#FAFAFA',
        borderRadius: 20,
        width: '90%',
        height: 75,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    textContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 12,
        gap: 2,
    },
    beachTitle: {
        fontSize: 16,
        fontWeight: '400',
        color: '#015486',
    },
    location: {
        fontSize: 14,
        fontWeight: '400',
        color: '#98A4AE',
    },
})