import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import CallDetectorManager from 'react-native-call-detection';

export default function App() {
  useEffect(() => {
    const callDetector = new CallDetectorManager(
      (event, phoneNumber) => {
        if (event === 'Incoming') {
          // Show a popup with the phone number
          Alert.alert('Incoming Call', `Phone number: ${phoneNumber}\nMessage: Hello!`);
        } else if (event === 'Disconnected') {
          console.log('Call Disconnected');
        }
      },
      false, // Don't request the phone number (set true to get the phone number on Android)
      () => {
        console.log('Permission denied to access phone state');
      },
      {
        title: 'Phone State Permission',
        message: 'This app needs access to your phone state in order to react to incoming calls.',
      }
    );

    // Cleanup when component is unmounted
    return () => {
      callDetector && callDetector.dispose();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>Call Detection Example</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
