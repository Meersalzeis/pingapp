
//const Parse = require('parse');
import AsyncStorage from '@react-native-async-storage/async-storage';
// https://docs.parseplatform.org/js/guide/

//const ParseClass = Parse.Object.extend("Measurement");
//const newParseObj = new ParseClass();

export function initDataSaver() {

  // javascriptKey is required only if you have it on server.
  // Parse.initialize("YOUR_APP_ID"); // Parse.initialize("YOUR_APP_ID", "YOUR_JAVASCRIPT_KEY");

  // Parse.setAsyncStorage(AsyncStorage);
  // Parse.serverURL = 'http://YOUR_PARSE_SERVER:1337/parse'
}

export async function saveData(time, rtt, address) {
  //let parseObj = newParseObj
  //parseObj.set("time", time)
  //parseObj.set("rtt", rtt)
  //parseObj.set("address", address)

  // obj.save alone throws errors when upload fails -> timeout
  // obj.save()

  //const check = await Promise.race([
  //  parseObj.save(),
  //  timeoutConst(false)
  //])

  //if (check == false) { // handle saving failed

  //}

}

function timeoutConst(alternative:any) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 500, alternative) // timeout half a second allowed
  })
}
