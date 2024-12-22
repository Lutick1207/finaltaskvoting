"use client";

import { useEffect, useState } from "react";
import { NextPage } from "next";
import { useAccount } from "wagmi";
import CreateProposal from "../components/CreateProposal";
import ProposalList from "../components/ProposalList";
import ProposalResults from "../components/ProposalResults";
import VoteCount from "../components/VoteCount";
import VoteProposal from "../components/VoteProposal";
import UserProfile from "../components/UserProfile";
import ProposalStatus from "../components/ProposalStatus";

const Page: NextPage = () => {
  const { address, isConnected } = useAccount();
  const [loading, setLoading] = useState<boolean>(false);
  const [proposals, setProposals] = useState<any[]>([]);

  // Заглушка для предложений
  useEffect(() => {
    if (isConnected) {
      const fetchedProposals = [
        { id: 1, description: "Proposal 1", voteCount: 10 },
        { id: 2, description: "Proposal 2", voteCount: 5 },
        { id: 3, description: "Proposal 3", voteCount: 8 },
      ];
      setProposals(fetchedProposals);
    }
  }, [isConnected]);

  // Обработка голосования
  const handleVote = (proposalId: number, vote: boolean) => {
    console.log(`Voted ${vote ? "Yes" : "No"} for proposal ${proposalId}`);
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-blue-500 p-8 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-center text-black mb-4">
          Please connect your wallet
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <h1 className="text-3xl font-bold text-center text-black mb-8">Proposal Voting</h1>

      <CreateProposal contractAddress="0x5FbDB2315678afecb367f032d93F642f64180aa3" abi={[[
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "proposalId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "votesFor",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "votesAgainst",
          "type": "uint256"
        }
      ],
      "name": "ProposalClosed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "proposalId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "creator",
          "type": "address"
        }
      ],
      "name": "ProposalCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "proposalId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "voter",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "support",
          "type": "bool"
        }
      ],
      "name": "VoteCasted",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "proposalId",
          "type": "uint256"
        }
      ],
      "name": "closeProposal",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_description",
          "type": "string"
        }
      ],
      "name": "createProposal",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "proposalId",
          "type": "uint256"
        }
      ],
      "name": "getProposal",
      "outputs": [
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "votesFor",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "votesAgainst",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "open",
          "type": "bool"
        },
        {
          "internalType": "address",
          "name": "creator",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "hasVoted",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "proposals",
      "outputs": [
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "votesFor",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "votesAgainst",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "open",
          "type": "bool"
        },
        {
          "internalType": "address",
          "name": "creator",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "proposalId",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "support",
          "type": "bool"
        }
      ],
      "name": "vote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],]} />

      {/* Список предложений */}
      {proposals.map((proposal) => (
        <div key={proposal.id} className="mb-4 p-4 border border-gray-300 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800">{proposal.description}</h2>
          <VoteCount yesVotes={proposal.voteCount} noVotes={0} />
          <VoteProposal proposalId={proposal.id} onVote={handleVote} />
          <ProposalStatus status="Open" />
        </div>
      ))}

      {/* Результаты голосования */}
      <ProposalResults proposalId={0} yesVotes={0} noVotes={0} totalVotes={0} />

      {/* Пример загрузки */}
      {loading && (
        <div className="fixed inset-0 bg-blue-100 bg-opacity-50 flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      )}
    </div>
  );
};

export default Page;
