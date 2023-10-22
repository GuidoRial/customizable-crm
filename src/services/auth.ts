import axios from "./api"
import { ISignUpUserDTO, ILoginUserDTO } from "../interfaces/IAuth"
export default {
  signUp(user: ISignUpUserDTO) {
    return axios.post("/api/auth/sign-up", user).then((res) => res.data)
  },
  signIn(user: ILoginUserDTO) {
    return axios.post("/api/auth/sign-in", user).then((res) => res.data)
  },
}
