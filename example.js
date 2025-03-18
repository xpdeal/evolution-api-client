const EvolutionAPI = require('./index');

// Replace with your actual values
const EVOLUTION_API_URL = 'https://your-evolution-api.com';
const GLOBAL_API_KEY = 'your-global-api-key';
const INSTANCE_NAME = 'my-instance';

async function run() {
  try {
    // Initialize API client
    const api = new EvolutionAPI(EVOLUTION_API_URL, GLOBAL_API_KEY);
    
    // Set instance
    api.setInstance(INSTANCE_NAME);
    
    // Check if instance exists, create if it doesn't
    const instances = await api.fetchInstances();
    const instanceExists = instances.find(i => i.instance === INSTANCE_NAME);
    
    let instanceInfo;
    if (!instanceExists) {
      console.log('Creating new instance...');
      instanceInfo = await api.createInstance();
      console.log('Instance created. Scan QR code to connect:');
      console.log(instanceInfo.qrcode?.base64 ? 'QR Code available' : 'No QR code generated');
    } else {
      console.log('Instance already exists');
    }
    
    // Check connection state
    const connectionState = await api.getConnectionState();
    console.log('Connection state:', connectionState.state);
    
    // If connected, send a test message
    if (connectionState.state === 'open') {
      // Replace with a valid WhatsApp number
      const targetNumber = '5511987654321';
      
      // Verify if it's a valid WhatsApp number
      const whatsappCheck = await api.isWhatsAppNumber([targetNumber]);
      
      if (whatsappCheck.numbers.length > 0) {
        console.log(`${targetNumber} is a valid WhatsApp number`);
        
        // Send text message
        const messageResult = await api.sendText(
          targetNumber, 
          'Hello! This is a test message from Evolution API Client'
        );
        console.log('Message sent:', messageResult);
        
        // Send buttons
        const buttonsResult = await api.sendButtons(
          targetNumber,
          {
            title: "Would you like to know more?",
            description: "Select an option below",
            buttons: [
              { text: "Yes, tell me more", id: "more" },
              { text: "No, thanks", id: "stop" }
            ]
          }
        );
        console.log('Buttons sent:', buttonsResult);
      } else {
        console.log(`${targetNumber} is not a valid WhatsApp number`);
      }
    } else {
      console.log('Instance is not connected. Connect first to send messages.');
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

run().catch(console.error);