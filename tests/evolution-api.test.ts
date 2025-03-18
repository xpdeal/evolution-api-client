import { expect, describe, test, mock, beforeAll, afterAll } from "bun:test";
import { Config } from '../src/config/config';
import { EvolutionAPI } from '../src/evolution-api-client';
import { Settings } from '../src/types';
import axios from 'axios';

describe('EvolutionAPI', () => {
  // Mock axios instance for all tests
  const mockAxiosInstance = {
    post: mock(() => Promise.resolve({ data: {} })),
    get: mock(() => Promise.resolve({ data: {} })),
    delete: mock(() => Promise.resolve({ data: {} })),
    defaults: {
      headers: {}
    }
  };

  // Store original axios.create
  const originalCreate = axios.create;

  beforeAll(() => {
    // Mock axios.create before all tests
    axios.create = mock(() => mockAxiosInstance);
  });

  afterAll(() => {
    // Restore original after all tests
    axios.create = originalCreate;
  });

  test('constructor sets baseUrl and globalApikey', () => {
    const config = new Config('http://localhost:8080', 'test-api-key');
    const client = new EvolutionAPI(config);
    expect(client).toBeDefined();
  });

  test('group service is initialized', () => {
    const config = new Config('http://localhost:8080', 'test-api-key');
    const client = new EvolutionAPI(config);
    expect(client.group).toBeDefined();
  });

  test('settings service is initialized', () => {
    const config = new Config('http://localhost:8080', 'test-api-key');
    const client = new EvolutionAPI(config);
    expect(client.settings).toBeDefined();
  });

  test('message service is initialized', () => {
    const config = new Config('http://localhost:8080', 'test-api-key');
    const client = new EvolutionAPI(config);
    expect(client.message).toBeDefined();
  });

  test('chat service is initialized', () => {
    const config = new Config('http://localhost:8080', 'test-api-key');
    const client = new EvolutionAPI(config);
    expect(client.chat).toBeDefined();
  });

  test('setSettings merges with default settings', async () => {
    const config = new Config('http://localhost:8080', 'test-api-key');
    const client = new EvolutionAPI(config);
    
    const settings: Settings = {
      reject_call: true,
      msg_call: 'Sorry, I cannot take calls right now.',
      groups_ignore: false,
      always_online: true,
      read_messages: true,
      read_status: true
    };

    // Update mock response for this test
    mockAxiosInstance.post = mock(() => Promise.resolve({ data: settings }));

    const response = await client.settings.setSettings(settings);
    expect(response).toEqual(settings);
    expect(mockAxiosInstance.post.mock.calls).toBeTruthy();
  });
});
