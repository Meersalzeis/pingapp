
import Ping from 'react-native-ping';
import { saveData } from "./REST_DataSaver";
// https://github.com/RoJoHub/react-native-ping  as tutorial

const addresses = ["www.google.de", "www.yahoo.com"]
var message = "error in ping code - nothing set yet"

export async function makePings(setName) {
  let errorOccured = false
  for (let i = 0; i < addresses.length; i++) {
    try {
      const rtt = await Ping.start(addresses[i], { timeout: 1000 });
      if (!errorOccured) message =  "ping took " + rtt + " ms to address " + addresses[i]
      const check = await saveData(new Date(), rtt, addresses[i], setName)
      if (!check) {
        message = "connecting to " + addresses[i] + " - timeout "
        errorOccured = true
      }
    } catch (err) {
      message = "connecting to " + addresses[i] + " - " + err.message
      errorOccured = true
    }
  }

  return message
}
