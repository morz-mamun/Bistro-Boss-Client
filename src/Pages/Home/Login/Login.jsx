import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import useAuth from '../../../Hooks/useAuth';
import SocialLogin from '../../../Components/SocialLogin/SocialLogin';

const Login = () => {
    const [disable, setDisable] = useState(true)
  const {userLogin} = useAuth()
   const navigate = useNavigate()
   const location = useLocation()
   const too = location.state?.from?.pathname || "/";
    
    useEffect( () => {
        loadCaptchaEnginge(6); 
    }, [])

    const handleLogin = (e) => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value
        console.log(email, password);

        userLogin(email, password)
        .then(result => {
          console.log('logged User -> ', result.user);
          navigate(too, {replace: true})
        })
        .catch(err => {
          console.log(err.message);
        })

    }

    const handleCaptcha = (e) => {
        const user_captcha_value = e.target.value
        if(validateCaptcha(user_captcha_value)){
            setDisable(false)
        }
        else{
            setDisable(true)
        }
        
    }
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content w-full flex-col lg:flex-row">
        <div className="text-center w-1/2 lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
           
          </p>
        </div>
        <div className="card w-1/2 shadow-2xl bg-base-100">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control">
              <label className="label">
              <LoadCanvasTemplate />
              </label>
              <input
                onBlur={handleCaptcha}
                type="text"
                name="captcha"
                placeholder="Write the above captcha here"
                className="input input-bordered"
                
              />
            </div>
            <div className="form-control mt-6">
              
              <input disabled={false} className="btn btn-outline border-0 border-b-2 border-red-600" type="submit" value="Login" />
            </div>
          </form>
          <div className="text-center pb-5">
            <p>New in this website?! please first complete your <Link to={'/registration'}><span className="underline text-blue-600 font-bold">Registration</span></Link> here.</p>
          </div>
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  );
};

export default Login;
