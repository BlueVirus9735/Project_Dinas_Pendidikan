export const generateSecureToken = (id) => {
  const secretKey = "DINAS_RAHASIA_2024"; // Simple secret key
  const text = id.toString();
  let result = "";

  // XOR Operation
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(
      text.charCodeAt(i) ^ secretKey.charCodeAt(i % secretKey.length)
    );
  }

  // Base64 Encode
  return btoa(result);
};
