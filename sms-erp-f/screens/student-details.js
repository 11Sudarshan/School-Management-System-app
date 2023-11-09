import React from 'react';
import { View, Text, StyleSheet,ScrollView } from 'react-native';


const StudentDetailsPage = ({navigation,route}) => {
        const {student} = route.params
  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerName}>{student.name}</Text>
      <Text style={styles.headerDetails}>{student.sats_no}</Text>
      <View style={styles.headerDivider} />
       <View style={{flexDirection: 'row', marginTop: 8}}>
      <Text style={styles.headerDetails}>CLASS: </Text>
      <Text style={[styles.headerDetails, {fontWeight: 'bold', marginLeft: 4}]}>8</Text>
      <Text style={[styles.headerDetails, {marginLeft: 16}]}>DOA: </Text>
      <Text style={[styles.headerDetails, {fontWeight: 'bold',marginLeft: 4}]}>26-07-2019</Text>
      <Text style={[styles.headerDetails, {marginLeft: 16}]}>Gender: </Text>
      <Text style={[styles.headerDetails, {fontWeight: 'bold',marginLeft: 4}]}>Male</Text>
    </View>
    </View>
   
      <View style={styles.containerinfo}>
      <ScrollView keyboardShouldPersistTaps="handled" style={{width:400}}>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Personal Information</Text>
        <Text style={styles.infoText}>DOB: 25-08-2009</Text>
        <Text style={styles.infoText}>Aadhar Number: 794131337541</Text>
        <Text style={styles.infoText}>Gender: Male</Text>
        <Text style={styles.infoText}>Caste: OBC/3A(VOKKALIGA)</Text>
        <Text style={styles.infoText}>Minority: N/A</Text>
        <Text style={styles.infoText}>Bhagayalakshmi Yojana: N/A</Text>
        <Text style={styles.infoText}>Height: 154</Text>
        <Text style={styles.infoText}>Weight: 43</Text>
        <Text style={styles.infoText}>Medical Advice: N/A</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Parents Information</Text>
        <Text style={styles.infoText}>Father Name: Jayendra</Text>
        <Text style={styles.infoText}>Mother Name: Pavithra</Text>
        <Text style={styles.infoText}>Phone Number: 8971107821</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Bank Information</Text>
        <Text style={styles.infoText}>Branch: Bank Of Baroda</Text>
        <Text style={styles.infoText}>Account Number: 54050100003859</Text>
        <Text style={styles.infoText}>IFSC CODE: BARB0ARDES</Text>
        <Text style={styles.infoText}>FD Number: N/A</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Other Information</Text>
        <Text style={styles.infoText}>Habbitation: N/A</Text>
        <Text style={styles.infoText}>Admission RTI: N/A</Text>
        <Text style={styles.infoText}>Medium: English</Text>
        <Text style={styles.infoText}>BPL Number: DVHR00102706</Text>
        </View>
 
        </ScrollView>
        </View>
    </View>
    

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#14213d',
    paddingHorizontal: 10,
    paddingTop: 80,
  },

  header: {
    backgroundColor: '#14213d',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  headerName: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerDivider: {
    height: 2,
    backgroundColor: '#ffffff',
    marginVertical: 10,
  },
  headerDetails: {
    color: '#ffffff',
    fontSize: 15,
    marginVertical: 5,
  },
  infoContainer: {
    backgroundColor: '#ffb703',
    padding: 30,
    borderRadius: 40,
    marginBottom: 30,
    paddingRight:10,
    elevation:15,
    width:390,
    paddingTop:20,
    marginLeft:5, 
    
  },
  infoTitle: {
    color: '#14213d',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    padding:5,
    color: '#14213d',
    fontSize: 16,
  },
  containerinfo:{
    backgroundColor:'#e5e5e5',
    width:400,
    paddingRight:30,
    height:655,
    borderRadius:20,
    paddingTop:45,
    paddingBottom:10,
    elevation:25,
    borderBottomEndRadius:40,
    borderBottomLeftRadius:40,
  
  },
});

export default StudentDetailsPage;