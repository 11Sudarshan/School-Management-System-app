//importing 
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import {
  MaterialIcons,
} from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;


const StudentList = ({navigation,route}) => {
    const {students} = route.params;
    const handleViewPress = (student) => {
        console.log(student)
        navigation.navigate('StudentDetails',{student})
        
        // Handle library option press
      }
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
       <StatusBar barStyle="light-content" backgroundColor="#94b49f" />
    <View style={styles.background}>
      <LinearGradient
        colors={["#94b49f", "#94b49f"]}
        start={[0,0]}
        end={[1,1]}
        style={styles.yellowHeader}
      >
        <View>
        <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <MaterialIcons name="account-circle" size={30} color="black" />
        <Text style={styles.title}>Student List</Text>
      </View>
    </View>
          <Text style={styles.headerText}>Gireesh babu C N</Text>
          
          
            <View style={styles.detailsText1}>
              <Text style={styles.detailsText}>Class : 8</Text>
              <Text style={styles.detailsText}>Section : A</Text>
              <Text style={styles.detailsText}>Phno : 9945618018</Text>
            </View>
          </View>
      </LinearGradient>
      <View style={styles.whiteContainer}>
        <ScrollView showsVerticalScrollIndicator={false} >
        <View>
  {students.map((student, index) => (
    <View key={index} style={styles.box}>
      <Text style={styles.boxText}>{student.name}</Text>
      <View style={styles.icon}>
        <TouchableOpacity>
          <MaterialIcons
            name="call"
            size={24}
            color="black"
            onPress={() => console.log(`Call ${student.name}`)}
          />
        </TouchableOpacity>
        <Text> | </Text>
        <TouchableOpacity>
          <MaterialIcons
            name="visibility"
            size={24}
            color="black"
            onPress={() => handleViewPress(student)}
          />
        </TouchableOpacity>
      </View>
    </View>
  ))}
</View>


        </ScrollView>

      </View>
      
    </View>
    </SafeAreaView>
 
  );
};


//design
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "black",
  },
  detailsText: {
   paddingTop: 5,
    color: "white",
    marginRight:40,
    left:20
  },
  yellowHeader: {
    flexDirection:'row',
    height: screenHeight / 3.5,
 
  },
  headerText: {
    fontSize: 24,
    color: "white",
    fontFamily:'Rajdhani2',
    textDecorationLine:'underline ',
    left:20,
    marginTop:20,
  },
  whiteContainer: {
    position: "absolute",
    top: screenHeight / 3.7,
    width: screenWidth-24 ,
    height: screenHeight / 1.3,
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
    
  },
  box: {
    flexDirection: "row",

    //   alignItems: 'center',
    justifyContent: "space-between",
    backgroundColor: "#E0E0E0",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    width: screenWidth - 60,
    borderColor:'black',
    borderWidth:2,
    elevation:10,
    marginBottom:15,

    
  },
  boxText: {
    //fontWeight: "bold",
    fontSize: 18,
    color: "#333",
    fontFamily:'Rajdhani',
  },
  icon: {
    flexDirection: "row",

  },
  headerbox:{
    flexDirection: "row",
    justifyContent:'space-around',
  },
  detailsText1:{
    flexDirection: "row",
  },
  container: {
    backgroundColor: '#94b49f',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontFamily:'Rajdhani',
    marginLeft: 5,
  },
});

export default StudentList;