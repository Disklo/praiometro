import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        backgroundColor: '#015486',
        flex: 1,
    },
    headerText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 10,
    },
    temperature: {
        color: '#FFFFFF',
        fontSize: 80,
        fontWeight: '400',
        textAlign: 'center',
        position: 'relative',
        left: 16,
    },
    infoContainer: {
        marginTop: 16,
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
    },
    squaresContainer: {
        flexDirection: 'row',
        gap: 16,
        width: '85%',
    },
    fullScreen: {
        flex: 1,
        backgroundColor: '#015486',
    }
})