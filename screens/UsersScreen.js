import React from 'react';
import {View,StyleSheet,Text,TouchableOpacity,Image,FlatList} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import Card from '../components/Card';

const UsersScreen = props => {
    const fusers = useSelector(state => state.users.filteredUsers)
    console.log(fusers)
    const renderUser = itemData => {
        return(
            <TouchableOpacity onPress={() => {
                props.navigation.navigate('UserDetail',{
                    id: itemData.item.id
                })
            }}>
            <Card>
                <Image style={styles.profile_icon}
                    source={require('../Data/profile_icon.png')}/>
                <Text style={styles.title}>{itemData.item.name}</Text>
            </Card>
        </TouchableOpacity>
        )
    }
    return(
        <View>
            <FlatList 
            data={fusers}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderUser}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    profile_icon: {
        width: 50,
        height: 50
    },
    title: {
        paddingLeft: 5,
        alignSelf: 'center'
    }
})

export default UsersScreen;