export const IosAuthorizationStatus = { PROVISIONAL: 0 } as const;
export async function getPermissionsAsync() {
  return { granted: true, ios: { status: IosAuthorizationStatus.PROVISIONAL } };
}
export async function requestPermissionsAsync() {
  return { granted: true, ios: { status: IosAuthorizationStatus.PROVISIONAL } };
}
export async function scheduleNotificationAsync(_: any) {
  return Promise.resolve();
}