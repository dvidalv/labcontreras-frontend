import FingerprintJS from "@fingerprintjs/fingerprintjs";

// Initialize the FingerprintJS agent
const fpPromise = FingerprintJS.load();

// Get the visitor's fingerprint
export const getVisitorFingerprint = async () => {
  try {
    const fp = await fpPromise;
    const result = await fp.get();
    return result.visitorId;
  } catch (error) {
    console.error("Error getting fingerprint:", error);
    return null;
  }
};
