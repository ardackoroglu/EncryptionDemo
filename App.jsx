import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { RSA } from 'react-native-rsa-native';

const App = () => {
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');

  const [messageToEncrypt, setMessageToEncrypt] = useState('');
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState('');

  const generateKeys = async () => {
    try {
      console.log('Generating RSA keys...');
      const { public: pubKey, private: privKey } = await RSA.generateKeys(2048);
      console.log('Public Key:', pubKey);
      console.log('Private Key:', privKey);
      setPublicKey(pubKey);
      setPrivateKey(privKey);
      setEncryptedMessage('');
      setDecryptedMessage('');
    } catch (error) {
      console.error('Error generating keys:', error);
    }
  };

  const encryptMessage = async () => {
    if (!publicKey || !messageToEncrypt) {
      console.log('Public key or message is missing');
      return;
    }
    try {
      console.log('Encrypting message:', messageToEncrypt);
      const encrypted = await RSA.encrypt(messageToEncrypt, publicKey);
      console.log('Encrypted Message:', encrypted);
      setEncryptedMessage(encrypted);
    } catch (error) {
      console.error('Encryption failed:', error);
    }
  };

  const decryptMessage = async () => {
    if (!privateKey || !encryptedMessage) {
      console.log('Private key or encrypted message is missing');
      return;
    }
    try {
      console.log('Decrypting message...');
      const decrypted = await RSA.decrypt(encryptedMessage, privateKey);
      console.log('Decrypted Message:', decrypted);
      setDecryptedMessage(decrypted);
    } catch (error) {
      console.error('Decryption failed:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.keyContainer}>
        <Text numberOfLines={3} style={styles.publicKeyText}>
          Public Key: {publicKey || 'N/A'}
        </Text>
        <Text numberOfLines={3} style={styles.privateKeyText}>
          Private Key: {privateKey || 'N/A'}
        </Text>
      </View>

      <Button title="Generate RSA Keys" onPress={generateKeys} color={'green'} />

      <View style={styles.encryptTextContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter message to encrypt"
          value={messageToEncrypt}
          onChangeText={setMessageToEncrypt}
        />
        <Button title="Encrypt" onPress={encryptMessage} color={'blue'} />
        <Text style={styles.outputLabel}>Encrypted Message:</Text>
        <Text numberOfLines={4} style={styles.outputText}>{encryptedMessage}</Text>
      </View>

      <View style={styles.decryptTextContainer}>
        <Button title="Decrypt" onPress={decryptMessage} color={'darkred'} />
        <Text style={styles.outputLabel}>Decrypted Message:</Text>
        <Text style={styles.outputText}>{decryptedMessage}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#000',
  },
  publicKeyText: {
    fontSize: 10,
    marginBottom: 10,
    color: 'lime',
    width: '50%',
    alignSelf: 'center',
  },
  privateKeyText: {
    fontSize: 10,
    marginBottom: 10,
    color: 'red',
    width: '50%',
    alignSelf: 'center',
  },
  encryptTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'lightblue',
    padding: 10,
  },
  decryptTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'salmon',
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
    width: '100%',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  outputLabel: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  outputText: {
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
});

export default App;
