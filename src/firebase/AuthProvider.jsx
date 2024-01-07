import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "./firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext(null);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  // onAuthStateChange

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("current User ->", currentUser);
      // get token and store client

      if (currentUser) {
        const userInfo = { email: currentUser.email };
        axiosPublic.post("/jwt", userInfo).then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
            setLoading(false);
          }
        });
      } else {
        localStorage.removeItem("access-token");
        setLoading(false)
      }
    });
    return () => {
      return unSubscribe();
    };
  }, [axiosPublic]);

  // google log in

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  // create a user with email and password
  const userRegistration = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login user by email and password

  const userLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   user logout

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // user profile update

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const authInfo = {
    user,
    loading,
    googleLogin,
    userRegistration,
    userLogin,
    logOut,
    updateUserProfile,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
