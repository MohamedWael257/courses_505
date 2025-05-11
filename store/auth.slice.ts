import { createSlice } from "@reduxjs/toolkit";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { useSelector } from "react-redux";

// Define an interface for the authentication state
interface AuthState {
  session: {
    id: string | null;
    full_name: string | null;
    image: string | null;
    email: string | null;
    nationality: any;
    country: any;
    phone_code: string | null;
    phone: string | null;
    gender: string | null;
    birthday: string | null;
    phone_complete_form: string | null;
    unread_notifications: number | null;
    is_ban: boolean | null;
    is_verify: boolean | null;
    is_admin_active_user: boolean | null;
    wallet_balance: number | null;
    points: number | null;
    token: string | null;
    used_point: string | null;
  } | null;
}

const loadInitialState = (): AuthState => {
  // Load the initial state from cookies
  const cookies = parseCookies();
  const session = cookies.sessionToken
    ? JSON?.parse(cookies.sessionToken)
    : null;
  return {
    session,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: loadInitialState(),
  reducers: {
    saveCredentials: (state, action) => {
      const session = action.payload;
      state.session = session;
      setCookie(null, "sessionToken", JSON.stringify(session), {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      setCookie(null, "token", session.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      // sessionStorage.setItem("Country-Id", JSON.stringify(session?.country));
      // setCookie(null, "Country-Id", JSON.stringify(session?.country), {
      //   maxAge: 30 * 24 * 60 * 60,
      //   path: "/",
      // });
    },
    deleteCredentials: (state) => {
      state.session = null;
      destroyCookie(null, "sessionToken", { path: "/" }); // Destroy cookie 'session'
      destroyCookie(null, "token", { path: "/" }); // Destroy cookie 'token'
      // const stringSpace =
      //   "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      // const stringLength = stringSpace.length;
      // let randomString = "";

      // for (let i = 0; i < 128; i++) {
      //   randomString += stringSpace[Math.floor(Math.random() * stringLength)];
      // }
      // setCookie(null, "guest", randomString, {
      //   maxAge: 30 * 24 * 60 * 60,
      //   path: "/",
      // });
    },
    updateUser: (state, action) => {
      if (state.session) {
        const session = {
          ...state.session,
          ...action.payload, // Update the session directly, without user
        };
        state.session = session;
        setCookie(null, "sessionToken", JSON.stringify(session), {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        }); // Update cookie 'session'
      }
    },
  },
});

export const { saveCredentials, deleteCredentials, updateUser } =
  authSlice.actions;
export default authSlice.reducer;

// Export the AuthState interface for use in other parts of your application
export interface RootState {
  auth: AuthState;
}

const selectSession = (state: RootState) => state.auth?.session;

export const useSession = () => {
  const session = useSelector(selectSession);

  if (session?.is_verify) {
    return session;
  }
};
