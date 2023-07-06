// import { userData } from '../../data/userData'
// import Loading from "../../components/loading/loading"

// export default function MyAccountInfo() {

//     let navigate = useNavigate()

//     const { user, setUser } = useContext(userData)

//     const [disable, setDisable] = useState(false)
//     const [message, setMessage] = useState('')
//     const [profile, setProfile] = useState({
//         name: '',
//         phone_number: '',
//         email: '',
//         oldpassword: '',
//         newpassword: '',
//         newconfirmpassword: '',
//         photo_profile: []
//     })
//     const [visible, setVisible] = useState({
//         password: false,
//         oldPassword: false,
//         newPassword: false,
//         newConfirmPassword: false,
//         check: false
//     })
//     const [modal, setModal] = useState(false)
//     const [inputPassword, setInputPassword] = useState()
//     const [disablePicture, setDisablePicture] = useState(false)

//     let getProfile = async () => {
//         try {
//             let { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/keep-login`, {
//                 headers: {
//                     "token": localStorage.getItem('token')
//                 }
//             })
//             setProfile({ ...profile, name: data.data.name, phone_number: data.data.phone_number, email: data.data.email, photo_profile: data.data.photo_profile })

//         } catch (error) {
//         }
//     }

//     let onImageValidation = (e) => {
//         try {
//             let files = [...e.target.files]
//             setProfile({ ...profile, photo_profile: files })

//             if (files.length === 0) {
//                 setDisablePicture(true)
//             } else {
//                 setDisablePicture(false)
//             }

//             if (files.length !== 0) {
//                 files.forEach((value) => {
//                     if (value.size > 1000000) throw { message: `${value.name} more than 1000 Kb` }
//                 })
//             }
//             setMessage('')
//         } catch (error) {
//             setMessage(error.message)
//         }
//     }

//     let updateProfilePicture = async () => {
//         try {
//             if(profile.photo_profile.length==0) throw {message:'Please select image first'}
//             let fd = new FormData()
//             fd.append('images', profile.photo_profile[0])
//             let data = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/photo_profile`, fd, {
//                 headers: {
//                     token: localStorage.getItem('token')
//                 }
//             })

//             toast.success('Update Profile Picture Success!', {
//                 style: {
//                     background: "black",
//                     color: 'white'
//                 }
//             })

//             setTimeout(() => {
//                 toast('Loading...', {
//                     duration: 2500
//                 })
//             }, 2000)

//             setTimeout(() => {
//                 window.location.reload(false)
//             }, 3000)

//             setDisablePicture(false)
//         } catch (error) {
//             toast.error(error.message)
//             setDisablePicture(false)
//         }
//     }

//     let updateDataProfile = async () => {
//         try {

//             if (isNaN(profile.phone_number)) throw { message: 'Please input a number' }

//             if (profile.phone_number.length < 8 || profile.phone_number.length > 13) throw { message: 'Please input valid phone number' }

//             setDisable(true)

//             if (profile.name && profile.phone_number && !profile.oldpassword && !profile.newpassword) {

//                 await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/users/data_profile`, { name: profile.name, phone_number: profile.phone_number }, {
//                     headers: {
//                         token: localStorage.getItem('token')
//                     }
//                 })
//             } else if (profile.name && profile.phone_number && profile.oldpassword && profile.newpassword) {

//                 if (profile.newpassword.length < 8) throw { message: 'Password at least has 8 characters' }

//                 let character = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/
//                 if (!character.test(profile.newpassword)) throw { message: 'Password must contains number' }

//                 if (profile.newpassword !== profile.newconfirmpassword) throw { message: 'Confirm password wrong' }

//                 await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/users/data_profile`, { name: profile.name, phone_number: profile.phone_number, oldpassword: profile.oldpassword, newpassword: profile.newpassword }, {
//                     headers: {
//                         token: localStorage.getItem('token')
//                     }
//                 })

//             }
//             toast.success("Update Data Profile Success")

//             setDisable(false)

//             setTimeout(() => {
//                 window.location.reload(false)
//             }, 2000)

//         } catch (error) {
//             // console.log(error)
//             if (!error.response) {
//                 toast.error(error.message)
//             } else {
//                 toast.error(error.response.data.message)
//             }
//         }
//     }

//     useEffect(() => {
//         getProfile()
//     }, [])
