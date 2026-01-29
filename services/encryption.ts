
// Note: Client-side encryption is primarily for obfuscation against casual snooping.
// For a production app, a backend proxy is recommended.
const SECRET_PREFIX = "studio_enc_";

export const obfuscate = (text: string): string => {
  return btoa(SECRET_PREFIX + text).split('').reverse().join('');
};

export const deobfuscate = (obfuscated: string): string => {
  try {
    const reversed = obfuscated.split('').reverse().join('');
    const decoded = atob(reversed);
    return decoded.replace(SECRET_PREFIX, "");
  } catch (e) {
    return "";
  }
};
