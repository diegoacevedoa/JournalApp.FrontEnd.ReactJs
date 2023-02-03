import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { JournalScreen } from "../components/journal/JournalScreen";
import { AuthRouter } from "./AuthRouter";
import { auth, onAuthStateChanged } from "../firebase/firebase-config";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/auth";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { startLoadingNotes } from "../store/slices/notes";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //Aunque se recarge la página, siempre se va a mantener el estado de la autenticación
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user?.uid) {
        dispatch(
          login({
            uid: user.uid,
            name: user.displayName,
          })
        );

        setIsLoggedIn(true);

        dispatch(startLoadingNotes(user.uid));
      } else {
        setIsLoggedIn(false);
      }

      setChecking(false);
    });
  }, [dispatch, setChecking, setIsLoggedIn]);

  if (checking) {
    return <div>Wait...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* rutas públicas */}
        <Route
          path="/auth/*"
          element={
            <PublicRoute isAuthenticated={isLoggedIn}>
              <AuthRouter />
            </PublicRoute>
          }
        />

        {/* rutas privadas */}
        <Route
          path="/"
          element={
            <PrivateRoute isAuthenticated={isLoggedIn}>
              <JournalScreen />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/" : "/auth/login"} />}
        />
      </Routes>
    </BrowserRouter>
  );
};
