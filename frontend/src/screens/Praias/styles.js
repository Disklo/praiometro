import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#015486',
    },
    header: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 15,
        gap: 16,
    },
    searchBarContainer: {
        width: '90%',
        height: 45,
        backgroundColor: '#FAFAFA',
        borderRadius: 20,
        paddingHorizontal: 16,
        fontSize: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    searchBar: {
        height: 30,
    },
    cardContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
    },
    noBeachesText: {
        color: '#FAFAFA',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20
    }
})