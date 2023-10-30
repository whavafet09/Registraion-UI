import Pmtr from "./core/pmtr.service";
const UserService = () => {

    const axios = Pmtr()
  
    const Register = async (payload) => {
      return await axios.post('api/User',payload)
    }

    const GetAllRegister = async () => {
      return await axios.get('api/User')
    }




    

    return {
        Register,
        GetAllRegister
    }
  
  };
  
  export default UserService;