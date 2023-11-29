import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import React from 'react'
import List_Profile from '../HomeScreens/List_Profile';
import Myaccount from '../HomeScreens/Myaccount';
import Profils from './Profils';

const Tab = createMaterialBottomTabNavigator();
function Home() {
  return (
<Tab.Navigator>

    <Tab.Screen name='List_Profile'  component={List_Profile}/>  
    <Tab.Screen name='Myaccount' component={Myaccount}/>
    <Tab.Screen name='Profils' component={Profils}/>


</Tab.Navigator>
    
  )
}

export default Home