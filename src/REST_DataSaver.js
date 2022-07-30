import axios from 'axios';

const master_key = "whta"
const javascript_key = "whta"
const ap_id = "whta"
const server_address = 'tnb.tk.informatik.tu-darmstadt.de:1337/parse'

export function initDataSaver() {
  axios({
    method: 'get',
    url: server_address,
  }).then((response) => {
    console.log(response.data);
  });
}

export async function saveData(time, rtt, address) {
  const configurationObject = {
    method: 'get',
    url: `${baseUrl}/api/users/1`,
  };
  const response = await axios(configurationObject);
  console.log(response.data);
}

