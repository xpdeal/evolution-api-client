import { Config } from '../src/config/config';

describe('Config', () => {
  let config: Config;

  beforeEach(() => {
    config = new Config('https://test-api.com', 'test-api-key');
  });

  describe('URL management', () => {
    test('should get initial URL', () => {
      expect(config.getUrl()).toBe('https://test-api.com');
    });

    test('should set new URL', () => {
      config.setUrl('https://new-api.com');
      expect(config.getUrl()).toBe('https://new-api.com');
    });
  });

  describe('API key management', () => {
    test('should get initial API key', () => {
      expect(config.getApiKey()).toBe('test-api-key');
    });

    test('should set new API key', () => {
      config.setApiKey('new-api-key');
      expect(config.getApiKey()).toBe('new-api-key');
    });
  });
});
