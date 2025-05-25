import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#015486',
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
        paddingVertical: 12,
    },
    headerText: {
        color: '#FAFAFA',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
    },
    dateText: {
        color: '#FAFAFA',
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'center',
    },  
    scrollViewContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
        gap: 16,
    },
    smallInfoRectanglesContainer: {
        flexDirection: 'row',
        width: '85%',
        justifyContent: 'space-between',
    },
})

export default styles;