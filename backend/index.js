// backend/index.js
const express = require('express');
const { ethers } = require('ethers');
const cors = require('cors');



const app = express();
app.use(express.json());
app.use(cors());

const INFURA_URL = 'https://eth-sepolia.g.alchemy.com/v2/bsLIdmjxmBt14E4jrUXgQC4EZlRPpQwy';
const PRIVATE_KEY = '8c318427dd5efa1058606a73fb05916701912a2465d03ccd8c8698c6523e3e9e';
const CONTRACT_ADDRESS = '0xc8C302E75fcF1bE584fC0EB0F898b883Dc1f4605';

const provider = new ethers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/bsLIdmjxmBt14E4jrUXgQC4EZlRPpQwy');
const wallet = new ethers.Wallet('8c318427dd5efa1058606a73fb05916701912a2465d03ccd8c8698c6523e3e9e', provider);

const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "setter",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getter",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet);

app.get('/getName', async (req, res) => {
    console.log('Received GET request for /getName');  // Log when getName is called
    try {
        const name = await contract.getter();
        console.log('Fetched name:', name);  // Log the fetched name
        res.send(name);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching name');
    }
});

app.post('/setName', async (req, res) => {
    console.log('Received POST request for /setName');  // Log when setName is called
    try {
        const { name } = req.body;
        console.log('Setting name to:', name);  // Log the name to be set
        const tx = await contract.setter(name);
        await tx.wait();
        res.send('Name set successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error setting name');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
