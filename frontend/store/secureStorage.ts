import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;

export const secureStorage = {
  getItem: (name: string): string | null => {
    if (typeof window === "undefined") return null;
    const encrypted = localStorage.getItem(name);
    if (!encrypted) return null;

    try {
      const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY!);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (err) {
      console.error("Decryption error:", err);
      return null;
    }
  },

  setItem: (name: string, value: string): void => {
    if (typeof window === "undefined") return;
    const encrypted = CryptoJS.AES.encrypt(value, SECRET_KEY!).toString();
    localStorage.setItem(name, encrypted);
  },

  removeItem: (name: string): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(name);
  },
};
