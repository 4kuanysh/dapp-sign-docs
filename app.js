async function createDoc(docName) {
    return contract.createDocument(docName)
}

async function addToWhiteList(docId, acc) {
    contract.addToWhiteList(docId, acc)
}

async function removeFromWhiteList(docId, acc) {
    contract.removeFromWhiteList(docId, acc)
}

async function signDoc(docId) {
    contract.signDoc(docId)
}