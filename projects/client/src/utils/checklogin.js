import axios from "axios"
export const CheckLogin = async () => {
        try {
                let getTokenId = JSON.parse(localStorage.getItem('user'));
                console.log(getTokenId);
                if(!getTokenId) return{
                        dataUser: null,
                        tokenUser: null
                }
                let response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/auth/keep-login?`, {

                        headers: {
                                authorization: `Bearer ${getTokenId}`
                        }
                })
                console.log(response)
                return {
                        dataUser: response.data.data,
                        tokenUser: response.data.token
                }
        } catch (error){
                return {
                        dataUser: null,
                        tokenUser: null
                }
        }

}