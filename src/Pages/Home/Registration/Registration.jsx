import { Link, useNavigate } from "react-router-dom";
// react form hook link
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../../firebase/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import SocialLogin from "../../../Components/SocialLogin/SocialLogin";

const Registration = () => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    iconColor: "blue",
    customClass: {
      popup: "colored-toast",
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });

  
  const { userRegistration, updateUserProfile} = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    userRegistration(data.email, data.password)
      .then((result) => {
        console.log("logged user ->", result.user);
        updateUserProfile(data.name, data.photoURL)
          .then(() => {
            // created user enter in database

            const userInfo = {
              name: data.name,
              email: data.email,
            };

            axiosPublic.post("/users", userInfo).then((res) => {
              if (res.data.insertedId) {
                Toast.fire({
                  icon: "success",
                  title: "User Registration Successfully.",
                });
              }
            });
          })
          .catch((err) => {
            Toast.fire({
              icon: "error",
              title: err.message,
            });
          });
      })
      .catch((err) => {
        console.log(err.message);
      });

    navigate("/login");
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content w-full flex-col lg:flex-row">
        <div className="text-center w-1/2 lg:text-left">
          <h1 className="text-5xl font-bold">Registration now!</h1>
          <p className="py-6"></p>
        </div>
        <div className="card w-1/2 shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                {...register("name", { required: true, maxLength: 20 })}
                type="text"
                name="name"
                placeholder="Name"
                className="input input-bordered"
              />
              {errors.name?.type === "required" && (
                <p role="alert">
                  <span className="text-red-600">Name is required</span>
                </p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                {...register("photoURL", { required: true })}
                type="text"
                placeholder="Photo URL"
                className="input input-bordered"
              />
              {errors.photoURL?.type === "required" && (
                <p role="alert">
                  <span className="text-red-600">Photo URL is required</span>
                </p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
              />
              {errors.email?.type === "required" && (
                <p role="alert">
                  <span className="text-red-600">Email is required</span>
                </p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password", {
                  required: true,
                  pattern:
                    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
                  minLength: 6,
                  maxLength: 20,
                })}
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
              />
              {errors.password?.type === "required" && (
                <p role="alert">
                  <span className="text-red-600">Password is required</span>
                </p>
              )}
              {errors.password?.type === "minLength" && (
                <p role="alert">
                  <span className="text-red-600">
                    Password length have to 6
                  </span>
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p role="alert">
                  <span className="text-red-600">
                    Password should have at least have one capital letter, small
                    letter, number and special character.{" "}
                  </span>
                </p>
              )}

              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <input
                className="btn btn-outline border-0 border-b-2 border-red-600"
                type="submit"
                value="Registration"
              />
            </div>
          </form>
          <div className="text-center">
            <p>
              Already have an Account?! please{" "}
              <Link to={"/login"}>
                <span className="underline text-blue-600 font-bold">Login</span>
                here.
              </Link>
            </p>
            
          </div>
          <div className="divider"></div>
                <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  );
};

export default Registration;
