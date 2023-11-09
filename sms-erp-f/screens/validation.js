import Student from '../models/Student';
import Teacher from '../models/Teacher';
import Tests from '../models/Tests';
import MarksModel from "../models/Marks";
import AttendanceModel from '../models/Attendance';
import React, { useState, useEffect } from "react";

const Validation = async ({ navigation }) => {
    const [isTeacherLoggedIn, setIsTeacherLoggedIn] = useState(false);
    const [teacher, setTeacher] = useState(null);
  
    useEffect(() => {
    //   checkTeacherLoggedInStatus();
    }, []);
  
    const checkTeacherLoggedInStatus = async () => {
    //   try {
    //     const teacherDetails = await AsyncStorage.getItem('teacherDetails');
    //     if (teacherDetails !== null) {
    //       const teacher = JSON.parse(teacherDetails);
    //       setIsTeacherLoggedIn(true);
    //       setTeacher(teacher);
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    };
  
    if (isTeacherLoggedIn) {
      const studentsData = await Student.findByClass(teacher.class_teacher_of);     
      const tests_list = await Tests.find_by_class(teacher.class_teacher_of);
      let marks = await MarksModel.findByClass(teacher.class_teacher_of);
      let attendance = await AttendanceModel.findByClass(teacher.class_teacher_of);
      navigation.replace("Home", { studentsData, teacher, tests_list, marks, attendance });
    } else {
      navigation.navigate("Login");
    }
  
    return (
      <View></View>
    );
  };
  
  export default Validation;
  