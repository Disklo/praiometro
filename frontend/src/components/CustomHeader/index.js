import { View, StyleSheet, Image } from 'react-native';
import LogoPraiometro from '../../../assets/images/LogoPraiometro.png';
import styles from './styles';

export default function CustomHeader() {
  return (
    <View style={styles.container}>
      <Image source={LogoPraiometro} style={styles.logo} />
    </View>
  );
}