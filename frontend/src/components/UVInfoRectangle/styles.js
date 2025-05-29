import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        width: '85%',
        height: 130,
        backgroundColor: '#FAFAFA',
        borderRadius: 12,
        padding: 16,
        flexDirection: 'column',
    },
    header: {
        flexDirection: 'row',
        gap: 6,
        alignItems: 'center',
        width: '100%',
    },
    headerText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#454A4C',
    },
    uvContainer: {
        flexDirection: 'column',
        width: '40%',
        alignItems: 'center',
        marginTop: 6,
    },
    uvNumber: {
        fontSize: 40,
        fontWeight: '500',
        color: '#015486',
        textAlign: 'center',
    },
    uvScale: {
        fontSize: 12,
        fontWeight: '400',
        textAlign: 'center',
        color: '#454A4C',
        marginHorizontal: 'auto',
    },
    recommendationsContainer: {
        width: '60%',
        justifyContent: 'center',
    },
    recommendationsText: {
        fontSize: 13,
        fontWeight: '400',
        color: '#454A4C',
        textAlign: 'right',
    },
    infoContainer: {
        flexDirection: 'row',
    },
});