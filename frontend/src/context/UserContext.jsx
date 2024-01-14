/* eslint-disable react/prop-types */

import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { URL } from "../url";

export const UserContext = createContext({});

export function UserContextProvider({ children }) { //{ children } is a special prop that represents the
  // child elements nested within UserContextProvider in app.jsx page in there all  pages in usercontexprovider can access user through this
  const [user, setUser] = useState(null);

  useEffect(() => {
    //The useEffect hook is used to fetch user data
    // from the server when the component mounts.
    getUser();
    //The getUser function sends a GET request to a server endpoint (/api/auth/refetch)
    // and sets the user state with the response data.
  }, []);

  const getUser = async () => {
    try {
      const res = await axios.get(URL + "/api/auth/refetch", {
        withCredentials: true,
      });
      // console.log(res.data)
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  // //The UserContext.Provider component wraps its children, providing them access to the user
  //state and setUser function through the context.
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
