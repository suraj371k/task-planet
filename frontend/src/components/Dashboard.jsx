import React, { useState } from "react";
import UserList from "./UserList";
import AddUserModal from "./AddUser";
import { Award, Plus } from "lucide-react";
import ClaimButton from "./ClaimButton";
import { useClaimStore } from '../store/claimStore';
import Leaderboard from "./Leaderboard";
import PointHistory from "./History";

const Dashboard = () => {
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const setSelectedUser = useClaimStore((state) => state.setSelectedUser);

  // Handler to set both selectedUserId and claimStore's selectedUser
  const handleSelectUser = (user) => {
    setSelectedUserId(user ? user._id : "");
    setSelectedUser(user);
  };

  return ( 
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">

      <div className="flex gap-3 items-center justify-center pt-20">
        <Award className="text-green-500" size={40}/>
        <h1 className="text-4xl font-bold text-white">Leaderboard Management System</h1>
      </div>
      <div className="container mt-10 gap-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mx-auto">

        <div className="">
          <UserList selectedUserId={selectedUserId} setSelectedUser={handleSelectUser} />
      


        <div className="max-w-md mx-auto mt-10 ml-10 p-8 bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
          <div className="flex gap-3">
            <Plus size={30} className="text-green-500" />
            <h1 className="text-2xl text-white font-bold opacity-90">
              Add New User
            </h1>
          </div>
          <button
            onClick={() => setShowAddUserModal(true)}
            className="mt-8 w-full px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:scale-105 cursor-pointer duration-300 transition"
          >
            Add User
          </button>
        </div>

     
          <ClaimButton />
        </div>

        <div>
          <Leaderboard />
        </div>
        <div>
          <PointHistory />
        </div>
        {showAddUserModal && (
          <AddUserModal onClose={() => setShowAddUserModal(false)} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
