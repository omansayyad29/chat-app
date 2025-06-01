import React, { useContext, useEffect, useState } from "react";
import assets from "../assets/assets";
import { AuthContext } from "../../context/authContext";
import { ChatContext } from "../../context/ChatContext";

const RightSidebar = () => {
  const { selectedUser, messages } = useContext(ChatContext);
  const { logout, onlineUsers } = useContext(AuthContext);
  const [msgImages, setMsgImages] = useState([]);

  useEffect(() => {
    setMsgImages(messages.filter((msg) => msg.image).map((msg) => msg.image));
  }, [messages]);

  if (!selectedUser) return null;

  return (
    <div className="bg-[#818582]/10 text-white w-full md:w-[300px] h-full overflow-y-auto p-4 flex flex-col justify-between">
      <div>
        {/* User Info */}
        <div className="pt-16 flex flex-col items-center gap-2 text-xs font-light">
          <img
            src={selectedUser?.profilePic || assets.avatar_icon}
            alt="User Avatar"
            className="w-20 aspect-square rounded-full object-cover"
          />
          <h1 className="text-xl font-medium flex items-center gap-2">
            {onlineUsers.includes(selectedUser._id) && (
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
            )}
            {selectedUser.fullName}
          </h1>
          <p className="text-center px-4">{selectedUser.bio}</p>
        </div>

        <hr className="border-[#ffffff50] my-6" />

        {/* Media Section */}
        <div className="text-xs">
          <p className="font-semibold text-sm mb-2">Media</p>
          <div className="grid grid-cols-2 gap-3 max-h-[200px] overflow-y-auto pr-1">
            {msgImages.map((url, index) => (
              <div
                key={index}
                onClick={() => window.open(url)}
                className="cursor-pointer rounded overflow-hidden"
              >
                <img
                  src={url}
                  alt={`Media ${index}`}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <button
        className="mt-8 bg-gradient-to-r from-purple-400 to-violet-600 text-white text-sm font-light py-2 px-6 rounded-full self-center"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default RightSidebar;
