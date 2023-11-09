import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './screens/authscreen';
import StudentList from './screens/students-list';
import TeacherScreen from './screens/homescreen';
import StudentDetailsPage from './screens/student-details';
import AttendPercent from './screens/attendance-main';
import Marks from './screens/marks-screen';
import MarksMainScreen from './screens/marks-main-screen';
import Attend from './screens/attendance';
import Student from './models/Student';
import Teacher from './models/Teacher';
import Tests from './models/Tests';
import MarksModel from "./models/Marks";
import AttendanceModel from './models/Attendance';
import Validation  from './screens/validation';
import EmptyScreen from './screens/verificationScreen';

const Stack = createStackNavigator();

const App = () => {

  

  return (
    <NavigationContainer >
      
      <Stack.Navigator initialRouteName="Verification" screenOptions={{ headerShown: false }}>
        
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={TeacherScreen} />
        <Stack.Screen name="StudentList" component={StudentList} />
        <Stack.Screen name="StudentDetails" component={StudentDetailsPage} />
        <Stack.Screen name='Marks' component={Marks} />
        <Stack.Screen name='MarksMain' component={MarksMainScreen} />
        <Stack.Screen name="AttendanceMain" component={AttendPercent} />
        <Stack.Screen name="Attendance" component={Attend} />
        <Stack.Screen name='Validation' component={Validation}/>
        <Stack.Screen name='Verification' component={EmptyScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
