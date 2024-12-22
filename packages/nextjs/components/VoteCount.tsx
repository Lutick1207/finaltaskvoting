"use client";

import { FC } from "react";

interface VoteCountProps {
    yesVotes: number;
    noVotes: number;
}

const VoteCount: FC<VoteCountProps> = ({ yesVotes, noVotes }) => {
    return (
        <div className="flex items-center space-x-4">
            <p className="text-lg text-green-600">Yes: {yesVotes}</p>
            <p className="text-lg text-red-600">No: {noVotes}</p>
        </div>
    );
};

export default VoteCount;
