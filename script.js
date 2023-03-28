const contractAdress = "0x574C80292465cbA138Bb7DacB597861C5e387fF2"
const abi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "docId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_adr",
				"type": "address"
			}
		],
		"name": "addToWhiteList",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "proposel",
				"type": "string"
			}
		],
		"name": "createDocument",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "DocSigned",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "docId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_adr",
				"type": "address"
			}
		],
		"name": "removeFromWhiteList",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "docId",
				"type": "uint256"
			}
		],
		"name": "signDoc",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "docId",
				"type": "uint256"
			}
		],
		"name": "getDocumentProposel",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getDocuments",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
const provider = new ethers.providers.Web3Provider(window.ethereum, 97);

let signer;
let contract;

const doc_name_in = document.getElementById('doc-name-input');
const doc_create_btn = document.getElementById('create-doc');
const result = document.getElementById('result');

const doc_id_edit_in = document.getElementById('doc-id-input-edit');
const acc_adr_in = document.getElementById('acc-adr-input');
const add_acc_btn = document.getElementById('add-white-list');
const remove_acc_btn = document.getElementById('remove-white-list');

const doc_id_sign_in = document.getElementById('doc-id-input-sign');
const sign_btn = document.getElementById('sign-doc');

doc_create_btn.onclick = async function () {
    result.innerHTML = "Создаем документ"
    await createDoc(doc_name_in.value)
    result.innerHTML = "Документ создан"
}

add_acc_btn.onclick = () => {
    result.innerHTML = "Добавляем аккаунт в белый список"
    addToWhiteList(doc_id_edit_in.value, acc_adr_in.value);
    result.innerHTML = "Добавлили аккаунт"
}

remove_acc_btn.onclick = () => {
    result.innerHTML = "Удаляем аккаунт из белого списока"
    removeFromWhiteList(doc_id_edit_in.value, acc_adr_in.value);
    result.innerHTML = "Удалили аккаунт"
}

sign_btn.onclick = () => {
    result.innerHTML = "Подписывем документ"
    signDoc(doc_id_sign_in.value);
    result.innerHTML = "Подписали!"
}

login.onclick = () => {
    init()
}

async function init() {
    await provider.send("eth_requestAccounts", []);
    const accounts = await provider.listAccounts();
    signer = provider.getSigner(accounts[0]);
    contract = new ethers.Contract(contractAdress, abi, signer);
    console.log(contract);
}