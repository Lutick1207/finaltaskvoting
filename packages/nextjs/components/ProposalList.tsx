"use client";

import { useEffect, useState } from "react";
import { useContractRead, useAccount } from "wagmi";

interface Proposal {
  id: number;
  description: string;
  voteCount: number;
}

const ProposalList = () => {
  const { address, isConnected } = useAccount();
  const [proposals, setProposals] = useState<Proposal[]>([]);

  // Подключаем контракт через wagmi для чтения данных
  const { data, isLoading, isError } = useContractRead({
    address: "0x5FbDB2315678afecb367f032d93F642f64180aa3", // Замените на адрес вашего контракта
    abi: [
      // ABI контракта (вставьте ваш ABI)
      {
        "inputs": [],
        "name": "getProposals",
        "outputs": [
          {
            "components": [
              { "name": "id", "type": "uint256" },
              { "name": "description", "type": "string" },
              { "name": "voteCount", "type": "uint256" },
            ],
            "name": "",
            "type": "tuple[]",
          },
        ],
        "stateMutability": "view",
        "type": "function",
      },
    ],
    functionName: "getProposals", // Название функции контракта
    enabled: isConnected, // Вызываем только если кошелек подключен
  });

  useEffect(() => {
    if (data) {
      // Преобразуем данные в формат Proposal[] и сохраняем их в состоянии
      const fetchedProposals: Proposal[] = data.map((proposal: any) => ({
        id: proposal.id.toString(),
        description: proposal.description,
        voteCount: proposal.voteCount.toNumber(), // Если используется BigNumber
      }));

      setProposals(fetchedProposals);
    }
  }, [data]);

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-center text-black mb-4">
          Пожалуйста, подключите кошелек
        </h1>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {isLoading ? (
        <div>Загрузка...</div>
      ) : isError ? (
        <div>Ошибка при получении данных</div>
      ) : (
        proposals.map((proposal) => (
          <div
            key={proposal.id}
            className="p-4 border border-gray-300 rounded-lg shadow-sm"
          >
            <h3 className="text-xl font-semibold text-black">{proposal.description}</h3>
            <p className="text-md text-black">Votes: {proposal.voteCount}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ProposalList;
