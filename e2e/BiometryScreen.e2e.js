describe('Biometry Screen Tests', () => {
  beforeAll(async () => {
    await device.launchApp({
      permissions: { faceid: 'YES'},
    });
    await device.setBiometricEnrollment(true);
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  })

  it('should match FaceID', async () => {
    await element(by.text('Biometry screen')).tap();
    await expect(element(by.text('Not Run'))).toBeVisible();
    await element(by.text('Biometry check')).tap();
    await device.matchFace();
    await expect(element(by.text('Face ID Match Successful!!!'))).toBeVisible();
  });

  
  it('should not match FaceID', async () => {
    await element(by.text('Biometry screen')).tap();
    await expect(element(by.text('Not Run'))).toBeVisible();
    await element(by.text('Biometry check')).tap();
    await device.unmatchFace();
    // Not sure what to do here, can't interact with system dialog to try again.
    // Test hangs until global timeout.
    await expect(element(by.text('Face ID Match Failed!!!'))).toBeVisible();
  })
});
