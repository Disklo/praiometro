import StackNavigator from './src/StackNavigator';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useEffect } from 'react';
import Constants from 'expo-constants';

export default function App() {
    useEffect(() => {
        GoogleSignin.configure({
            webClientId: Constants.expoConfig.extra.GOOGLE_CLIENT_ID,
        });
    }, []);

    return <StackNavigator />
}