import React,{useCallback,useReducer,useEffect,useState} from 'react';
import {View,
        StyleSheet,
        Button,
        ScrollView,
        KeyboardAvoidingView,
        Alert,
        ActivityIndicator} from 'react-native';
import {useDispatch} from 'react-redux';

import * as authActions from '../store/actions/auth';

import LinearGradient from 'react-native-linear-gradient';
import Input from '../components/Input';
import Card from '../components/Card';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state,action) => {
    if(action.type === FORM_INPUT_UPDATE){
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        }
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }
        let updatedFormIsValid = true
        for(const key in updatedValidities){
            updatedFormIsValid = updatedFormIsValid &&updatedValidities[key]
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        }
    }
    return state
}

const AuthScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isLogin, setIsLogin] = useState(false);
    const dispatch = useDispatch(); 
    const [formState,dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        },
        inputValidities: {
                email: false,
                password: false
        },
        formIsValid: false
    })
    useEffect(() => {
        if (error) {
          Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
        }
      }, [error]);
    const authHandler = async () => {
        dispatch(authActions.login(
            formState.inputValues.email,
            formState.inputValues.password
        ))
        props.navigation.navigate('Users')
    }
    
    const inputChangeHandler = useCallback(
        (inputIdentifier,inputValue,inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            })
        },
        [dispatchFormState]
    )
    return(
        <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={30}
            style={styles.screen}>
        <LinearGradient colors={['#ffedff','#ffe3ff']} style={styles.gradient}>
            <Card style={styles.authContainer}>
                <ScrollView>
            <Input 
                id="email"
                label="E-mail"
                keyboardType="email-address"
                required
                email
                autoCapitalize="none"
                errorText="Please enter a valid email"
                onInputChange={inputChangeHandler}
                initialValue=""/>
            <Input 
                id="password"
                label="Password"
                keyboardType="default"
                secureTextEntry
                required
                minLength={5}
                autoCapitalize="none"
                errorText="Please enter a valid password"
                onInputChange={inputChangeHandler}
                initialValue=""/>
            <View style={styles.buttonContainer}>
                {isLoading ? (
                    <ActivityIndicator size="small"/>
                ) : (
                    <Button 
                    title="Login"
                    onPress={authHandler}/>
                )}    
                 </View>
              </ScrollView>
            </Card>
        </LinearGradient>
     </KeyboardAvoidingView>
    )
}

AuthScreen.navigationOptions = {
    headerTitle: 'LoginScreen'
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20
      },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default AuthScreen;