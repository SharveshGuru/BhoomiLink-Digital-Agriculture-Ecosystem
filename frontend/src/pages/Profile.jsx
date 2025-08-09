import { useEffect, useState } from "react";
import axiosInstance from "../api/Api";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import Popup from "../components/Popup";
import EditProfile from "../components/EditProfile";
import ChangePassword from "../components/ChangePassword";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [edit,setEdit]=useState(false);
    const [change,setChange]=useState(false);
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    function handleEdit(){
        setEdit(!edit);
    }

    function handleChange(){
        setChange(!change);
    }

    const handleLogout = () => {
        logout();
        navigate("/");
    };

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) return;

    axiosInstance
      .get(`/user/${username}`)
      .then((response) => setUser(response.data))
      .catch((err) => console.error("Failed to load user:", err));
  }, [edit]);

  if (!user) return <div className="text-center py-10">Loading profile...</div>;

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
          My Profile
        </h2>

        {/* User Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-600 text-sm">Name</p>
            <p className="font-semibold text-lg">{user.name}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Username</p>
            <p className="font-semibold text-lg">{user.username}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Email</p>
            <p className="font-semibold text-lg">{user.email}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Phone Number</p>
            <p className="font-semibold text-lg">{user.phonenumber}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-gray-600 text-sm">Address</p>
            <p className="font-semibold text-lg">{user.address}</p>
          </div>
        </div>

        {/* Roles */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-green-700 mb-3">
            Roles
          </h3>
          <div className="flex flex-wrap gap-2">
            {user.username==="admin" &&
                <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
                    Admin
                </span>
            }
            {user.isVehicleOwner && (
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
                Vehicle Owner
              </span>
            )}
            {user.isFarmer && (
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
                Farmer
              </span>
            )}
            {user.isWorker && (
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
                Worker
              </span>
            )}
            {user.isMerchant && (
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
                Merchant
              </span>
            )}
            {!user.isVehicleOwner &&
              !user.isFarmer &&
              !user.isWorker &&
              !user.isMerchant && 
              !user.username==="admin" &&(
                <span className="text-gray-500 text-sm">
                  No special roles assigned
                </span>
              )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button 
            onClick={handleEdit}
            className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition cursor-pointer">
                Edit Profile
          </button>
          <button 
            onClick={handleChange}
            className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition cursor-pointer">
                Change Password
          </button>
          <button
            className="w-full sm:w-auto px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
        <Popup isOpen={edit} onClose={handleEdit}>
            <EditProfile userData={user} onClose={handleEdit}></EditProfile>
        </Popup>

        <Popup isOpen={change} onClose={handleChange}>
            <ChangePassword username={localStorage.getItem("username")} onClose={handleChange}></ChangePassword>
        </Popup>
    </div>
  );
}
