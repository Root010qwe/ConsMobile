import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CardScreen from './screens/ServiceScreen';
import MainScreen from './screens/MainScreen';
import { store } from './store';
import { Provider } from 'react-redux';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            // Изменяем фон верхней панели
            headerStyle: {
              backgroundColor: '#0d6efd', // укажите нужный вам цвет
            },
            headerTintColor: '#fff', // цвет текста заголовка
            // Изменяем фон самого экрана (контейнера)
            contentStyle: {
              backgroundColor: '#10111b', // укажите нужный цвет для фона экрана
            },
          }}
        >
          <Stack.Screen name='CONSULTING' component={MainScreen} />
          <Stack.Screen name='Подробнее' component={CardScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}