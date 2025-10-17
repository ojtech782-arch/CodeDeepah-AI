/**
 * Minimal E2EE helper using tweetnacl (box) for public-key authenticated encryption.
 * NOTE: Secure key exchange and storage must be implemented server-side in production.
 */
import nacl from 'tweetnacl';
import naclUtil from 'tweetnacl-util';

export function generateKeyPair() {
  const kp = nacl.box.keyPair();
  return {
    publicKey: naclUtil.encodeBase64(kp.publicKey),
    secretKey: naclUtil.encodeBase64(kp.secretKey),
  };
}

export function encryptMessage(message: string, receiverPublicBase64: string, senderSecretBase64: string) {
  const nonce = nacl.randomBytes(nacl.box.nonceLength);
  const receiverPublic = naclUtil.decodeBase64(receiverPublicBase64);
  const senderSecret = naclUtil.decodeBase64(senderSecretBase64);
  const msgUint8 = naclUtil.decodeUTF8(message);
  const boxed = nacl.box(msgUint8, nonce, receiverPublic, senderSecret);
  return {
    nonce: naclUtil.encodeBase64(nonce),
    ciphertext: naclUtil.encodeBase64(boxed),
  };
}

export function decryptMessage(ciphertextBase64: string, nonceBase64: string, senderPublicBase64: string, receiverSecretBase64: string) {
  const ciphertext = naclUtil.decodeBase64(ciphertextBase64);
  const nonce = naclUtil.decodeBase64(nonceBase64);
  const senderPublic = naclUtil.decodeBase64(senderPublicBase64);
  const receiverSecret = naclUtil.decodeBase64(receiverSecretBase64);
  const opened = nacl.box.open(ciphertext, nonce, senderPublic, receiverSecret);
  if (!opened) throw new Error('Failed to decrypt');
  return naclUtil.encodeUTF8(opened);
}
