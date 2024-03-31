import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AuthProvider} from './src/auth/authProvider';
import {WatchScreen} from './src/screens/watchScreen';
import {MainStack} from './src/stacks/mainStack';
import {StuidoStack} from './src/stacks/studioStack';
import {globalStyles} from './src/styles/globalStyles';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: globalStyles.primaryColor,
    background: globalStyles.backgroundColor,
    text: 'white',
  },
  dark: true,
};

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer theme={MyTheme}>
          <StatusBar backgroundColor={globalStyles.backgroundColor} />
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="main" component={MainStack} />
            <Stack.Screen name="watch" component={WatchScreen} />
            <Stack.Screen name="studio" component={StuidoStack} />
            <Stack.Screen name="video-detail" component={StuidoStack} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

export default App;
