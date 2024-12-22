import { ethers } from "hardhat";
import { expect } from "chai";
import { ProposalVoting } from "../typechain-types";

describe("ProposalVoting Contract", function () {
  let proposalVoting: ProposalVoting;
  let owner: any;
  let addr1: any;
  let addr2: any;

  beforeEach(async () => {
    const proposalVotingFactory = await ethers.getContractFactory("ProposalVoting");
    proposalVoting = await proposalVotingFactory.deploy();
    await proposalVoting.waitForDeployment();

    [owner, addr1, addr2] = await ethers.getSigners();
  });

  it("Should allow creating a proposal", async () => {
    const description = "Proposal 1";

    const tx = await proposalVoting.connect(addr1).createProposal(description);
    await expect(tx)
      .to.emit(proposalVoting, "ProposalCreated")
      .withArgs(0, description, addr1.address);

    const proposal = await proposalVoting.getProposal(0);
    expect(proposal.description).to.equal(description);
    expect(proposal.votesFor).to.equal(0);
    expect(proposal.votesAgainst).to.equal(0);
    expect(proposal.open).to.be.true;
    expect(proposal.creator).to.equal(addr1.address);
  });

  it("Should allow voting for a proposal", async () => {
    await proposalVoting.connect(addr1).createProposal("Proposal 2");

    const tx = await proposalVoting.connect(addr2).vote(0, true);
    await expect(tx)
      .to.emit(proposalVoting, "VoteCasted")
      .withArgs(0, addr2.address, true);

    const proposal = await proposalVoting.getProposal(0);
    expect(proposal.votesFor).to.equal(1);
    expect(proposal.votesAgainst).to.equal(0);
  });

  it("Should prevent double voting", async () => {
    await proposalVoting.connect(addr1).createProposal("Proposal 3");
    await proposalVoting.connect(addr2).vote(0, true);

    await expect(proposalVoting.connect(addr2).vote(0, true)).to.be.revertedWith(
      "Already voted"
    );
  });

  it("Should allow closing a proposal by the creator", async () => {
    await proposalVoting.connect(addr1).createProposal("Proposal 4");

    const tx = await proposalVoting.connect(addr1).closeProposal(0);
    await expect(tx)
      .to.emit(proposalVoting, "ProposalClosed")
      .withArgs(0, 0, 0);

    const proposal = await proposalVoting.getProposal(0);
    expect(proposal.open).to.be.false;
  });

  it("Should prevent voting on closed proposals", async () => {
    await proposalVoting.connect(addr1).createProposal("Proposal 5");
    await proposalVoting.connect(addr1).closeProposal(0);

    await expect(proposalVoting.connect(addr2).vote(0, true)).to.be.revertedWith(
      "Proposal is closed"
    );
  });

  it("Should prevent non-creators from closing proposals", async () => {
    await proposalVoting.connect(addr1).createProposal("Proposal 6");

    await expect(proposalVoting.connect(addr2).closeProposal(0)).to.be.revertedWith(
      "Only creator can close the proposal"
    );
  });
});
