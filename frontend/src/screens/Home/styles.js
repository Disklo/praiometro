import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        width: '100%',
        height: 100,
        backgroundColor: '#015486',
        position: 'absolute',
        top: 0,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        zIndex: 100
    },
    map: {
        flex: 1,
        width: '100%',
        zIndex: 1,
    },
})