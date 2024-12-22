"use client";

import { FC } from "react";

interface UserProfileProps {
    username: string;
    email: string;
}

const UserProfile: FC<UserProfileProps> = ({ username, email }) => {
    return (
        <div className="p-4 border border-gray-300 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800">{username}</h2>
            <p className="text-gray-500">{email}</p>
        </div>
    );
};

export default UserProfile;
