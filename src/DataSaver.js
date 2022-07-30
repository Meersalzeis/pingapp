//const Parse = require('@parse/react-native')

const Parse = require('parse');

// import AsyncStorage from "@react-native-async-storage/async-storage/lib/typescript/AsyncStorage.native";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import AsyncStorage from "@react-native-community/async-storage";
// import AsyncStorage from "react-native";
import Realm from 'realm';
// https://docs.parseplatform.org/js/guide/

const ParseClass = Parse.Object.extend("Measurement");
const newParseObj = new ParseClass();

export function initDataSaver() {

  // javascriptKey is required only if you have it on server.
  Parse.initialize("whta", "whta"); // Parse.initialize("YOUR_APP_ID", "YOUR_JAVASCRIPT_KEY");

  Parse.setAsyncStorage(Realm);
  Parse.serverURL = 'tnb.tk.informatik.tu-darmstadt.de:1337/parse'
}

export async function saveData(time, rtt, address) {
  let parseObj = newParseObj
  parseObj.set("time", time)
  parseObj.set("rtt", rtt)
  parseObj.set("address", address)
  //obj.save alone throws errors when upload fails -> timeout
  const check = await Promise.race([
      parseObj.save(),
      timeoutConst(false)
  ])
  return check

}

function timeoutConst(alternative:any) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 500, alternative) // timeout half a second allowed
  })
}
