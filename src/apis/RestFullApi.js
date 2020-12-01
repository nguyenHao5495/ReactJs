import axios from "axios"
const api = {
   addUser: (data) => {
      console.log("data", data);
      return axios.post("https://coder-nodejs.herokuapp.com/user", data)
   },
   listUser: () => {
      console.log("data");
      return axios.get("https://coder-nodejs.herokuapp.com/listUser")
   },
   deleteUser: (id) => {
      console.log("data");
      return axios.delete("https://coder-nodejs.herokuapp.com/listUser/" + id)
   }

}

export default api