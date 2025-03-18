import { expect, describe, test } from "bun:test";
import { Config } from '../src/config/config';

describe('Config', () => {
  test('URL management > should get initial URL', () => {
    const url = 'http://localhost:8080';
    const config = new Config(url, 'test-key');
    expect(config.getUrl()).toBe(url);
  });

  test('URL management > should set new URL', () => {
    const initialUrl = 'http://localhost:8080';
    const newUrl = 'http://localhost:3000';
    const config = new Config(initialUrl, 'test-key');
    config.setUrl(newUrl);
    expect(config.getUrl()).toBe(newUrl);
  });

  test('API key management > should get initial API key', () => {
    const apiKey = 'test-key';
    const config = new Config('http://localhost:8080', apiKey);
    expect(config.getApiKey()).toBe(apiKey);
  });

  test('API key management > should set new API key', () => {
    const initialKey = 'test-key';
    const newKey = 'new-test-key';
    const config = new Config('http://localhost:8080', initialKey);
    config.setApiKey(newKey);
    expect(config.getApiKey()).toBe(newKey);
  });
});
