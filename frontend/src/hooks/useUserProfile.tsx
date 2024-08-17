import { useEffect, useState } from "react";
import { getUserProfile, isAuthenticated } from "../services/requestApi";
import { UserDetail } from "../config/type";

const useUserProfile = () => {
  const isAuth = isAuthenticated();
  const [userProfile, setUserProfile] = useState<UserDetail | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        setUserProfile(response.user);
      } catch (error) {
        console.log(error);
      }
    };
    if (isAuth) {
      fetchUserProfile();
    }
  }, [isAuth]);

  return { userProfile };
};

export default useUserProfile;
