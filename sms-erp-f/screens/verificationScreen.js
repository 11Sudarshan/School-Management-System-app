import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Student from '../models/Student';
import Teacher from '../models/Teacher';
import Tests from '../models/Tests';
import MarksModel from "../models/Marks";
import AttendanceModel from '../models/Attendance';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EmptyScreen = ({ navigation }) => {
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    checkTeacherLoggedInStatus();
  }, []);

  const checkTeacherLoggedInStatus = async () => {
    try {
      const teacherDetails = await AsyncStorage.getItem('teacherDetails');
      if (teacherDetails !== null) {
        const teacher = JSON.parse(teacherDetails);
        setTeacher(teacher);
        console.log(teacher.class_teacher_of)
        if (teacher !== null) {
          const studentsData = await Student.findByClass(teacher.class_teacher_of);     
          const tests_list = await Tests.find_by_class(teacher.class_teacher_of);
          let marks = await MarksModel.findByClass(teacher.class_teacher_of);
          let attendance = await AttendanceModel.findByClass(teacher.class_teacher_of);
          navigation.replace("Home", { studentsData, teacher, tests_list, marks, attendance });
        } else {
          navigation.replace("Login");
        }
      } 
      // else {
      //   navigation.replace("Login");
      // }
    } catch (error) {
      navigation.replace("Login");
    }
  };

  return (
    <View style={styles.container}>
      <Text>This is an empty screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default EmptyScreen;
