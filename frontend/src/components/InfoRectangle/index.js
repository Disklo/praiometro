import { View, Text } from 'react-native';
import Foundation from '@expo/vector-icons/Foundation';
import styles from './styles';

export default function InfoRectangle({title, description = "Sem informações", children, danger = false}) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {children}
        <View style={styles.textContainer}>
            <Text style={styles.boldText}>{description}</Text>
            <Text style={styles.regularText}>{title}</Text>
        </View>
      </View>
      {danger && (
        <View style={styles.alertMessage}>
          <Foundation name="alert" size={35} color="#FFC107" />
          <Text style={styles.alertText}>Perigoso para banhistas!</Text>
        </View>
      )}
    </View>
  );
}