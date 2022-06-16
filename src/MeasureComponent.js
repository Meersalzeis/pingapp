import Colors from "react-native/Libraries/NewAppScreen/components/Colors";

import { Alert, Button, Text, View } from "react-native"; // for timer
import React, { Component } from "react";
import { styles } from "./styles";
import {initDataSaver, saveData} from './DataSaver';
import {makePings} from "./PingMaker";

// Outputs a single text with the most recent measurement

// don't forget about FOREGROUND_SERVICE permission and to declare Service in the manifest!
// NativeModules.Background.startHeadlessJSForegroundService();
// upon starting HeadlessJs, function which you've registered with Service will be executed, see
// https://reactnative.dev/docs/headless-js-android#the-js-api

// when you want to stop:
//NativeModules.Background.stopHeadlessJSForegroundService();


// TODO get text
// TODO get time
// TODO timer
// TODO ping
// TODO get RTT
// TODO change text

const isDarkMode = true;

export class Measurecomponent extends Component {

  constructor(props) {
    super(props)

    initDataSaver()

    this.state = {
      timer: 0,
      isActivated: false
    }

    this.getTimer = setInterval(() => {
      if ( this.state.isActivated ) {
        this.setState({
          timer: this.state.timer + 1
        })

      }
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.getTimer)
  }

  startStop = () => {
    this.setState( {
      isActivated: ! this.state.isActivated // switch on/off
    })
    if (this.state.isActivated) {
      Alert.alert("Stopped")
    } else {
      Alert.alert("Started")
    }
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>

        <Button
          title="Start / Stop"
          onPress={
            this.startStop
          }
        />

        <Text style={[  styles.sectionTitle, { color: isDarkMode ? Colors.white : Colors.black, },]}>
          The timer is at {this.state.timer}
        </Text>
      </View>
    )
  }
}