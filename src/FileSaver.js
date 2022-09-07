// https://stackoverflow.com/questions/38481445/react-native-write-into-file
// https://blog.logrocket.com/how-to-access-file-systems-react-native/

var RNFS = require('react-native-fs');
// create a path you want to write to
var path = RNFS.DocumentDirectoryPath + '/test.txt';

// write the file
RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
  .then((success) => {
    console.log('FILE WRITTEN!');
  })
  .catch((err) => {
    console.log(err.message);
  });
