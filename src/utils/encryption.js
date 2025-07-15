import forge from 'node-forge';

// Paste your server's public key here (from public.pem)
const publicKeyPem = `
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx3tMnPPEmGH5WgdGYiZG
xsB70lUi7ywqM6ME88lCt5ovivsawSq5m3YU3cet7hC/i9sn4KMNchFnJLKzT+i1
tS2VQP37F5w2GYCn6IQGpq0uyYPE0uK48KnczNqAChnmFyu1xjBx4ddckk+zZDgf
PTqSwawUk5ZcdxJSzB00lB+HzPpUWduRZwqDIvGdnTis1clZgaOo38HA6nXIvByc
/FuzLiH1yX3PpXbNjg1KvRSXKpej74OAreX9DXyewH3FUHKfJxNDLEdrQm6mMkh/
qzV00qA6ZlXE5k0a1gvA913/BRwqtv4iIN0XXknEYXRCkncUehVxmFSQr54e0bY+
IwIDAQAB
-----END PUBLIC KEY-----
`;

const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);

export const encryptWithRSA = (plainText) => {
  const encrypted = publicKey.encrypt(plainText, 'RSA-OAEP', {
    md: forge.md.sha256.create(),
  });
  return forge.util.encode64(encrypted);
};
