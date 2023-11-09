import React, { useState } from "react";
import { StatusBar } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";import { Alert } from 'react-native';
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";

import AsyncStorage from '@react-native-async-storage/async-storage';
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

  const TeacherScreen = ({navigation,route} ) => {
  const { studentsData, teacher,tests_list,marks,attendance} = route.params;


  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const [showMenu, setShowMenu] = useState(false);
const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    }
  
    const handleProfilePress = () => {
      // Handle profile option press
    }
  
    const handleLogoutPress = () => {
      // Handle logout option press
    }
  
    const handleLibraryPress = () => {
      // Handle library option press
    }

    
  const handleIconPress = (index) => {
    if(index==0){
    navigation.navigate('StudentList',{students : studentsData })
    }
    if(index==1){
      navigation.navigate('MarksMain',{students : studentsData ,teacher,tests_list,marks})
      }
      if(index==2){
        navigation.navigate('AttendanceMain',{students: studentsData,teacher,attendance})
      }
      if(index==4){
        Alert.alert(
          "Logout",
          "Are you sure you want to logout?",
          [
            {
              text: "Cancel",
              style: "cancel"
            },
            {
              text: "Logout",
              onPress: async () => {
                // Handle logout logic here
                await AsyncStorage.clear(); // Clear async storage, for example
                navigation.navigate("Login"); // Navigate to login screen
              },
              style: "destructive"
            }
          ]
        );
      }
      
  };

  const renderIcon = (text, iconName, color, index) => {
    let IconComponent = FontAwesome;
    if (iconName.startsWith("md-")) {
      IconComponent = MaterialIcons;
      iconName = iconName.slice(3);
    } else if (iconName.startsWith("mcm-")) {
      IconComponent = MaterialCommunityIcons;
      iconName = iconName.slice(4);
    }

    return (
      <TouchableOpacity
        key={index}
        style={styles.iconContainer}
        onPress={() => handleIconPress(index)}
      >
        <IconComponent name={iconName} size={50} color={color} />
        <Text style={styles.iconText}>{text}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="light-content" backgroundColor="#ED3056" />
      <View style={styles.background}>
        <LinearGradient
          colors={["#ED3056", "#E28413"]}
          start={[0,0]}
          end={[0,1]}
          style={styles.yellowHeader}
        >
          <View style={{ height: 30, right: 9, left: 35 }}>
            <View>
              <Text style={[styles.headerText]}>Raghav Kumar Jha</Text>

              <View style={styles.detailsRow1}>
                <Text style={{
      color: "#FDF0D5",
      fontSize: 20,
      paddingLeft: screenWidth * 0.02,
      fontWeight : "bold"
    }}>Class  :  {teacher.class_teacher_of}</Text>
                
      
              </View>
            


              <View style={styles.detailsRow1}>
               
                <Text style={{
      color: "#FDF0D5",
      fontSize: 20,
      width : "35%",
      paddingLeft: screenWidth * 0.02,
    }}>Ph no</Text>
                <Text style={{
      color: "#FDF0D5",
      fontSize: 20,
      paddingLeft: screenWidth * 0.02,
    }}>Email id </Text>
              </View>
              <View style={styles.detailsRow2}>
          
               
                <Text style={{
      color: "white",
      fontSize: 15+5,
      width : "35%",
      paddingLeft: screenWidth * 0.02,
      fontWeight: "bold"
    }}>9945618018</Text>
                
                <Text style={styles.detailsTextValues}>lokeshloki6363@gmail.com</Text>
              </View>
             
              
            </View>
          </View>
        </LinearGradient>
        <LinearGradient
          colors={["#E3E3E3", "#E3E3E3"]}
          start={[0, 1]}
          end={[0, 0]}
          style={styles.whiteContainer}
        >
          <ScrollView contentContainerStyle={styles.grid}>
            {/* <View style={{ }}></View> */}
            <View style={styles.iconRow}>
              {renderIcon("Students", "users", "#FFC107", 0)}
              <View style={{ width: 20 }}></View>
              {renderIcon("Marks", "md-trending-up", "#9C27B0", 1)}
            </View>
            <View style={styles.iconRow}>
              {renderIcon(
                "Attendance",
                "mcm-calendar-check-outline",
                "#4CAF50",
                2
              )}
              <View style={{ width: 20 }}></View>
              {renderIcon(
                "Class Time Table",
                "mcm-calendar-clock",
                "#F44336",
                3
              )}
            </View>
            <View style={styles.iconRow}>
              {renderIcon(
                "Logout",
                "mcm-calendar-check-outline",
                "#4CAF50",
                4
              )}
            
            </View>
           
          </ScrollView>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    iconRow: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      paddingHorizontal: screenWidth * 0.05,
      marginTop: screenHeight * 0.02,
    },
   
    iconContainer: {
      height: screenHeight * 0.15,
      // borderWidth: 1,
      // borderColor: "grey",
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      elevation: 20,
      // padding: screenWidth * 0.02,
      margin: screenHeight * 0.03,
      width: screenWidth * 0.3,
    },
    iconText: {
      fontSize:  20,
      color: "black",
      alignItems: "center",
      justifyContent: "center",
    },
    background: {
      flex: 1,
      backgroundColor: "white",
    },
    yellowHeader: {
      flexDirection: "row",
      height: screenHeight * 0.25,
    },
    headerText: {
      fontSize: 30,
      color: "white",
      fontWeight : "bold"
      // paddingRight: screenWidth * 0.1,
      // textDecorationLine: "underline",
    },
    detailsRow1: {
      flexDirection: "row",
      paddingTop: screenHeight * 0.02,
      // paddingBottom: screenHeight * 0.015,
      alignItems: "center",
    },
    detailsRow2: {
      flexDirection: "row",
      // paddingTop: screenHeight * 0.02,
      // paddingBottom: screenHeight * 0.015,
      alignItems: "center",
    },
    detailsText: {
      color: "white",
      fontSize: 15,
      paddingLeft: screenWidth * 0.02,
    },
    detailsTextValues: {
      color: "white",
      fontSize: 20,
      paddingLeft: screenWidth * 0.02,
      fontWeight: "bold"
    },
    whiteContainer: {
      position: "absolute",
      top: screenHeight * 0.23,
      bottom: 0,
      left: screenWidth * 0.04,
      right: screenWidth * 0.04,
      width: screenWidth - screenWidth * 0.08,
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: screenHeight * 0.05,
      transform: [{ translateY: -screenHeight * 0.02 }],
      zIndex: 1,
    },
    grid: {
      flexWrap: "wrap",
      justifyContent: "space-around",
      alignItems: "center",
      paddingBottom: screenHeight * 0.03,
    },
  });
  
const GridItem = ({ icon, description, onPress }) => {
  return (
    <TouchableOpacity style={styles.gridItem} onPress={onPress}>
      <Image source={icon} style={styles.gridItemImage} />
      <Text style={styles.gridItemText}>{description}</Text>
    </TouchableOpacity>
  );
};

export default TeacherScreen;