import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    Button,
    Text
} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import * as userActions from '../store//actions/users';

const UserDetail = props => {
    const users = useSelector(state => state.users.users)
    const userId = props.navigation.getParam('id')
    const selectedUser = users.find(user => user.id === userId)
    const dispatch = useDispatch()


    return(
       <View style={{flex: 1}}>
                <Image 
                    style={styles.profile_icon_style}
                    source={require('../Data/profile_icon.png')} />
                
                        <Text style={styles.textingStyle}>Id: {selectedUser.id}</Text>
                        <Text style={styles.textingStyle}>UserName: {selectedUser.name}</Text>
                        <Text style={styles.textingStyle}>Email: {selectedUser.email}</Text>
                        <Text style={styles.textingStyle}>Description: {selectedUser.Description}</Text>

                <Button title="Hide me" onPress={() => {dispatch(userActions.removeUser(selectedUser.id))}} />
                <View style={styles.logoutButtonStyle}>
                <Button  title="LogOut" onPress={() => props.navigation.navigate('Auth') }/>
                </View>
             </View>
    )
}

const styles = StyleSheet.create({
    profile_icon_style:{
        width: 200,
        height: 200,
        alignSelf:'center'
    },
    textingStyle:{
        fontSize: 18,
        paddingLeft: 15,
        fontWeight: 'bold'
    },
    logoutButtonStyle:{
        alignItems: 'center',
        marginVertical: 5
    }
})

export default UserDetail;