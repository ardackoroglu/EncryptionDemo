import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { RSA } from 'react-native-rsa-native';
import { dec } from './Dec1'
import { enc } from './Enc1';

const App = () => {
  const [publicKey, setPublicKey] = useState(
            `-----BEGIN RSA PUBLIC KEY-----
    MIIBCgKCAQEAtC3WnafyJ8fAUJG48E/n2FUEbUJ7GJ1/8xD40qKTSgzIv+SOOyeh
    IGjgAIpv5+lsWRIbUl4eWYnfY7aNyda5AIfhr8lEj5CIvpgMIMF9BhvgMN2ugzdE
    1R4puUuYUdF6FtdHrgyCMfK2R2hKmjZx7IwyMqUQNpqcX7BHE5yHhvXx+/Yk0u1S
    +R4aTf2V/UjwBoJmZZmpkZWMvXh2Y4MesZBC9Du66OVV4MLRpXoG4HCS6rW/HMji
    9npKVfrE/U+WATX9lqp0q6KJ9rhVAHs6r7zhh8WvtbZZIXD9v4iPExrft7eqR5/K
    8GW4EJttiFl3ZBoGpEHX5aiHOIvJTdtO2QIDAQAB
    -----END RSA PUBLIC KEY-----`);
    
        const [privateKey, setPrivateKey] = useState(
            `-----BEGIN RSA PRIVATE KEY-----
    MIIEowIBAAKCAQEAtC3WnafyJ8fAUJG48E/n2FUEbUJ7GJ1/8xD40qKTSgzIv+SO
    OyehIGjgAIpv5+lsWRIbUl4eWYnfY7aNyda5AIfhr8lEj5CIvpgMIMF9BhvgMN2u
    gzdE1R4puUuYUdF6FtdHrgyCMfK2R2hKmjZx7IwyMqUQNpqcX7BHE5yHhvXx+/Yk
    0u1S+R4aTf2V/UjwBoJmZZmpkZWMvXh2Y4MesZBC9Du66OVV4MLRpXoG4HCS6rW/
    HMji9npKVfrE/U+WATX9lqp0q6KJ9rhVAHs6r7zhh8WvtbZZIXD9v4iPExrft7eq
    R5/K8GW4EJttiFl3ZBoGpEHX5aiHOIvJTdtO2QIDAQABAoIBAA5XiDnqJoS7Wg/n
    u4t4Zs1h3g124V7BGbBOwWmdyoDWUevxXM9xXPpcErmES3pPqqHP5sgYiQyqRHN2
    0mQ2sOjth/3CtPADCpl2N5/rWuDvutmU6blU3sgig6J11Zjspk3XYsOkSABDEDaQ
    owCRtSGFutCsciUQi0I0IUI6v1BzFKcKQZnhwNiPBKFgmR64d0ZZ5t1IR8UDo0Dz
    g+8TO1LkT3ILP6QSuHuhjWZ1k1qlX2AMf5LomvOgJRG46CiKVcgwBBgsRS+RRafI
    8LrzL1TwVDA7RkYOpMDrSfLyqQYAfXMBXRJsjXQ0XBc7B198y5+dvqWmMOhW8+/l
    D7rgR/ECgYEA7sLqNadOT+KujzUMbJgOl0N0dOGCSdvbsJZrWxAN+0YhZu0/gCBS
    8KwkQPJnTTRVd2L+lfGE4Hd+38qESSwYLhCl2i5xSrHAgSYFrw5WChQ/xlZK+B4Z
    Q0SAqeSWcC7mhiRWH+mLPMPuT0A2zS/if6pLTm0t+FuY5DYEXDVO6fECgYEAwTAh
    xXaNRE3EXUk1DjenCIdryWB04a+bzSTS0yuzGV2f2v9srF+rxRjXg5DHH7Xls6ze
    37wJfWibFj4Myl/127EL/KduUvRh8mK7Gbduu01vWNbg6DhuyY/23fMlZ36Q0dsi
    3o7ahn5IH+Ezff/Kz6ME5xLZxFauc2W1FuNwC2kCgYBVWDLjztP9VifTZMD2KDw+
    8Yu1I86wm/ghXQMu38Q/p0fVRMTIBcXf5Yhn9r3aKPTL4gTikBxRKCWf1QIILczO
    2oCORr+UVYlcIL0zX8p9e9N4D+xoWEnrc5cSI3Vq0DjyhhaK/a4ZoGeUyH1ORumN
    fM/CTuB5wDQcjvpsA1ob4QKBgBBds362/GC89dWxTf1WWaAvWMJGmaBE8D4A0Jtz
    KEkN1W0IFnzD3hlkcV2D9lqJXlxKWNc7ZtJo+jp4Jz09w+ZIqWtOA9qjOWj/VDpp
    f8f+V2B/U65YmYoZ2CAVaSXLYxlkJyATmg+qwxFwUpxp/xR4CwJIZoprjXvZMe4u
    dl+BAoGBAOGUfoReV5BEY+TOyrhGTWF9Q+PVxBt+Gykk4BKgxmfK4dU+fnGaOKBc
    S/j0MCL6VBlSNeyyrvuOGYWQc/gUZfmX045O292o3HWzH9JIykzxejhJZ7BxwbJE
    9AK6kSxe7za+IkZ4OqokIdgN8mOWRbs5cqlKk0fFx6rn6NzLBDAu
    -----END RSA PRIVATE KEY-----`);

  const [messageToEncrypt, setMessageToEncrypt] = useState('');
  const [messageToDecrypt, setMessageToDecrypt] = useState('');
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
    console.log('Encrypting message:', messageToEncrypt);
    // const encrypted = await RSA.encrypt(messageToEncrypt, publicKey);
    const encrypted = await enc(messageToEncrypt, publicKey);
    console.log('Encrypted Message:', encrypted);
    setEncryptedMessage(encrypted);
    setMessageToDecrypt(encrypted);
  };

  const decryptMessage = async () => {
    if (!privateKey || !messageToDecrypt) {
      console.log('Private key or encrypted message is missing');
      return;
    }
    console.log('Decrypting message...');
    const decrypted = await dec(messageToDecrypt, privateKey);
    // const decrypted = await RSA.decrypt(messageToDecrypt, privateKey);
    console.log('Decrypted Message:', decrypted);
    setDecryptedMessage(decrypted);
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
        <TextInput
          style={styles.input}
          placeholder="Enter message to decrypt"
          value={messageToDecrypt}
          onChangeText={setMessageToDecrypt}
        />
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
