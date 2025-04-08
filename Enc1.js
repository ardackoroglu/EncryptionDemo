import Aes from 'react-native-aes-crypto';
import { RSA } from 'react-native-rsa-native';
import { Buffer } from 'buffer';

export const enc = async (message, publicKey) => {
  try {
    // Step 1: Generate AES key and IV
    const aesKey = await Aes.randomKey(32); // 256-bit key
    const iv = await Aes.randomKey(16);     // 128-bit IV

    // Step 2: Encrypt the message using AES
    const encryptedMessage = await Aes.encrypt(message, aesKey, iv, 'aes-256-cbc');

    // Step 3: Encrypt AES key using RSA public key
    const encryptedAesKey = await RSA.encrypt(aesKey, publicKey);

    // Step 4: Combine (encryptedAesKey + iv + encryptedMessage)
    const encryptedAesKeyBytes = Buffer.from(encryptedAesKey, 'base64');
    const ivBytes = Buffer.from(iv, 'base64');
    const encryptedMessageBytes = Buffer.from(encryptedMessage, 'base64');

    const result = Buffer.concat([
      encryptedAesKeyBytes,
      ivBytes,
      encryptedMessageBytes
    ]);

    // Return final Base64 string
    return result.toString('base64');
  } catch (err) {
    console.error('Encryption error:', err);
    throw err;
  }
};
