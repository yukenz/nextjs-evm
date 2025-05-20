'use server'

import {hextob64, KEYUTIL, KJUR} from 'jsrsasign';

// DoRsaSignature
interface IDoRsaSignature {
    privateKey: string;
    message: string,
    algorithm: 'SHA256withRSA' | 'SHA512withRSA' | string,
}


async function doRsaSignature({
                                  privateKey,
                                  algorithm,
                                  message
                              }: IDoRsaSignature) {

    const privKey = KEYUTIL.getKey(privateKey);
    const sha256wRsa = new KJUR.crypto.Signature({alg: algorithm});
    sha256wRsa.init(privKey)
    sha256wRsa.updateString(JSON.stringify(message))

    return hextob64(sha256wRsa.sign());
}


// DoGenerateRsa
interface IDoGenerateRsa {
    keyLength: 1024 | 2048 | 4096 | number,
}

async function doGenerateRsa({
                                 keyLength
                             }: IDoGenerateRsa) {

    const keypair = KEYUTIL.generateKeypair("RSA", keyLength);
    const privPem = KEYUTIL.getPEM(keypair.prvKeyObj, "PKCS8PRV");
    const pubPem = KEYUTIL.getPEM(keypair.pubKeyObj);

    return {privPem, pubPem};
}

export {doRsaSignature, doGenerateRsa}