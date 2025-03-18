import { test, expect, mock } from "bun:test";
import axios from 'axios';
import { Config } from '../src/config/config';
import EvolutionAPI from '../src/evolution-api-client';
import { InstanceOptions, MessageOptions, Settings } from '../src/types';

test('EvolutionAPI', async () => {
  let api: EvolutionAPI;
  let config: Config;
  let mockAxiosInstance: any;

  // Setup before each test
  const setup = () => {
    // Create mock axios instance
    mockAxiosInstance = {
      get: mock(() => Promise.resolve({ data: {} })),
      post: mock(() => Promise.resolve({ data: {} })),
      delete: mock(() => Promise.resolve({ data: {} })),
      defaults: {
        headers: {}
      }
    };

    // Mock axios.create to return our mock instance
    mock(axios, 'create', () => mockAxiosInstance);

    config = new Config('https://test-api.com', 'test-key');
    api = new EvolutionAPI(config);
    api.setInstance('test-instance');
  };

  test('createInstance', async () => {
    setup();

    const options: InstanceOptions = {
      instanceName: 'test-instance',
      qrcode: true
    };

    const expectedRequest = {
      ...options,
      integration: 'WHATSAPP-BAILEYS'
    };

    const mockResponse = {
      data: {
        instance: 'test-instance',
        status: 'created'
      }
    };

    mockAxiosInstance.post.mockImplementation(() => Promise.resolve(mockResponse));

    const result = await api.createInstance(options);
    expect(result).toEqual(mockResponse.data);
    expect(mockAxiosInstance.post).toHaveBeenCalledWith(
      '/instance/create',
      expectedRequest
    );

    // Test error handling
    const mockError = {
      isAxiosError: true,
      response: {
        status: 400,
        data: { error: 'Invalid instance name' }
      }
    };

    mockAxiosInstance.post.mockImplementation(() => Promise.reject(mockError));

    try {
      await api.createInstance(options);
      throw new Error('Should have thrown an error');
    } catch (error: any) {
      expect(error.message).toBe('Error 400: {"error":"Invalid instance name"}');
    }
  });

  test('sendText', async () => {
    setup();

    const number = '1234567890';
    const text = 'Test message';
    const options: MessageOptions = {
      delay: 1000,
      presence: 'composing'
    };

    const mockResponse = {
      data: {
        status: 'success',
        message: 'Message sent'
      }
    };

    mockAxiosInstance.post.mockImplementation(() => Promise.resolve(mockResponse));

    const result = await api.sendText(number, text, options);
    expect(result).toEqual(mockResponse.data);
    expect(mockAxiosInstance.post).toHaveBeenCalledWith(
      '/message/sendText/test-instance',
      { number, text, ...options }
    );
  });

  test('setSettings', async () => {
    setup();

    const settings: Settings = {
      rejectCall: true,
      msgCall: 'Sorry, calls are not accepted',
      groupsIgnore: false,
      alwaysOnline: true
    };

    const defaultSettings = {
      readMessages: false,
      readStatus: false,
      syncFullHistory: false
    };

    const mockResponse = {
      data: {
        status: 'success',
        message: 'Settings updated'
      }
    };

    mockAxiosInstance.post.mockImplementation(() => Promise.resolve(mockResponse));

    const result = await api.setSettings(settings);
    expect(result).toEqual(mockResponse.data);
    expect(mockAxiosInstance.post).toHaveBeenCalledWith(
      '/settings/set/test-instance',
      { ...settings, ...defaultSettings }
    );
  });
});
