import StackNavigator from './src/StackNavigator';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useEffect } from 'react';

export default function App() {
    useEffect(() => {
        GoogleSignin.configure({
            webClientId: process.env.GOOGLE_CLIENT_ID,
            offlineAccess: true,
        });
    }, []);

    return <StackNavigator />
}