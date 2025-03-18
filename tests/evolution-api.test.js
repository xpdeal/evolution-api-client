const axios = require('axios');
const EvolutionAPI = require('../evolution-api-client');

// Mock axios
jest.mock('axios');

describe('EvolutionAPI', () => {
  let api;
  
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Create a new instance for each test
    api = new EvolutionAPI('https://test-api.com', 'global-api-key');
    api.setInstance('test-instance');
    
    // Setup the axios mock to return a successful response by default
    axios.create.mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: { success: true } }),
      post: jest.fn().mockResolvedValue({ data: { success: true } }),
      delete: jest.fn().mockResolvedValue({ data: { success: true } }),
      defaults: {
        headers: {}
      }
    });
  });
  
  describe('Constructor and configuration', () => {
    test('should initialize with baseUrl and global API key', () => {
      expect(api.baseUrl).toBe('https://test-api.com');
      expect(api.globalApikey).toBe('global-api-key');
      expect(axios.create).toHaveBeenCalledWith({
        baseURL: 'https://test-api.com',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'global-api-key'
        }
      });
    });
    
    test('should set instance name', () => {
      api.setInstance('another-instance');
      expect(api.instance).toBe('another-instance');
    });
    
    test('should set instance-specific API key', () => {
      api.setApikey('instance-api-key');
      expect(api.apikey).toBe('instance-api-key');
      expect(api.axiosInstance.defaults.headers.apikey).toBe('instance-api-key');
    });
    
    test('should reset to global API key', () => {
      api.setApikey('instance-api-key');
      api.useGlobalApikey();
      expect(api.axiosInstance.defaults.headers.apikey).toBe('global-api-key');
    });
  });
  
  describe('Instance Management', () => {
    test('should create an instance', async () => {
      const mockResponse = { 
        data: { 
          hash: 'new-instance-key',
          qrcode: { base64: 'qr-code-data' }
        } 
      };
      
      api.axiosInstance.post.mockResolvedValueOnce(mockResponse);
      
      const result = await api.createInstance();
      
      expect(api.axiosInstance.post).toHaveBeenCalledWith(
        '/instance/create',
        {
          instanceName: 'test-instance',
          qrcode: true,
          integration: 'WHATSAPP-BAILEYS'
        }
      );
      
      expect(result).toEqual(mockResponse.data);
      expect(api.apikey).toBe('new-instance-key');
    });
    
    test('should fetch instances', async () => {
      await api.fetchInstances();
      expect(api.axiosInstance.get).toHaveBeenCalledWith('/instance/fetchInstances');
      
      await api.fetchInstances('specific-instance');
      expect(api.axiosInstance.get).toHaveBeenCalledWith('/instance/fetchInstances?instanceName=specific-instance');
    });
    
    test('should connect to an instance', async () => {
      await api.connectInstance();
      expect(api.axiosInstance.get).toHaveBeenCalledWith('/instance/connect/test-instance');
      
      await api.connectInstance('1234567890');
      expect(api.axiosInstance.get).toHaveBeenCalledWith('/instance/connect/test-instance?number=1234567890');
    });
  });
  
  describe('Messaging', () => {
    test('should send text messages', async () => {
      await api.sendText('1234567890', 'Hello world');
      expect(api.axiosInstance.post).toHaveBeenCalledWith(
        '/message/sendText/test-instance',
        {
          number: '1234567890',
          text: 'Hello world'
        }
      );
    });
    
    test('should send media messages', async () => {
      await api.sendMedia('1234567890', {
        caption: 'Check this out',
        media: 'https://example.com/image.jpg'
      });
      
      expect(api.axiosInstance.post).toHaveBeenCalledWith(
        '/message/sendMedia/test-instance',
        {
          number: '1234567890',
          mediatype: 'image',
          mimetype: 'image/png',
          caption: 'Check this out',
          media: 'https://example.com/image.jpg'
        }
      );
    });
  });
  
  describe('Error handling', () => {
    test('should handle API errors', async () => {
      const errorResponse = {
        response: {
          status: 400,
          data: { error: 'Bad Request' }
        }
      };
      
      api.axiosInstance.post.mockRejectedValueOnce(errorResponse);
      
      await expect(api.sendText('1234567890', 'Hello world'))
        .rejects
        .toThrow('Error 400: {"error":"Bad Request"}');
    });
    
    test('should handle network errors', async () => {
      const networkError = {
        request: {},
        message: 'Network Error'
      };
      
      api.axiosInstance.post.mockRejectedValueOnce(networkError);
      
      await expect(api.sendText('1234567890', 'Hello world'))
        .rejects
        .toThrow('No response received: {}');
    });
  });
});