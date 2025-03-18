# Evolution API Client

A TypeScript/Node.js client library for interacting with the Evolution API WhatsApp integration.

## Installation

```bash
npm install evolution-api-client
```

## Usage

```typescript
import { Config } from 'evolution-api-client/config';
import EvolutionAPI from 'evolution-api-client';

// Initialize config with base URL and API key
const config = new Config('https://your-evolution-api.com', 'your-global-api-key');

// Initialize client with config
const api = new EvolutionAPI(config);

// Set the instance name you want to work with
api.setInstance('my-instance');

// Create a new instance
async function createNewInstance() {
  try {
    const result = await api.createInstance({
      instanceName: 'my-instance',
      qrcode: true
    });
    console.log('Instance created:', result);
    return result;
  } catch (error) {
    console.error('Error creating instance:', error);
  }
}
```

## Features

This client provides methods to interact with all major functionality of the Evolution API:

### Instance Management
- Create, connect, restart, and delete instances
- Check connection state
- Set presence status

### Webhook Management
- Configure webhooks for receiving events

### Settings Management
- Configure instance settings (reject calls, read messages, etc.)

### Messaging
- Send text, media, buttons, lists, and more
- Support for template messages

### Group Management
- Create and manage WhatsApp groups
- Update group info, invite participants

### Chat Management
- Verify WhatsApp numbers
- Find contacts, messages, and chats
- Fetch profile pictures

### Integrations
- Typebot integration for chatbots
- OpenAI integration for AI-powered responses

## Example: Sending a Message

```typescript
import { Config } from 'evolution-api-client/config';
import EvolutionAPI from 'evolution-api-client';
import { MessageOptions } from 'evolution-api-client/types';

async function sendTextMessage() {
  try {
    const config = new Config('https://your-evolution-api.com', 'your-global-api-key');
    const api = new EvolutionAPI(config);
    
    const options: MessageOptions = {
      delay: 1000,
      presence: 'composing'
    };
    
    const result = await api
      .setInstance('my-instance')
      .setApikey('instance-specific-api-key') // If you have a stored API key
      .sendText('5511987654321', 'Hello from Evolution API Client!', options);
    
    console.log('Message sent:', result);
  } catch (error) {
    console.error('Error sending message:', error);
  }
}
```

## Example: Working with Groups

```typescript
import { Config } from 'evolution-api-client/config';
import EvolutionAPI from 'evolution-api-client';

async function createAndManageGroup() {
  try {
    const config = new Config('https://your-evolution-api.com', 'your-global-api-key');
    const api = new EvolutionAPI(config);
    
    // Create a new group
    const group = await api.createGroup({
      subject: "My Test Group",
      participants: ["5511987654321", "5511987654322"]
    });
    
    console.log('Group created:', group);
    
    // Get the group JID
    const groupJid = group.id;
    
    // Update the group description
    await api.updateGroupDescription(groupJid, "This is our test group description");
    
    // Get invite code
    const inviteInfo = await api.fetchInviteCode(groupJid);
    console.log('Invite code:', inviteInfo.code);
  } catch (error) {
    console.error('Error managing group:', error);
  }
}
```

## API Reference

### Constructor

```typescript
import { Config } from 'evolution-api-client/config';
import EvolutionAPI from 'evolution-api-client';

const config = new Config(baseUrl: string, apiKey: string);
const api = new EvolutionAPI(config);
```

### Configuration

The `Config` class provides methods to manage your API configuration:

- `getUrl()` - Get the current base URL
- `getApiKey()` - Get the current API key
- `setUrl(url: string)` - Update the base URL
- `setApiKey(apiKey: string)` - Update the API key

### Instance Methods

- `setInstance(instance: string)` - Set the instance name
- `setApikey(apikey: string)` - Set the instance-specific API key
- `useGlobalApikey()` - Switch back to using the global API key

### Instance Management

- `createInstance(options: InstanceOptions)`
- `fetchInstances(instanceName?: string)`
- `connectInstance(number?: string)`
- `restartInstance()`
- `setPresence(presence: PresenceStatus)`
- `getConnectionState()`
- `logoutInstance()`
- `deleteInstance()`

### Messaging

- `sendText(number: string, text: string, options?: MessageOptions)`
- `sendMedia(number: string, mediaConfig: MediaConfig)`
- `sendButtons(number: string, buttonsConfig: ButtonsConfig)`
- `sendList(number: string, listConfig: ListConfig)`

### Group Management

- `createGroup(groupConfig: GroupConfig)`
- `updateGroupSubject(groupJid: string, subject: string)`
- `updateGroupDescription(groupJid: string, description: string)`
- `fetchInviteCode(groupJid: string)`
- `revokeInviteCode(groupJid: string)`

### Chat Management

- `isWhatsAppNumber(numbers: string[])`
- `findContacts(where: ContactQuery)`
- `findMessages(where: MessageQuery)`
- `findChats()`
- `fetchProfilePicture(number: string)`

### Integrations

- `createTypebot(typebotConfig: TypebotConfig)`
- `findTypebots()`
- `fetchTypebot(typebotId: string)`
- `startTypebot(typebotConfig: TypebotConfig)`
- `createOpenaiBot(openaiConfig: OpenAIConfig)`
- `setOpenaiCreds(credsConfig: OpenAICredsConfig)`

## Types

The library includes TypeScript type definitions for all parameters and responses. Import them from the types module:

```typescript
import {
  InstanceOptions,
  MessageOptions,
  MediaConfig,
  ButtonsConfig,
  ListConfig,
  GroupConfig,
  ContactQuery,
  MessageQuery,
  TypebotConfig,
  OpenAIConfig,
  OpenAICredsConfig,
  PresenceStatus
} from 'evolution-api-client/types';
```

## License

MIT
