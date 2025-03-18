const axios = require('axios');

class EvolutionAPI {
  constructor(baseUrl, globalApikey) {
    this.baseUrl = baseUrl;
    this.globalApikey = globalApikey;
    this.instance = null;
    this.apikey = null;
    
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'apikey': this.globalApikey
      }
    });
  }

  // Set the instance to use for requests
  setInstance(instance) {
    this.instance = instance;
    return this;
  }

  // Set the apikey for instance-specific requests
  setApikey(apikey) {
    this.apikey = apikey;
    this.axiosInstance.defaults.headers.apikey = apikey;
    return this;
  }

  // Reset to global API key
  useGlobalApikey() {
    this.axiosInstance.defaults.headers.apikey = this.globalApikey;
    return this;
  }

  // Instance Management
  async createInstance(options = {}) {
    try {
      const defaultOptions = {
        instanceName: this.instance,
        qrcode: true,
        integration: 'WHATSAPP-BAILEYS'
      };

      const response = await this.axiosInstance.post(
        '/instance/create',
        { ...defaultOptions, ...options }
      );

      if (response.data && response.data.hash) {
        this.apikey = response.data.hash;
        this.axiosInstance.defaults.headers.apikey = this.apikey;
      }

      return response.data;
    } catch (error) {
      this._handleError(error);
    }
  }

  async fetchInstances(instanceName = null) {
    try {
      let url = '/instance/fetchInstances';
      if (instanceName) {
        url += `?instanceName=${instanceName}`;
      }
      return (await this.axiosInstance.get(url)).data;
    } catch (error) {
      this._handleError(error);
    }
  }

  async connectInstance(number = null) {
    try {
      let url = `/instance/connect/${this.instance}`;
      if (number) {
        url += `?number=${number}`;
      }
      return (await this.axiosInstance.get(url)).data;
    } catch (error) {
      this._handleError(error);
    }
  }

  async restartInstance() {
    try {
      return (await this.axiosInstance.post(`/instance/restart/${this.instance}`)).data;
    } catch (error) {
      this._handleError(error);
    }
  }

  async setPresence(presence = 'available') {
    try {
      return (await this.axiosInstance.post(`/instance/setPresence/${this.instance}`, { presence })).data;
    } catch (error) {
      this._handleError(error);
    }
  }

  async getConnectionState() {
    try {
      return (await this.axiosInstance.get(`/instance/connectionState/${this.instance}`)).data;
    } catch (error) {
      this._handleError(error);
    }
  }

  async logoutInstance() {
    try {
      return (await this.axiosInstance.delete(`/instance/logout/${this.instance}`)).data;
    } catch (error) {
      this._handleError(error);
    }
  }

  async deleteInstance() {
    try {
      return (await this.useGlobalApikey().axiosInstance.delete(`/instance/delete/${this.instance}`)).data;
    } catch (error) {
      this._handleError(error);
    }
  }

  // Webhook Management
  async setWebhook(webhookConfig = {}) {
    try {
      const defaultConfig = {
        enabled: true,
        url: "https://webhook.site",
        webhookByEvents: false,
        webhookBase64: false,
        events: [
          "MESSAGES_UPSERT",
          "MESSAGES_UPDATE",
          "SEND_MESSAGE"
          // Add other events as needed
        ]
      };

      return (await this.axiosInstance.post(
        `/webhook/set/${this.instance}`,
        { ...defaultConfig, ...webhookConfig }
      )).data;
    } catch (error) {
      this._handleError(error);
    }
  }

  async findWebhook() {
    try {
      return (await this.axiosInstance.get(`/webhook/find/${this.instance}`)).data;
    } catch (error) {
      this._handleError(error);
    }
  }

  // Settings Management
  async setSettings(settings = {}) {
    try {
      const defaultSettings = {
        rejectCall: true,
        msgCall: "I do not accept calls",
        groupsIgnore: false,
        alwaysOnline: true,
        readMessages: false,
        syncFullHistory: false,
        readStatus: false
      };

      return (await this.axiosInstance.post(
        `/settings/set/${this.instance}`,
        { ...defaultSettings, ...settings }
      )).data;
    } catch (error) {
      this._handleError(error);
    }
  }

  async findSettings() {
    try {
      return (await this.axiosInstance.get(`/settings/find/${this.instance}`)).data;
    } catch (error) {
      this._handleError(error);
    }
  }

  // Messaging
  async sendText(number, text, options = {}) {
    try {
      return (await this.axiosInstance.post(
        `/message/sendText/${this.instance}`,
        { number, text, ...options }
      )).data;
    } catch (error) {
      this._handleError(error);
    }
  }

  async sendMedia(number, mediaConfig = {}) {
    try {
      const defaultConfig = {
        number,
        mediatype: "image",
        mimetype: "image/png"
      };

      return (await this.axiosInstance.post(
        `/message/sendMedia/${this.instance}`,
        { ...defaultConfig, ...mediaConfig }
      )).data;
    } catch (error) {
      this._handleError(error);
    }
  }

  async sendButtons(number, buttonsConfig = {}) {
    try {
      const defaultConfig = {
        number,
        title: "Title Button",
        description: "Description Button",
        footerText: "Footer Button",
        buttons: [
          {
            text: "Response 1",
            id: "1"
          },
          {
            text: "Response 2",
            id: "2"
          }
        ]
      };

      return (await this.axiosInstance.post(
        `/message/sendButtons/${this.instance}`,
        { ...defaultConfig, ...buttonsConfig }
      )).data;
    } catch (error) {
      this._handleError(error);
    }
  }

  async sendList(number, listConfig = {}) {
    try {
      const defaultConfig = {
        number,
        title: "List Title",
        description: "List description",
        buttonText: "Click Here",
        footerText: "footer list"
      };

      return (await this.axiosInstance.post(
        `/message/sendList/${this.instance}`,
        { ...defaultConfig, ...listConfig }
      )).data;
    } catch (error) {
      this._handleError(error);
    }
  }

  // Group Management
  async createGroup(groupConfig = {}) {
    try {
      const defaultConfig = {
        subject: "New Group",
        participants: []
      };

      return (await this.axiosInstance.post(
        `/group/create/${this.instance}`,
        { ...defaultConfig, ...groupConfig }
      )).data;
    } catch (error) {
      this._handleError(error);
    }
  }

  async updateGroupSubject(groupJid, subject) {
    try {
      return (await this.axiosInstance.post(
        `/group/updateGroupSubject/${this.instance}?groupJid=${groupJid}`,
        { subject }
      )).data;
    } catch (error) {
      this._handleError(error);
    }
  }

  async updateGroupDescription(groupJid, description) {
    try {
      return (await this.axiosInstance.post(
        `/group/updateGroupDescription/${this.instance}?groupJid=${groupJid}`,
        { description }
      )).data;
    } catch (error) {
      this._handleError(error);
    }
  }

  async fetchInviteCode(groupJid) {
    try {
      return (await this.axiosInstance.get(
        `/group/inviteCode/${this.instance}?groupJid=${groupJid}`
      )).data;
    } catch (error) {
      this._handleError(error);
    }
  }

  async revokeInviteCode(groupJid) {
    try {
      return (await this.axiosInstance.post(
        `/group/revokeInviteCode/${this.instance}?groupJid=${groupJid}`
      )).data;
    } catch (error) {
      this._handleError(error);
    }
  }

  // Chat Management
  async isWhatsAppNumber(numbers = []) {
    try {
      return (await this.axiosInstance.post(
        `/chat/whatsappNumbers/${this.instance}`,
        { numbers }
      )).data;
    } catch (error) {
      this._handleError(error);
    }
  }

  async findContacts(where = {}) {
    try {
      return (await this.axiosInstance.post(
        `/chat/findContacts/${this.instance}`,
        { where }
      )).data;
    } catch (error) {
      this._handleError(error);
    }
  }

  async findMessages(where = {}) {
    try {
      return (await this.axiosInstance.post(
        `/chat/findMessages/${this.instance}`,
        { where }
      )).data;
    } catch (error) {
      this._handleError(error);
    }
  }

  async findChats() {
    try {
      return (await this.axiosInstance.post(
        `/chat/findChats/${this.instance}`
      )).data;
    } catch (error) {
      this._handleError(error);
    }
  }

  async fetchProfilePicture(number) {
    try {
      return (await this.axiosInstance.post(
        `/chat/fetchProfilePictureUrl/${this.instance}`,
        { number }
      )).data;
    } catch (error) {
      this._handleError(error);
    }
  }

  // Integrations
  // Typebot Integration
  async createTypebot(typebotConfig = {}) {
    try {
      const defaultConfig = {
        enabled: true,
        url: "https://bot.example.com",
        typebot: "my-typebot",
        triggerType: "keyword",
        triggerOperator: "equals",
        triggerValue: "start",
        expire: 20,
        keywordFinish: "#SAIR",
        delayMessage: 1000
      };

      return (await this.axiosInstance.post(
        `/typebot/create/${this.instance}`,
        { ...defaultConfig, ...typebotConfig }
      )).data;
    } catch (error) {
      this._handleError(error);
    }
  }

  async findTypebots() {
    try {
      return (await this.axiosInstance.get(`/typebot/find/${this.instance}`)).data;
    } catch (error) {
      this._handleError(error);
    }
  }

  async fetchTypebot(typebotId) {
    try {
      return (await this.axiosInstance.get(`/typebot/fetch/${typebotId}/${this.instance}`)).data;
    } catch (error) {
      this._handleError(error);
    }
  }

  async startTypebot(typebotConfig = {}) {
    try {
      const defaultConfig = {
        remoteJid: "",
        startSession: false,
        variables: []
      };

      return (await this.axiosInstance.post(
        `/typebot/start/${this.instance}`,
        { ...defaultConfig, ...typebotConfig }
      )).data;
    } catch (error) {
      this._handleError(error);
    }
  }

  // OpenAI Integration
  async createOpenaiBot(openaiConfig = {}) {
    try {
      const defaultConfig = {
        enabled: true,
        openaiCredsId: "",
        botType: "assistant",
        triggerType: "keyword",
        triggerOperator: "equals",
        triggerValue: "ai",
        expire: 20
      };

      return (await this.axiosInstance.post(
        `/openai/create/${this.instance}`,
        { ...defaultConfig, ...openaiConfig }
      )).data;
    } catch (error) {
      this._handleError(error);
    }
  }

  async setOpenaiCreds(credsConfig = {}) {
    try {
      const defaultConfig = {
        name: "default",
        apiKey: ""
      };

      return (await this.axiosInstance.post(
        `/openai/creds/${this.instance}`,
        { ...defaultConfig, ...credsConfig }
      )).data;
    } catch (error) {
      this._handleError(error);
    }
  }

  // Helper methods
  _handleError(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      throw new Error(`Error ${error.response.status}: ${JSON.stringify(error.response.data)}`);
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error(`No response received: ${error.request}`);
    } else {
      // Something happened in setting up the request
      throw new Error(`Request error: ${error.message}`);
    }
  }
}

module.exports = EvolutionAPI;