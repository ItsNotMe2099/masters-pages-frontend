import FingerprintJS from "@fingerprintjs/fingerprintjs";

export const getDeviceId = async () => {
  const fp = await FingerprintJS.load();
  const deviceInfo = await fp.get();
  return deviceInfo.visitorId;
}
