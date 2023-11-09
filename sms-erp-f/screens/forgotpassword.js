import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground,ScrollView,Image } from 'react-native';
import {KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Logo from "../assets/logo.jpg";

const ForgotPassword = ({navigation}) => {
  const [timer, setTimer] = useState(60);
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [otp, setOTP] = useState('');


  useEffect(() => {
    let interval = null;
    if (isTimerActive) {
      interval = setInterval(() => {
        setTimer(timer => timer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerActive]);

  const handleGetOTP = () => {
    // TODO: Handle get OTP
    setShowOTPInput(true);
    setIsTimerActive(true);
    setTimer(60);
  };

  const handleResendOTP = () => {
    // TODO: Handle resend OTP
    setIsTimerActive(true);
    setTimer(60);
  };

  const handleVerifyOTP = () => {
     navigation.navigate('SetNewPassword')
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
    <View style={styles.container}>
      <ImageBackground source={require('../image/main.jpg')} style={styles.backgroundImage}>
      <View style={styles.root}>
              <Image source={Logo} style={styles.logo} resizeMode="cover" />
            </View>
        
      </ImageBackground>
    
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput style={styles.input} placeholder="Email" />
      {showOTPInput && (
        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          value={otp}
          onChangeText={setOTP}
        />
      )}
      
       <TouchableOpacity style={styles.button} onPress={showOTPInput ? handleVerifyOTP : handleGetOTP}>
        <Text style={styles.buttonText}>{showOTPInput ? 'Verify OTP' : 'Get OTP'}</Text>
      </TouchableOpacity>

      {isTimerActive ? (
        <TouchableOpacity style={styles.resendOTPButtonDisabled} disabled={true}>
          <Text style={styles.resendOTPText}>Resend OTP ({timer}s)</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.resendOTPButton} onPress={handleResendOTP}>
          <Text style={styles.resendOTPText}>Resend OTP</Text>
        </TouchableOpacity>
      )}
        
       
    </View>
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 200,
    marginLeft: 150,
    marginTop: 500,
    borderColor: "black",
    borderRadius: 100,
    borderWidth: 1,
    shadowColor:'black',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom:100,
  },
  backgroundImage: {
        flex:1,
        justifyContent: "center",
        height:350,
        width: 500,
  },
  title: {
    fontSize: 24,
    color: 'black',
   // fontWeight: 'bold',
    textAlign: 'center',
    marginTop:100,
    fontFamily:'Forum'
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  root: {
    paddingBottom: 150,
  },
  button: {
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 10,
    width: '40%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  resendOTPButton: {
    marginTop: 10,
    width: '40%',
    marginLeft:55,
    

  },
  resendOTPButtonDisabled: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    width: '40%',
    alignItems: 'center',
    marginTop: 10,
  },
  resendOTPText: {
    color: 'black',
    alignItems: 'center',
    
  },
});

export default ForgotPassword;