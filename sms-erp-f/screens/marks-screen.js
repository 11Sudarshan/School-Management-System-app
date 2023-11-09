import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import {uri} from '../gv/global_variables'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TextInput
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MarksModel from "../models/Marks";

const screenWidth = Dimensions.get("window").width;

// const uri = 'http://10.100.46.176:5000'
const screenHeight = Dimensions.get("window").height;

const Marks = ({ navigation, route }) => {
  const { students,teacher, marks,tests_list,test_name } = route.params;
  // console.log(tests[0].subjects[0])

  const [attendancePercentage, setAttendancePercentage] = useState(75);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [filteredMarks, setFilteredMarks] = useState([]);
  
  
  const [isEditing, setIsEditing] = useState(false);
  const [isNotFilled, setNotFilled] = useState(true);

  
 

    
    useEffect(() => {
      if (selectedSubject) {
        const filtered = marks.filter(
          (mark) =>
            mark.class_ === teacher.class_teacher_of &&
            mark.subject_id === selectedSubject &&
            mark.test_id === test_name
        );
        if (filtered.length > 0) {
          setFilteredMarks(filtered[0].student_marks);
        } else {
          setIsEditing(true)
          console.log("else")
          const newMarks = students.reduce((acc, curr) => {
            return {
              ...acc,
              [curr.sl_no]: ""
            }
          }, {});
          console.log(test_name);
          let newmarksobject = new MarksModel(teacher.class_teacher_of,test_name,selectedSubject,newMarks);
          console.log(newmarksobject.test_id);
          marks.push(newmarksobject);
          setFilteredMarks(newMarks);
        }
      } else {
        setFilteredMarks([]);
        setIsEditing(false)
      }
    }, [selectedSubject, marks]);
    

  const handleUpdateButtonClick = () => {
     if(isEditing) {
      console.log("kkk")
      console.log(filteredMarks)
      
      let filtered2 = marks.filter(
        (mark) =>
          mark.class_ === teacher.class_teacher_of &&
          mark.subject_id === selectedSubject &&
          mark.test_id === test_name
      );
      
    
      filtered2 = filtered2[0]
      console.log(filtered2)
      filtered2.student_marks = filteredMarks
      console.log(filtered2)
      let jsonData = JSON.stringify(filtered2);
      fetch(`${uri}/marks/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: jsonData
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
      setIsEditing(!isEditing);
      // Save updated marks
      // You can call an API to save the updated marks here, if needed
    }
    else{
      setIsEditing(!isEditing);
    }
    
  };

  const handleSubjectChange = (itemValue) => {
    setSelectedSubject(itemValue);
  };

 

  const subjectList = [
    { label: "Select Subject", value: null },
    { label: "All", value: "All" },
    { label: "Kannada", value: "kannada" },
    { label: "English", value: "english" },
    { label: "Hindi", value: "hindi" },
    { label: "Maths", value: "maths" },
    { label: "Science", value: "science" },
    { label: "Social", value: "social" },
  ];

  return (
    <View style={styles.background}>
      <LinearGradient
        colors={["#b16b00", "#DE8600"]}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.yellowHeader}
      >
        <View>
          <View style={styles2.header}>
            <Text style={styles2.logo}>Marks: {test_name}</Text>
          </View>
          <View style={styles2.divider} />
          <View style={styles2.row}>
            
            <View style={styles2.dividerrow} />
            <View style={styles2.dropdownContainer}>
              <Picker
                style={styles2.dropdown}
                selectedValue={selectedSubject}
                onValueChange={handleSubjectChange}
              >
                {subjectList.map((item) => (
                  <Picker.Item
                    key={item.value}
                    label={item.label}
                    value={item.value}
                  />
                ))}
              </Picker>
            </View>
            <View style={styles2.dividerrow} />
            <TouchableOpacity
      style={styles2.button1}
      onPress={handleUpdateButtonClick}
    >
      <Text style={styles.buttonText}>{isEditing ? "SAVE" : "UPDATE"}</Text>
    </TouchableOpacity>

          </View>
        </View>
      </LinearGradient>
      <View style={styles.whiteContainer}>
        {selectedSubject === null ? (
          <Text style={styles.noSelectionText}>Select subject</Text>
        ) : filteredMarks.length==0? (
          <Text style={styles.noSelectionText}>Marks not filled yet, Fill marks</Text>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
           {students.map((student, index) => {
      return (
        <View key={index} style={styles.box}>
          <Text style={styles.text}>{student.name}</Text>
          {isEditing ? (
            <TextInput
              style={styles.attendancePercentageText}
              value={filteredMarks[student.sl_no].toString()}
              onChangeText={(text) => {
                if (isNaN(parseInt(text)) && text !== "") {
                  return;
                }
                setFilteredMarks((prevFilteredMarks) => {
                  return {
                    ...prevFilteredMarks,
                    [student.sl_no]: text === "" ? "" : text.toString(),
                  };
                });
              }}
              keyboardType="number-pad"
            />
          ) : (
            <Text style={styles.attendancePercentageText}>
              {filteredMarks[student.sl_no]}
            </Text>
          )}
        </View>
      );
    })}
          </ScrollView>
        )}
      </View>
    </View>
  );
            }
     
     
     
     
     
     
     
     
     
            const styles = StyleSheet.create({
              background: {
                backgroundColor: "#F9F9F9",
                flex: 1,
              },
              yellowHeader: {
                paddingVertical: 20,
                paddingHorizontal: 30,
              },
              whiteContainer: {
                backgroundColor: "#FFFFFF",
                flex: 1,
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
                marginTop: -30,
                paddingHorizontal: 20,
                paddingVertical: 30,
              },
              box: {
                backgroundColor: "#F5F5F5",
                borderRadius: 10,
                padding: 20,
                marginBottom: 10,
              },
              text: {
                fontSize: 18,
                fontWeight: "600",
                color: "#333333",
                marginBottom: 10,
              },
              attendancePercentageText: {
                fontSize: 24,
                fontWeight: "700",
                color: "#b16b00",
              },
              noSelectionText: {
                fontSize: 18,
                fontWeight: "600",
                color: "#333333",
                textAlign: "center",
                marginTop: 20,
              },
            });
            
            const styles2 = StyleSheet.create({
              header: {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              },
              logo: {
                fontSize: 24,
                fontWeight: "bold",
                color: "#FFFFFF",
              },
              button: {
                backgroundColor: "#FFFFFF",
                borderRadius: 20,
                paddingHorizontal: 10,
                paddingVertical: 5,
              },
              buttonText: {
                fontSize: 16,
                fontWeight: "600",
                color: "#b16b00",
              },
              divider: {
                height: 2,
                backgroundColor: "#FFFFFF",
                marginVertical: 20,
              },
              row: {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              },
              dropdownContainer: {
                flex: 1,
                backgroundColor: "#FFFFFF",
                borderRadius: 10,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderWidth: 1,
                borderColor: "#b16b00",
              },
              dropdown: {
                color: "#b16b00",
                fontWeight: "600",
              },
              dividerrow: {
                width: 20,
              },
              button1: {
                backgroundColor: "#FFFFFF",
                borderRadius: 20,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderWidth: 1,
                borderColor: "#b16b00",
              },
            });

export default Marks ;