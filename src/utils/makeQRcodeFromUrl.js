import { QRCodeSVG } from "qrcode.react";

/**
 * Generates a QR code image from the current URL.
 * @returns {Promise<string>} A promise that resolves to the data URL of the QR code image.
 */
/**
 * Generates a QR code image from a given URL.
 * @param {string} url - The URL to encode in the QR code.
 * @returns {Promise<string>} A promise that resolves to the data URL of the QR code image.
 */
export async function makeQRcodeFromUrl() {
  const urlActual = window.location.href;
  const qrCode = await QRCodeSVG.toDataURL(urlActual);
  return qrCode;
}
