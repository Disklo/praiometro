import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    headerContainer: {
        width: '100%',
        height: 120,
        backgroundColor: '#015486',
        position: 'absolute',
        top: 0,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        zIndex: 100
    },
    headerLocation: {
        color: '#8fd8ff',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        gap: 22,
    },
    temperature: {
        color: '#FAFAFA',
        fontSize: 55,
        fontWeight: 'semibold',
        textAlign: 'center',
        marginTop: 8,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'flex-start',
        gap: 8,
        color: '#FAFAFA',
    },
    climateInfoContainer: {
        flexDirection: 'column',
        marginTop: 10,
        color: '#FAFAFA',
        gap: 7,
    },
    climateText: {
        color: '#FAFAFA',
        fontSize: 16,
        fontWeight: '400',
    }
});