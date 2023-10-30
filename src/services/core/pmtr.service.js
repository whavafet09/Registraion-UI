import {useState,useEffect} from "react";
import axios from "axios";
const Pmtr = () =>{
  const [token] = useState(localStorage.getItem("token"))
  const [instance] = useState(() => axios.create({
         baseURL: 'http://registrationbackend-prod.ap-southeast-1.elasticbeanstalk.com/',
  }))

 // baseURL: ' http://registrationbackend-prod.ap-southeast-1.elasticbeanstalk.com/'


  useEffect(()=>{
    if(token){
      instance.defaults.headers.common["Authorization"] = "Bearer "+token
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[token])

  return instance

}

export default Pmtr