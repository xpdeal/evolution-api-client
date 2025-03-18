import { EvolutionAPI } from '../evolution-api-client';
import { GroupConfig, GroupResponse, InviteCodeResponse, IConfig } from '../types';
import axios from 'axios';

export class GroupService extends EvolutionAPI {
  constructor(config: IConfig) {
    super(config);
  }

  async createGroup(config: GroupConfig): Promise<GroupResponse> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/group/create/${this.instance}`,
        config,
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

  async updateGroupPicture(groupJid: string, image: string): Promise<GroupResponse> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/group/updateGroupPicture/${this.instance}`,
        { groupJid, image },
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

  async updateGroupSubject(groupJid: string, subject: string): Promise<GroupResponse> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/group/updateGroupSubject/${this.instance}`,
        { groupJid, subject },
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

  async updateGroupDescription(groupJid: string, description: string): Promise<GroupResponse> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/group/updateGroupDescription/${this.instance}`,
        { groupJid, description },
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

  async addParticipants(groupJid: string, participants: string[]): Promise<GroupResponse> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/group/addParticipants/${this.instance}`,
        { groupJid, participants },
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

  async removeParticipants(groupJid: string, participants: string[]): Promise<GroupResponse> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/group/removeParticipants/${this.instance}`,
        { groupJid, participants },
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

  async promoteParticipants(groupJid: string, participants: string[]): Promise<GroupResponse> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/group/promoteParticipants/${this.instance}`,
        { groupJid, participants },
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

  async demoteParticipants(groupJid: string, participants: string[]): Promise<GroupResponse> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/group/demoteParticipants/${this.instance}`,
        { groupJid, participants },
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

  async getInviteCode(groupJid: string): Promise<InviteCodeResponse> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/group/getInviteCode/${this.instance}?id=${groupJid}`,
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

  async revokeInviteCode(groupJid: string): Promise<InviteCodeResponse> {
    try {
      const response = await axios.put(
        `${this.baseUrl}/group/revokeInviteCode/${this.instance}`,
        { groupJid },
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

  async getInfo(groupJid: string): Promise<GroupResponse> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/group/getInfo/${this.instance}?id=${groupJid}`,
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

  async leaveGroup(groupJid: string): Promise<GroupResponse> {
    try {
      const response = await axios.delete(
        `${this.baseUrl}/group/leaveGroup/${this.instance}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'apikey': this.globalApikey
          },
          data: { groupJid }
        }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
}
