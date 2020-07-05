const VALID_PLATFORMS = ['android', 'electron', 'ios'];

export function assertValidPlatform(platform: string): void {
  if (VALID_PLATFORMS.indexOf(platform) === -1) {
    throw new Error(
      `Unsupported native platform option found: ${platform}. Valid values are: "${VALID_PLATFORMS.join(
        '", "'
      )}"`
    );
  }
}
