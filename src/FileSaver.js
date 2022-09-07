// https://stackoverflow.com/questions/38481445/react-native-write-into-file
// https://blog.logrocket.com/how-to-access-file-systems-react-native/

var RNFS = require('react-native-fs');
// create a path you want to write to
var content = ""

export function writeToFile(sessionName) {
  console.log("writeToFile called")
  if (sessionName == "") sessionName = "test"

  var path = RNFS.DownloadDirectoryPath + '/' + sessionName + '.txt';
  console.log("path: " + path)
  var info = " Session " + sessionName + '\n'

  RNFS.writeFile(path, info + content, 'utf8')
    .then((success) => {
      console.log('FILE WRITTEN!');
    })
    .catch((err) => {
      console.log(err.message);
    });
}

export function addEntry(address, abs_time, rtt) {
  content = content +    address + " + " + abs_time + " + " + rtt + '\n'
}
