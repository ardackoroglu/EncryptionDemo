import Aes from 'react-native-aes-crypto';
import {RSA} from "react-native-rsa-native";
import {Buffer} from "buffer";


export const dec = async (encryptedPrescription, privateKey) => {
    // const privateKey = await getStoredPrivateKey();
    console.log('Private key received from store:', privateKey);

    console.log('Encrypted prescription:', encryptedPrescription);

    const encryptedData = Buffer.from(encryptedPrescription, 'base64');

    const rsaKeySize = 256;
    const ivSize = 16;

    const encryptedAesKey = encryptedData.slice(0, rsaKeySize).toString('base64');
    const aesIv = encryptedData.slice(rsaKeySize, rsaKeySize + ivSize).toString('base64');
    const encryptedMessage = encryptedData.slice(rsaKeySize + ivSize);

    console.log("encryptedAesKey:[", encryptedAesKey, "]");
    console.log("aesIv:[", aesIv, "]", "]", "]", "]");
    console.log("encryptedMessage: ", encryptedMessage);

    console.log('Encrypted AES key:', encryptedAesKey);

    try {
        const decryptedAesKeyBase64 = await RSA.decrypt(encryptedAesKey, privateKey);
        const decryptedAesKey = Buffer.from(decryptedAesKeyBase64, 'base64');

        const decryptedMessageBase64 = await Aes.decrypt(
            encryptedMessage.toString('base64'),
            decryptedAesKey.toString('base64'),
            aesIv,
            'aes-256-cbc'
        );

        const decryptedPrescription = Buffer.from(decryptedMessageBase64, 'base64').toString('utf8');
        console.log('Decrypted prescription:', decryptedPrescription);

        return decryptedPrescription;
    } catch (error) {
        console.error('Encryption failed:', error);
        return "\n\n\n\nyok olmadi";
    }
}
