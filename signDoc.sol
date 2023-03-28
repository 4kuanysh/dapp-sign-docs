// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DocSign {
    uint256 docsCount;

    struct Document {
        string proposel;
        address owner;
        bool exist;
    }

    event DocSigned(uint256, string);

    mapping(uint256 => Document) docs;
    mapping(uint256 => mapping(address => bool)) whiteList;
    mapping(uint256 => mapping(address => bool)) signs;

    function createDocument(string memory proposel) public returns (uint256) {
        docs[++docsCount] = Document({
            proposel: proposel,
            owner: msg.sender,
            exist: true
        });
        return docsCount;
    }

    function signDoc(uint256 docId) public {
        require(docs[docId].exist, "Document does not exist");
        require(whiteList[docId][msg.sender], "You are not in white list");
        signs[docId][msg.sender] = true;
        emit DocSigned(docId, string.concat("document signed successfully"));
    }

    function addToWhiteList(uint256 docId, address _adr) public {
        require(docs[docId].exist, "Document does not exist");
        require(docs[docId].owner == msg.sender, "You are not owner");
        whiteList[docId][_adr] = true;
    }

    function removeFromWhiteList(uint256 docId, address _adr) public {
        require(docs[docId].exist, "Document does not exist");
        require(docs[docId].owner == msg.sender, "You are not owner");
        whiteList[docId][_adr] = false;
    }

    function getDocumentProposel(
        uint256 docId
    ) public view returns (string memory) {
        return docs[docId].proposel;
    }

    function getDocuments() public view returns (string[] memory) {
        string[] memory proposels = new string[](docsCount);

        for (uint256 docId = 1; docId <= docsCount; docId++) {
            proposels[docId - 1] = docs[docId].proposel;
        }
        return proposels;
    }
}
