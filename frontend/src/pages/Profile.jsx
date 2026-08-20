import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../JS/feature/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, token, loading } = useSelector((state) => state.auth || {});

  useEffect(() => {
    if (token && !user) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, token, user]);

  const displayName = user?.name || "User";

  return (
    <div className="app-page">
      <div className="app-profile-card">
        <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60" alt="Profile" />
        <h2>Profile page</h2>
        <p>{loading ? "Loading profile..." : `Hello ${displayName}`}</p>
      </div>
    </div>
  )
}

export default Profile
