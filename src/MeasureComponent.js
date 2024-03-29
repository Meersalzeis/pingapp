import Colors from "react-native/Libraries/NewAppScreen/components/Colors";

import { Alert, Button, Text, View } from "react-native"; // for timer
import React, { Component } from "react";

import BackgroundService from 'react-native-background-actions';
import BackgroundJob from 'react-native-background-actions';

import { styles } from "./styles";
import {initDataSaver} from './DataSaver';
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
let staticMeasureComponent

const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));
let BGServ

export class MeasureComponent extends Component {

  constructor(props) {
    super(props)

    initDataSaver()
    staticMeasureComponent = this
    BGServ = new BService()
    BGServ.Start()
    console.log("MeasureComponent constructor initialized BGServ and DataSaver")

    this.state = {
      timer: 0,
      isActivated: false,
      message: "no message yet"
    }

    // current mechanism to get pings
    this.getTimer = setInterval(async () => {
      if ( this.state.isActivated ) {
        this.setState({
          timer: this.state.timer + 1,
          message: await makePings()
        })
      }
    }, 1000) // timeout in ms => 1 sec

  }

  componentWillUnmount() {
    clearInterval(this.getTimer)
    BGServ.Stop()
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
          Last ping : { this.state.timer //this.state.message
           }
        </Text>
      </View>
    )
  }
}



class BService {
  constructor() {
    this.Options = {
      taskName: 'Demo',
      taskTitle: 'Demo Running',
      taskDesc: 'Demo',
      taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
      },
      color: '#ff00ff',
      parameters: {
        delay: 5000,
      },
      actions: '["Exit"]'
    };
 }
 async VeryIntensiveTask(taskDataArguments) {
    const { delay } = taskDataArguments;
    await new Promise(async (resolve) => {
      var i = 0;
      for (let i = 0; BackgroundJob.isRunning(); i++) {
        staticMeasureComponent.setState({timer: staticMeasureComponent.state.timer+1}) //message: "Success DOOD "+i
        // })
        await sleep(delay);
      }
    });
  }

  Start() {
    BackgroundService.start(this.VeryIntensiveTask, this.Options);
    console.log("BGService started")
  }

  Stop() {
    BackgroundService.stop();
  }
}

