import './userLogin.css'
import { Link ,useNavigate} from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import { UserLoginAction } from '../../Redux/Action/UserLoginAction';
import axios from 'axios';
import { ProfileAction } from '../../Redux/Action/ProfileAction';


const UserLogin = ()=>{
  const login = useSelector(state=>state.UserLogin)
  const APIURL = useSelector(state=>state.APIURL.url)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      const response = await axios.post(`${APIURL}/login/`,login);
      if (response.data){
        const token = response.data.token
        localStorage.setItem('token',token)
        dispatch(ProfileAction(response.data))
        navigate(`/profile?id=${response.data.user.id}`)

      }else{
        alert('login Failed')
      }
    }catch(error){
      console.error(error);
    }

  }


    return(
        <>
      <div className="loginParentDiv">
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={login.email}
            onChange={(e)=>{dispatch(UserLoginAction(e.target.name,e.target.value))}}
            id="fname"
            name="email"
            defaultValue=""
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={login.password}
            onChange={(e)=>{dispatch(UserLoginAction(e.target.name,e.target.value))}}
            id="lname"
            name="password"
            defaultValue=""
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to='/signup'>Signup</Link>
      </div>

        </>
    )
}

export default UserLogin