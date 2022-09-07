import Colors from "react-native/Libraries/NewAppScreen/components/Colors";

import { Alert, Button, Text, View } from "react-native"; // for timer
import React, { Component } from "react";

import BackgroundService from 'react-native-background-actions';
import BackgroundJob from 'react-native-background-actions';

import {styles} from "./styles";
import {makePings} from "./PingMaker";
import { writeToFile } from "./FileSaver";

// Outputs a single text with the most recent measurement

// don't forget about FOREGROUND_SERVICE permission and to declare Service in the manifest!
// NativeModules.Background.startHeadlessJSForegroundService();
// upon starting HeadlessJs, function which you've registered with Service will be executed, see
// https://reactnative.dev/docs/headless-js-android#the-js-api

// when you want to stop:
// NativeModules.Background.stopHeadlessJSForegroundService();

const isDarkMode = true;
let staticMeasureComponent

const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));
let BGServ

export function newSetName(newName) {
  writeToFile(newName);
  staticMeasureComponent.setState({
    setName: newName
  })
}

export class MeasureComponent extends Component {

  constructor(props) {
    super(props)

    staticMeasureComponent = this
    BGServ = new BService()
    BGServ.Start()
    console.log("MeasureComponent constructor initialized BGServ and DataSaver")

    this.state = {
      timer: 0,
      isActivated: false,
      interval: 5000,
      message: "no message yet",
      setName: "set"
    }
  }

  componentWillUnmount() {
    //clearInterval(this.getTimer)
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
          Last ping : { this.state.timer + " - " + this.state.message
           }
        </Text>
      </View>
    )
  }
}

// ping mechanism

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
        if (staticMeasureComponent.state.isActivated) {
          staticMeasureComponent.setState({
            timer: staticMeasureComponent.state.timer + 1,
            message: await makePings( staticMeasureComponent.state.setName )
          })
        }

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

