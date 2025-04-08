import Aes from 'react-native-aes-crypto';
import {RSA} from "react-native-rsa-native";
import {Buffer} from "buffer";


export const dec = async (encryptedPrescription, privateKey) => {
    const encryptedData = Buffer.from(encryptedPrescription, 'base64');

    const rsaKeySize = 256;
    const ivSize = 24;

    const encryptedAesKey = encryptedData.slice(0, rsaKeySize).toString('base64');
    const aesIv = encryptedData.slice(rsaKeySize, rsaKeySize + ivSize).toString('base64');
    const encryptedMessage = encryptedData.slice(rsaKeySize + ivSize);
    
    const decryptedAesKeyHex = await RSA.decrypt(encryptedAesKey, privateKey);
    console.log('Decrypted AES key:\n', decryptedAesKeyHex);
    console.log('aesIv on decryption:\n', aesIv);
    console.log('Encrypted message:\n', encryptedMessage.toString('base64'));  

    const decryptedMessage = await Aes.decrypt(
        encryptedMessage.toString('base64'),
        decryptedAesKeyHex,
        aesIv,
        'aes-256-cbc'
    );

    console.log('Decrypted message in Base64:', decryptedMessage);


    return decryptedMessage;
}
