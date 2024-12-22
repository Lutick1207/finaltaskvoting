import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployProposalVoting: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployer } = await hre.getNamedAccounts();
    const { deploy } = hre.deployments;

    console.log("Deploying ProposalVoting contract...");

    const deployment = await deploy("ProposalVoting", {
        from: deployer,
        args: [], // No constructor arguments needed
        log: true,
        autoMine: true, // For local network
    });

    console.log(`ProposalVoting contract deployed at: ${deployment.address}`);
};

export default deployProposalVoting;
deployProposalVoting.tags = ["ProposalVoting"];
