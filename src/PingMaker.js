
import Ping from 'react-native-ping';
// https://github.com/RoJoHub/react-native-ping

export async function makePings() {
  var message = "error in ping code"
  try {
    const ms = await Ping.start('192.168.178.66', { timeout: 1000 });
    message =  "ping took " + ms + " ms"
  } catch (err) {
    message = err.message
  }
  return message
}
