import {uri} from '../gv/global_variables'
import React, { useState } from "react";
import { StatusBar } from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Logo from "../assets/logo.jpg";
import Icon from 'react-native-vector-icons/FontAwesome';
import Student from '../models/Student';
import Teacher from '../models/Teacher';
import Tests from '../models/Tests';
import Marks from "./marks-screen";
import MarksModel from "../models/Marks";
import AttendanceModel from '../models/Attendance';


const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);


  const handleForgotPassword = () => {
    navigation.navigate("forgetpassword");
  };
  const handleLogin = async () => {
  //   try {
  //     const teacher = await Teacher.authenticate("class8","123456")
  //     const studentsData = await Student.findByClass(teacher.class_teacher_of);     
  //     const tests_list =await  Tests.find_by_class(teacher.class_teacher_of)
  //     let marks = await MarksModel.findByClass(teacher.class_teacher_of);
  //     let attendance = await AttendanceModel.findByClass(teacher.class_teacher_of)
  //     console.log(attendance.attendance)
  //     await AsyncStorage.setItem('teacherDetails', JSON.stringify(teacher));
  //     navigation.replace("Home", { studentsData, teacher,tests_list,marks,attendance});
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar barStyle="dark-content" backgroundColor="white" /> */}
      <ImageBackground
        source={require("../image/main.jpg")}
        style={styles.image}
        resizeMode="cover"
      >
        <View style={styles.logoContainer}>
          <Image source={Logo} style={styles.logo} resizeMode="contain" />
        </View>
      </ImageBackground>
      <Text style={styles.heading}>Ardeshalli Govt School</Text>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Icon name="user" size={20} color="#808080" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={(text) => setUsername(text)}
            value={username}
          />
        </View>
        <View style={{height :20}}></View>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#808080" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Icon
              name={isPasswordVisible ? 'eye-slash' : 'eye'}
              size={20}
              color="#808080"
              style={styles.passwordIcon}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.LoginbuttonText}>Login</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPassword}>
            Forgot Password? Click here
          </Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    flex: 1,
    height: "50%",
    justifyContent: "center",
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20%",
  },
  logo: {
    width: "50%",
    height: "50%",
    borderRadius: 100,
  },
  heading: {
    fontSize: 20,
    // marginTop: 20,
    textAlign: "center",
  },
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#D3D3D3",
    marginBottom: 10,
    width: "80%",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#000000",
  },
  passwordIcon: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 50,
  },
  LoginbuttonText: {
    color: "white",
    fontSize: 18,
  },
  forgotPassword: {
    color: "blue",
    textDecorationLine: "underline",
    marginTop: 20,
  },
});
}
export default Login;
