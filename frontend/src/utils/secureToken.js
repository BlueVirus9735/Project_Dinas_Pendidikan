export const generateSecureToken = (id) => {
  const secretKey = "SI_StikomCirebon_Adji_PengenCepetWisuda:)";
  const text = id.toString();
  let result = "";

  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(
      text.charCodeAt(i) ^ secretKey.charCodeAt(i % secretKey.length)
    );
  }
  return btoa(result);
};
