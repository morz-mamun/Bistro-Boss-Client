import { FaGoogle } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const {googleLogin} = useAuth()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()

    const handleGoogleLogin = () => {
        googleLogin()
        .then(result => {
            const userInfo = {
              name: result.user.displayName,
              email: result.user.email
            }
            
        axiosPublic.post('/users', userInfo)
        .then(res => {
          console.log(res.data);
          navigate('/')
        })
        })
    }
  return (
    <div>
      <div className="flex items-center justify-center pb-5">
        <button
          onClick={handleGoogleLogin}
          className="flex items-center gap-2 btn btn-outline"
        >
          <FaGoogle></FaGoogle> Google SingIn
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
