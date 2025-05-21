import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import App from './App';

// Ensure native modules are initialized
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection']);

registerRootComponent(App);
