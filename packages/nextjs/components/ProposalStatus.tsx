"use client";

import { FC } from "react";

interface ProposalStatusProps {
    status: string;
}

const ProposalStatus: FC<ProposalStatusProps> = ({ status }) => {
    return (
        <div className="flex items-center space-x-2">
            <p className="text-xl font-semibold text-gray-800">Status: {status}</p>
        </div>
    );
};

export default ProposalStatus;
