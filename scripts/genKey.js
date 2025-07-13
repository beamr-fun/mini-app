import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';

// Generate a random private key
const privateKey = generatePrivateKey();

// Create an account from the private key
const account = privateKeyToAccount(privateKey);

// Extract the public key and address
const address = account.address;

// Log the results
console.log('Private Key:', privateKey);
console.log('Address:', address);
