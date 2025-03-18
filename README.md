# Evolution API Client

A Node.js client library for interacting with the Evolution API WhatsApp integration.

## Installation

```bash
npm install evolution-api-client
```

## Usage

```javascript
const EvolutionAPI = require('evolution-api-client');

// Initialize with base URL and API key
const api = new EvolutionAPI('https://your-evolution-api.com', 'your-global-api-key');

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
    
    // Store the API key for future use
    console.log('API Key:', api.apikey);
    
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

```javascript
async function sendTextMessage() {
  try {
    const result = await api
      .setInstance('my-instance')
      .setApikey('instance-specific-api-key') // If you have a stored API key
      .sendText('5511987654321', 'Hello from Evolution API Client!');
    
    console.log('Message sent:', result);
  } catch (error) {
    console.error('Error sending message:', error);
  }
}
```

## Example: Working with Groups

```javascript
async function createAndManageGroup() {
  try {
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

```javascript
const api = new EvolutionAPI(baseUrl, globalApikey);
```

### Instance Methods

- `setInstance(instance)` - Set the instance name
- `setApikey(apikey)` - Set the instance-specific API key
- `useGlobalApikey()` - Switch back to using the global API key

### Instance Management

- `createInstance(options)`
- `fetchInstances(instanceName)`
- `connectInstance(number)`
- `restartInstance()`
- `setPresence(presence)`
- `getConnectionState()`
- `logoutInstance()`
- `deleteInstance()`

### Messaging

- `sendText(number, text, options)`
- `sendMedia(number, mediaConfig)`
- `sendButtons(number, buttonsConfig)`
- `sendList(number, listConfig)`

### Group Management

- `createGroup(groupConfig)`
- `updateGroupSubject(groupJid, subject)`
- `updateGroupDescription(groupJid, description)`
- `fetchInviteCode(groupJid)`
- `revokeInviteCode(groupJid)`

### Chat Management

- `isWhatsAppNumber(numbers)`
- `findContacts(where)`
- `findMessages(where)`
- `findChats()`
- `fetchProfilePicture(number)`

### Integrations

- `createTypebot(typebotConfig)`
- `findTypebots()`
- `fetchTypebot(typebotId)`
- `startTypebot(typebotConfig)`
- `createOpenaiBot(openaiConfig)`
- `setOpenaiCreds(credsConfig)`

## License

MIT# evolution-api-client
