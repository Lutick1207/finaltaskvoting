"use client";

import { FC } from "react";

interface VoteProposalProps {
    proposalId: number;
    onVote: (id: number, vote: boolean) => void;
}

const VoteProposal: FC<VoteProposalProps> = ({ proposalId, onVote }) => {
    return (
        <div className="flex items-center space-x-4">
            <button
                onClick={() => onVote(proposalId, true)}
                className="px-6 py-2 text-white bg-green-500 rounded-lg hover:bg-green-700"
            >
                Vote Yes
            </button>
            <button
                onClick={() => onVote(proposalId, false)}
                className="px-6 py-2 text-white bg-red-500 rounded-lg hover:bg-red-700"
            >
                Vote No
            </button>
        </div>
    );
};

export default VoteProposal;
