// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProposalVoting {
    struct Proposal {
        string description;
        uint256 votesFor;
        uint256 votesAgainst;
        bool open;
        address creator;
    }

    Proposal[] public proposals;

    mapping(uint256 => mapping(address => bool)) public hasVoted;

    event ProposalCreated(uint256 proposalId, string description, address creator);
    event VoteCasted(uint256 proposalId, address voter, bool support);
    event ProposalClosed(uint256 proposalId, uint256 votesFor, uint256 votesAgainst);

    function createProposal(string memory _description) external {
        proposals.push(Proposal({
            description: _description,
            votesFor: 0,
            votesAgainst: 0,
            open: true,
            creator: msg.sender
        }));

        emit ProposalCreated(proposals.length - 1, _description, msg.sender);
    }

    function vote(uint256 proposalId, bool support) external {
        require(proposalId < proposals.length, "Invalid proposal ID");
        require(proposals[proposalId].open, "Proposal is closed");
        require(!hasVoted[proposalId][msg.sender], "Already voted");

        hasVoted[proposalId][msg.sender] = true;

        if (support) {
            proposals[proposalId].votesFor++;
        } else {
            proposals[proposalId].votesAgainst++;
        }

        emit VoteCasted(proposalId, msg.sender, support);
    }

    function closeProposal(uint256 proposalId) external {
        require(proposalId < proposals.length, "Invalid proposal ID");
        require(proposals[proposalId].open, "Proposal is already closed");
        require(proposals[proposalId].creator == msg.sender, "Only creator can close the proposal");

        proposals[proposalId].open = false;

        emit ProposalClosed(proposalId, proposals[proposalId].votesFor, proposals[proposalId].votesAgainst);
    }

    function getProposal(uint256 proposalId) external view returns (
        string memory description,
        uint256 votesFor,
        uint256 votesAgainst,
        bool open,
        address creator
    ) {
        require(proposalId < proposals.length, "Invalid proposal ID");

        Proposal storage proposal = proposals[proposalId];
        return (
            proposal.description,
            proposal.votesFor,
            proposal.votesAgainst,
            proposal.open,
            proposal.creator
        );
    }
}
