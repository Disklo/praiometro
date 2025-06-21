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
        paddingTop: 10,
        paddingBottom: 18,
    },
    locationText: {
        color: '#FAFAFA',
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
    },
    specificLocationText: {
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
        gap: 16,
    },
    mapsButton: {
        backgroundColor: '#FAFAFA',
        paddingVertical: 14,
        paddingHorizontal: 24,
        width: '85%',
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 32,
        elevation: 4, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.18,
        shadowRadius: 4,
    },
    mapsButtonText: {
        color: '#015486',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    mapsButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
})

export default styles;