import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const useLoggedInUser = (auth) => {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [user] = useAuthState(auth);

    useEffect(() => {
        const email = user?.email;
        if (email) {
            fetch(`http://localhost:5000/loggedInUser?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setLoggedInUser(data);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [user]);

    return [loggedInUser, setLoggedInUser];
}

export default useLoggedInUser;
