import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import StartupScreen from '../screens/StartupScreen';
import AuthScreen from '../screens/AuthScreen';
import UsersScreen from '../screens/UsersScreen';
import UserDetail from '../screens/UserDetail';

const MainNavigator = createStackNavigator({
    Users: UsersScreen,
    UserDetail: UserDetail
})

const RootNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth: AuthScreen,
    Main: MainNavigator
})

export default createAppContainer(RootNavigator)