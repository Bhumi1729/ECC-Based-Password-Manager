const EC = require('elliptic').ec;
const crypto = require('crypto-js');

const ec = new EC('curve25519'); // Strong ECC curve

const keyPair = ec.genKeyPair();
const publicKey = keyPair.getPublic('hex');
const privateKey = keyPair.getPrivate('hex');

const deriveEncryptionKey = () => {
    return crypto.SHA256(privateKey).toString(); 
};

// Encrypt function
const encryptPassword = (password) => {
    const aesKey = deriveEncryptionKey(); 
    return crypto.AES.encrypt(password, aesKey).toString();
};

// Decrypt function
const decryptPassword = (encryptedPassword) => {
    try {
        const aesKey = deriveEncryptionKey(); // Ensure same key for decryption
        const bytes = crypto.AES.decrypt(encryptedPassword, aesKey);
        const decrypted = bytes.toString(crypto.enc.Utf8);

        if (!decrypted) throw new Error("Decryption failed: Invalid data");

        return decrypted;
    } catch (error) {
        console.error("Error decrypting password:", error);
        return null; // Return null to prevent breaking response
    }
};

// Test encryption
const testEncryption = () => {
    const originalPassword = "mysecurepassword";
    const encrypted = encryptPassword(originalPassword);
    const decrypted = decryptPassword(encrypted);

    console.log("Original:", originalPassword);
    console.log("Encrypted:", encrypted);
    console.log("Decrypted:", decrypted);
};

testEncryption()

module.exports = { encryptPassword, decryptPassword };
