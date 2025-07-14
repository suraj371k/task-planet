import React, { useEffect } from "react";
import { useUserStore } from "../store/userStore";

const UserList = ({ selectedUserId, setSelectedUser }) => {
  const { users, getUsers, loading: isLoading , initSocketListeners } = useUserStore();

  useEffect(() => {
    getUsers();
    initSocketListeners()
  }, []);

  return (
    <div className="max-w-md mx-auto container mt-10 ml-10 p-8 bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        Select a User
      </h2>
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cyan-400"></div>
        </div>
      ) : (
        <>
          <div className="relative mb-6">
            <select
              className="w-full p-3 pl-4 pr-10 bg-white/10 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white appearance-none transition-all duration-200 hover:bg-white/20"
              value={selectedUserId || ''}
              onChange={(e) => {
                const user = users.find((u) => u._id === e.target.value);
                setSelectedUser(user);
              }}
            >
              <option value="" className="bg-slate-800 text-white/70">
                Choose a user
              </option>
              {users.map((user) => (
                <option
                  key={user._id}
                  value={user._id}
                  className="bg-slate-800 text-white"
                >
                  {user.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-cyan-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          {selectedUserId && (
            <div className="mt-6 p-5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-400/30 text-center animate-fade-in">
              <p className="text-lg text-cyan-100">
                Selected User:{" "}
                <span className="font-bold text-white">
                  {users.find((u) => u._id === selectedUserId)?.name}
                </span>
              </p>
              <div className="mt-3 flex justify-center">
                <span className="h-1 w-16 bg-cyan-400 rounded-full"></span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserList;