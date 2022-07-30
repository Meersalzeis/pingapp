//import axios from 'axios';

const master_key = "whta"
const javascript_key = "whta"
const ap_id = "whta"
const server_address = 'tnb.tk.informatik.tu-darmstadt.de:1337/parse'
const axios = require('axios')

const config = {
  method: 'post',
  url: server_address,
  headers: { 'javascript-key': javascript_key }
}

export function initDataSaver() {

}

export async function saveData(time, rtt, address) {
  const json_data = {
    time: time,
    rtt: rtt,
    address: address
  }
  return await axios.post(server_address, json_data )
}

