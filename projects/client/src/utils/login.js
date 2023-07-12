// import axios from "axios"

// export const LoginAccount = async (inputEmail, inputPassword, toogle) => {


//     try {
//         let response = toogle == true 

//             await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, { email: inputEmail, password: inputPassword })

//             return{
//                 response:response.data.message,
//                 id:response.data.data.token,
//                 username:response.data.data.username,
//                 role:response.data.data.role, 
//             }  
//         }
    
//     catch (error) {
//         return {
//             response: error.response.data.message
//         }
//     }
// }