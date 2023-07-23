import axios from "axios"
import { apiRequest } from "../helper/api";
export const CheckLogin = async () => {
        try {
                let getTokenId = JSON.parse(localStorage.getItem('user'));

                if (!getTokenId) return {
                        dataUser: null,
                        tokenUser: null
                }
                let response = await apiRequest.get(`/auth/keep-login?`, {

                        headers: {
                                authorization: `Bearer ${getTokenId}`
                        }
                })

                return {
                        dataUser: response.data.data,
                        tokenUser: response.data.token
                }
        } catch (error) {
                return {
                        dataUser: null,
                        tokenUser: null
                }
        }

}