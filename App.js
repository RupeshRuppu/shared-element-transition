import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListScreen from './components/ListScreen';
import DetailScreen from './components/DetailScreen';

const Stack = createNativeStackNavigator();

export default function () {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="ListScreen" component={ListScreen} />
        <Stack.Screen
          name="DetailScreen"
          options={{
            presentation: 'transparentModal',
          }}
          component={DetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
