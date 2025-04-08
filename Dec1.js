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

    const decryptedAesKeyHex = await RSA.decrypt(encryptedAesKey, privateKey);
    console.log('Decrypted AES key:', decryptedAesKeyHex);
    
    const decryptedAesKeyBase64 = Buffer.from(decryptedAesKeyHex, 'hex').toString('base64');
    console.log('Decrypted AES key in Base64:', decryptedAesKeyBase64);
    

    const decryptedMessageBase64 = await Aes.decrypt(
        encryptedMessage.toString('base64'),
        decryptedAesKeyBase64,
        aesIv,
        'aes-256-cbc'
    );

    console.log('Decrypted message in Base64:', decryptedMessageBase64);
    

    const decryptedPrescription = Buffer.from(decryptedMessageBase64, 'base64').toString('utf8');
    console.log('Decrypted prescription:', decryptedPrescription);

    return decryptedPrescription;
}
