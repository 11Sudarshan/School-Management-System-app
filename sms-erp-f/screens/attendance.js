//importing 
import {uri} from '../gv/global_variables'
import React from "react";

import { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Button,
  Platform,
  ScrollView,
  TouchableOpacity,
  TextInput,

} from "react-native";
import AttendanceModel from '../models/Attendance';
import { LinearGradient } from "expo-linear-gradient";
import Checkbox from "expo-checkbox";
//const definations
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;



const Attend = ({navigation,route}) => {
  const {students,attendance,teacher,flag} =route.params;
  console.log(flag)
  
  const [selectedDate, setSelectedDate] = useState(new Date());
  const currentDate = new Date().toISOString().substring(0, 10);
  const [checkboxStates, setCheckboxStates] = useState(() => {
    const initialStates = new Array(students.length).fill(false);
    if(flag){
      let initialAttendanceObj ;
      console.log("att");
      console.log(attendance);
      for(var i =0;i<attendance.length;i++){
        if(attendance[i].date==currentDate){
          initialAttendanceObj=attendance[i].attendance;
          for(const sl_no in initialAttendanceObj){
            console.log(sl_no)
            console.log(initialAttendanceObj[sl_no])
            initialStates[Number(sl_no)-1]= initialAttendanceObj[sl_no]==1;
          }
          //  attendance.forEach((data) => {
        // const index = students.findIndex((student) => student.sl_no === data.sl_no);
        // if (index >= 0) {
        //   initialStates[index] = data.status === 1;
        // }
      // });
        }
      }

     
    }
    return initialStates;
  });
  
  const [selectAll, setSelectAll] = useState(false);

  const handleCheckboxPress = (index) => {
    const newCheckboxStates = [...checkboxStates];
    console.log(index)
    newCheckboxStates[index] = !newCheckboxStates[index];
    setCheckboxStates(newCheckboxStates);
  };
  const handleSelectAll = () => {
    const newCheckboxStates = checkboxStates.map((newCheckboxStates) => {
      return !selectAll;
    });
    setCheckboxStates(newCheckboxStates);
    setSelectAll(!selectAll);
  };

  const handleSave = () => {
    // Create an object to hold the attendance data
    const attendanceData = {};
  
    // Loop through the checkbox states and add the attendance data for each student to the object
    for (let i = 0; i < checkboxStates.length; i++) {
      const student = students[i];
      attendanceData[student.sl_no] = checkboxStates[i] ? 1 : 0;
    }
  
    // Call the save function with the attendance data
    saveAttendance(attendanceData);
  };
  
  const saveAttendance = async (attendanceData) => {
    const attendanceObj = new AttendanceModel(teacher.class_teacher_of,selectedDate.toISOString().substring(0, 10),{ ...attendanceData } )
    // Perform the save operation here using the attendance data
console.log(attendanceObj);
    let jsonData = JSON.stringify(attendanceObj);
      fetch(`${uri}/attendance/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: jsonData
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
    console.log(attendance);
  };
  
  
  

    //present date 

   

  return (
    
    <View style={styles.background}>
      <LinearGradient
        colors={['#b16b00', '#DE8600']}
        start={[0,0]}
        end={[1,1]}
        style={styles.yellowHeader}
      >
        <View>
          <Text style={styles.headerText}>Fill Attendence</Text>

            <View style={styles.detailsText1}>
              <Text style={styles.detailsText}>Class : 8</Text>
              <Text style={styles.detailsText}>Section : A</Text> 
           
            </View >   
            <View style={{ flex: 1 }}>
      <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold', marginVertical: 10, left:130,top:20 }}>
Date:  {currentDate}
</Text>
    </View>  
            <View>
            </View>
            <View>
                
            </View>   
          </View>
      </LinearGradient>
      <View style={styles.whiteContainer}>
        <View><Text style={{left: 50, fontWeight: 600}}>Select All</Text>
            <Checkbox
              value={selectAll}
              color={selectAll ? "#555A54" : undefined}
              onValueChange={() => handleSelectAll()}
              style={{ left:20,bottom: 15}}
            /></View>
        <ScrollView showsVerticalScrollIndicator={false} >
      <View style={styles.studentList}>
      {students.map((student, index) => {
        const student_index =Number(student.sl_no)-1
    return (
      <TouchableOpacity key={index} onPress={() => handleCheckboxPress(index)}>
        <View style={styles.box}>
          <Checkbox
            value={checkboxStates[student_index]}
            color={checkboxStates[student_index] ? "#DE8600" : "#DE8600"}
            onValueChange={() => handleCheckboxPress(student_index)}
            style={styles.boxcheck}
          />
          <Text style={styles.text}>{student.name}</Text>
        </View>
      </TouchableOpacity>
    );
  })}
          </View>
        <View>
        
        </View>
        
        </ScrollView>
        <View style={styles.saveButton}>
  <Button
    title="Save"
    color="#DE8600"
    onPress={handleSave}
  />
</View>

      </View>
      <View style={{top:screenHeight/1.5 , width: 100 ,left: screenWidth/3,}}>
      <Button title="Done" color='#DE8600'></Button>
      </View>
    </View>
 
  );
};


//design
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "black",
  },
  detailsText: {
    paddingTop: 10,
    color: "white",
    marginRight:40,
    fontSize: 18,
  },saveButton: {
    position: 'absolute',
    bottom: 20,
    width: screenWidth - 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  yellowHeader: {
    flexDirection:'row',
    height: screenHeight / 3.5,
    paddingTop: screenHeight * 0.05,
    paddingLeft: 30,
  },
  headerText: {
    fontSize: 30,
    marginTop: 10,
    fontWeight: "bold",
    color: "white",
    
  },
  wrapper: {
   flexDirection:'row',
   borderColor:'black',
   
   borderWidth:1,
    alignContent: "center",
 
  },studentList: {
    flex: 1,
  },
  whiteContainer: {
    position: "absolute",
    top: screenHeight / 3.9,
    width: screenWidth-24 ,
    height: screenHeight / 1.37,
    backgroundColor: "white",
    paddingTop: 15,
    //   justifyContent: 'center',
    alignItems: "center",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomEndRadius: 50,
    borderBottomLeftRadius: 50,
    transform: [{ translateY: -20 }],
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    left:12,
    right:12,
    paddingBottom: 15,
    elevation: 10,
    borderColor: 'black',
  },
  box: {
    flexDirection: "row",

    //   alignItems: 'center',
    justifyContent: "space-between",
    backgroundColor: "#E0E0E0",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginVertical: 10,
    width: screenWidth - 60,
    borderColor:'black',
    borderWidth:1,
    elevation:5,
    marginBottom:15,
    height:70,
    paddingBottom:10,

    
  },
  boxText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#333",
 
  },
  text:{
    marginTop: 10,
    fontWeight: 600,
  },
  // icon: {
  //   flexDirection: "row",

  // },
  headerbox:{
    flexDirection: "row",
    justifyContent:'space-around',
  },
  detailsText1:{
    flexDirection: "row",
  },
 
  boxcheck:{
    marginTop: 8,
    marginRight: 5,
  },


  





});

export default Attend;