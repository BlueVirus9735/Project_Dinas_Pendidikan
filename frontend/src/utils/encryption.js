/**
 * XOR + Base64 Encryption Utilities
 * For secure file upload/download with duplicate detection
 */

/**
 * XOR Encrypt data with key
 * @param {Uint8Array} data - Binary data to encrypt
 * @param {string} key - Encryption key (nomor ijazah)
 * @returns {Uint8Array} Encrypted data
 */
export const xorEncrypt = (data, key) => {
  const keyBytes = new TextEncoder().encode(key);
  const encrypted = new Uint8Array(data.length);

  for (let i = 0; i < data.length; i++) {
    encrypted[i] = data[i] ^ keyBytes[i % keyBytes.length];
  }

  return encrypted;
};

/**
 * XOR Decrypt data with key
 * @param {Uint8Array} data - Encrypted data
 * @param {string} key - Decryption key (nomor ijazah)
 * @returns {Uint8Array} Decrypted data
 */
export const xorDecrypt = (data, key) => {
  // XOR is symmetric, so decrypt = encrypt
  return xorEncrypt(data, key);
};

/**
 * Generate SHA-256 hash of file
 * @param {File} file - File object
 * @returns {Promise<string>} Base64 encoded hash
 */
export const generateFileHash = async (file) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // Convert to Base64
    const base64Hash = btoa(String.fromCharCode(...hashArray));
    return base64Hash;
  } catch (error) {
    console.error("Error generating file hash:", error);
    throw error;
  }
};

/**
 * Encode Uint8Array to Base64
 * @param {Uint8Array} data - Binary data
 * @returns {string} Base64 encoded string
 */
export const encodeBase64 = (data) => {
  return btoa(String.fromCharCode(...data));
};

/**
 * Decode Base64 to Uint8Array
 * @param {string} base64 - Base64 encoded string
 * @returns {Uint8Array} Binary data
 */
export const decodeBase64 = (base64) => {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);

  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes;
};

/**
 * Read file as Uint8Array
 * @param {File} file - File object
 * @returns {Promise<Uint8Array>} Binary data
 */
export const readFileAsBytes = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  return new Uint8Array(arrayBuffer);
};
