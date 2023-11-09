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
import { LinearGradient } from "expo-linear-gradient";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

  const MarksMainScreen = ({navigation,route} ) => {
  const { students,teacher,tests_list,marks} = route.params;


  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const [showMenu, setShowMenu] = useState(false);
const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

    
  const handleIconPress = (text) => {
   
    navigation.navigate('Marks',{students,teacher,tests_list,marks ,test_name: text})
    
  };

  const renderIcon = (text,index) => {
    return (
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => handleIconPress(text)}
      >
        <MaterialIcons name="school" size={50} color="black" />
        <Text style={styles.iconText}>{text}</Text>
      </TouchableOpacity>
    );
  };
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="light-content" backgroundColor="#94b49f" />
      <View style={styles.background}>
        <LinearGradient
          colors={["#94b49f", "#94b49f"]}
          start={[0, 0]}
          end={[1, 1]}
          style={styles.yellowHeader}
        >
          <View style={{ height: 20, right: 9, left: 35 }}>
            <View>
              <Text style={[styles.headerText]}>Raghav Kumar Jha</Text>

              <View style={styles.detailsText1}>
                <Text style={styles.detailsText}>Class : 8</Text>
                <Text style={styles.detailsText}>Section : A</Text>
              </View>
             
              
            </View>
          </View>
        </LinearGradient>
        <LinearGradient
          colors={["#b8b8b8", "#b8b8b8"]}
          start={[0, 0]}
          end={[1, 1]}
          style={styles.whiteContainer}
        >
          <ScrollView contentContainerStyle={styles.grid}>
            <View style={{ height: 20 }}></View>
            <View style={styles.iconRow}>
              {renderIcon("FA-1", 0)}
              <View style={{ width: 20 }}></View>
              {renderIcon("FA-2",  1)}
            </View>
            <View style={styles.iconRow}>
              
              {renderIcon("FA-3",  2)}
                <View style={{ width: 20 }}></View>
               
                {renderIcon("FA-4", 3)}
              </View>
              <View style={styles.iconRow}>
              
              {renderIcon("SA-1",  4)}
                <View style={{ width: 20 }}></View>
               
                {renderIcon("SA-2", 5)}
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
    menuContainer: {
      position: "absolute",
      right: 0,
      backgroundColor: "white",
      borderRadius: 5,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      zIndex: 3,
    },
    menuItem: {
      paddingVertical: screenHeight * 0.01,
      paddingHorizontal: screenWidth * 0.04,
      justifyContent: "center",
      alignItems: "flex-start",
      width: screenWidth * 0.3,
    },
    menuText: {
      fontSize: screenHeight * 0.02,
      color: "#333333",
    },
    iconContainer: {
      height: screenHeight * 0.15,
      borderWidth: 1,
      borderColor: "grey",
      borderRadius: screenHeight * 0.05,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      elevation: 20,
      padding: screenWidth * 0.02,
      margin: screenHeight * 0.03,
      width: screenWidth * 0.3,
    },
    iconText: {
      fontSize: screenHeight * 0.025,
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
      fontSize: screenHeight * 0.04,
      color: "black",
      paddingRight: screenWidth * 0.1,
      textDecorationLine: "underline",
    },
    detailsText1: {
      flexDirection: "row",
      paddingTop: screenHeight * 0.02,
      paddingBottom: screenHeight * 0.015,
      alignItems: "center",
    },
    detailsText: {
      color: "white",
      fontSize: screenHeight * 0.022,
      paddingLeft: screenWidth * 0.02,
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
  

export default MarksMainScreen;