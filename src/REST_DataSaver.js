//import axios from 'axios';

const javascript_key = "whta"
const app_id = "whta"
const server_address = '130.83.163.94:3060/parse' // 'tnb.tk.informatik.tu-darmstadt.de:1337/parse'
const axios = require('axios')

const config = {
  method: 'post',
  url: server_address,
  headers: { 'javascript-key': javascript_key }
}

export function initDataSaver() {

}

export async function saveData(time, rtt, address, setName) {
  console.log("saveData called")
  const json_data = ({
      time: time,
      rtt: rtt,
      address: address,
      setName: setName
    }, {
      "X-Parse-Application-Id": app_id,
      // "X-Parse-REST-API-Key": javascript_key,
      "X-Parse-Javascript-Key": javascript_key,
      "Content-Type": "application/json"
    })
  console.log("axios.post in saveData")
  const return_val = await axios.post(server_address + "/classes/Measurement", json_data )
  console.log("saveData almost finished")
  return return_val
}

