import {
  auth,
  createUserWithEmailAndPassword,
  googleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "../../../firebase/firebase-config";
import { finishLoading, startLoading } from "../ui";
import { login, logout } from "./authSlice";
import Swal from "sweetalert2";
import { logoutCleaningNote } from "../notes";

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());

    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          login({
            uid: user.uid,
            name: user.displayName,
          })
        );

        dispatch(finishLoading());
      })
      .catch((e) => {
        console.log(e);

        dispatch(finishLoading());

        Swal.fire("Error", e.message, "error");
      });
  };
};

export const startRegisterWithEmailPassword = (email, password, name) => {
  return (dispatch) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        await updateProfile(auth.currentUser, { displayName: name });
        dispatch(
          login({
            uid: user.uid,
            name: user.displayName,
          })
        );
      })
      .catch((e) => {
        console.log(e);

        Swal.fire("Error", e.message, "error");
      });
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    signInWithPopup(auth, googleAuthProvider).then(({ user }) => {
      dispatch(
        login({
          uid: user.uid,
          name: user.displayName,
        })
      );
    });
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await signOut(auth);
    dispatch(logout());

    //Limpiamos las notas
    dispatch(logoutCleaningNote());
  };
};
