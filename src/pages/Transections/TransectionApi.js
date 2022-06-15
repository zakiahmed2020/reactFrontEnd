
import axios from 'axios'
const epiEndPoint = "https://protected-spire-91265.herokuapp.com/api/users";
export async function FetchTrensections() {
        try {
            return await axios.get(epiEndPoint);
            // const {data} = await  axios.get('https://protected-spire-91265.herokuapp.com/api/users')
            // return data;
           
        } catch (error) {
            console.log(error);
        }
}
// const epiEndPoint = "https://protected-spire-91265.herokuapp.com/api/devices";

// export async function getDevices() {
//     return http.get(epiEndPoint);
// };
 
// export function FetchTrensections();