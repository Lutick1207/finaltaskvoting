"use client";

import { FC, useState } from "react";
import { useAccount, useWalletClient } from "wagmi";

interface CreateProposalProps {
  contractAddress: string;
  abi: any[];
}

const CreateProposal: FC<CreateProposalProps> = ({ contractAddress, abi }) => {
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient(); // Получаем клиент кошелька
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateProposal = async () => {
    if (!isConnected || !walletClient) {
      console.log("Wallet not connected or walletClient is not available");
      return;
    }

    if (!description) {
      console.log("Description is empty");
      return;
    }

    try {
      setLoading(true);

      // Взаимодействуем с контрактом через walletClient
      const tx = await walletClient.writeContract({
        address: contractAddress,
        abi: abi,
        functionName: "createProposal",
        args: [description],
      });

      // Ожидаем завершения транзакции
      await walletClient.waitForTransactionReceipt(tx.hash);

      alert("Proposal created successfully!");
      setDescription("");  // Очищаем поле
    } catch (error) {
      console.error("Error creating proposal:", error);
      alert("Error creating proposal. Please check the console for more details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-sm mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Create New Proposal</h2>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Proposal description"
        className="p-2 border border-gray-300 rounded-lg mb-4 w-full"
      />
      <button
        onClick={handleCreateProposal}
        className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700"
        disabled={loading || !description}
      >
        {loading ? "Creating..." : "Create Proposal"}
      </button>
    </div>
  );
};

export default CreateProposal;
