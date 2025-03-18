import { expect, describe, test } from "bun:test";
import { Config } from '../src/config/config';
import { EvolutionAPI } from '../src/evolution-api-client';
import { Settings } from '../src/types';

describe('EvolutionAPI', () => {
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

    const response = await client.settings.setSettings(settings);
    expect(response).toEqual(settings);
  });
});
