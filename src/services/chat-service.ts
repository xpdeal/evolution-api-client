import { EvolutionAPI } from '../evolution-api-client';
import { IConfig, ChatResponse, MessageHistoryResponse } from '../types';
import axios from 'axios';

export class ChatService extends EvolutionAPI {
  constructor(config: IConfig) {
    super(config);
  }

  async findChat(chatId: string): Promise<ChatResponse> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/chat/findChat/${this.instance}?id=${chatId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'apikey': this.globalApikey
          }
        }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async fetchAllChats(): Promise<ChatResponse[]> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/chat/fetchAllChats/${this.instance}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'apikey': this.globalApikey
          }
        }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async fetchPrivateChats(): Promise<ChatResponse[]> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/chat/fetchPrivateChats/${this.instance}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'apikey': this.globalApikey
          }
        }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async fetchGroupChats(): Promise<ChatResponse[]> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/chat/fetchGroupChats/${this.instance}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'apikey': this.globalApikey
          }
        }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async fetchMessages(chatId: string, count?: number): Promise<MessageHistoryResponse> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/chat/fetchMessages/${this.instance}`,
        {
          params: {
            id: chatId,
            count
          },
          headers: {
            'Content-Type': 'application/json',
            'apikey': this.globalApikey
          }
        }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async markMessageAsRead(messageId: string): Promise<void> {
    try {
      await axios.post(
        `${this.baseUrl}/chat/markMessageAsRead/${this.instance}`,
        { messageId },
        {
          headers: {
            'Content-Type': 'application/json',
            'apikey': this.globalApikey
          }
        }
      );
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async archiveChat(chatId: string): Promise<void> {
    try {
      await axios.post(
        `${this.baseUrl}/chat/archiveChat/${this.instance}`,
        { chatId },
        {
          headers: {
            'Content-Type': 'application/json',
            'apikey': this.globalApikey
          }
        }
      );
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async unarchiveChat(chatId: string): Promise<void> {
    try {
      await axios.post(
        `${this.baseUrl}/chat/unarchiveChat/${this.instance}`,
        { chatId },
        {
          headers: {
            'Content-Type': 'application/json',
            'apikey': this.globalApikey
          }
        }
      );
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async deleteChat(chatId: string): Promise<void> {
    try {
      await axios.delete(
        `${this.baseUrl}/chat/deleteChat/${this.instance}`,
        {
          data: { chatId },
          headers: {
            'Content-Type': 'application/json',
            'apikey': this.globalApikey
          }
        }
      );
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async deleteMessage(messageId: string): Promise<void> {
    try {
      await axios.delete(
        `${this.baseUrl}/chat/deleteMessage/${this.instance}`,
        {
          data: { messageId },
          headers: {
            'Content-Type': 'application/json',
            'apikey': this.globalApikey
          }
        }
      );
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async clearChat(chatId: string): Promise<void> {
    try {
      await axios.post(
        `${this.baseUrl}/chat/clearChat/${this.instance}`,
        { chatId },
        {
          headers: {
            'Content-Type': 'application/json',
            'apikey': this.globalApikey
          }
        }
      );
    } catch (error) {
      throw this.handleError(error);
    }
  }
}
