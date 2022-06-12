import Colors from "react-native/Libraries/NewAppScreen/components/Colors";

import Ping from 'react-native-ping';
import { useEffect } from 'react'; // for timer

// Outputs a single text with the most recent measurement


// don't forget about FOREGROUND_SERVICE permission and to declare Service in the manifest!
//NativeModules.Background.startHeadlessJSForegroundService();
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

const getMessage = "This is a substitute for a time/latency message"

export default class PingRecorder {

  componentDidMount() {
    this.timer = setInterval(() => {
      this.getCurrentTime();
    }, 1000);
  }

  render() {
    return (
      <Text
        style={[
          styles.text,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {getMessage}
      </Text>
    )
  }
}
