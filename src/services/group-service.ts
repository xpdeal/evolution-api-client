import { GroupConfig, GroupResponse, InviteCodeResponse, IConfig } from '../types';
import { BaseService } from './base-service';
import axios from 'axios';

export class GroupService extends BaseService {
  constructor(config: IConfig) {
    super(config);
  }

  async createGroup(config: GroupConfig): Promise<GroupResponse> {
    try {
      const response = await this.axiosInstance.post(
        `/group/create/${this.instance}`,
        config
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateGroupPicture(groupJid: string, image: string): Promise<GroupResponse> {
    try {
      const response = await this.axiosInstance.post(
        `/group/updateGroupPicture/${this.instance}`,
        { groupJid, image }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateGroupSubject(groupJid: string, subject: string): Promise<GroupResponse> {
    try {
      const response = await this.axiosInstance.post(
        `/group/updateGroupSubject/${this.instance}`,
        { groupJid, subject }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateGroupDescription(groupId: string, description: string): Promise<GroupResponse> {
    try {
      const response = await this.axiosInstance.post(
        `/group/desc/${this.instance}`,
        { groupId, description }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async addParticipants(groupId: string, participants: string[]): Promise<GroupResponse> {
    try {
      const response = await this.axiosInstance.post(
        `/group/add/${this.instance}`,
        { groupId, participants }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async removeParticipants(groupId: string, participants: string[]): Promise<GroupResponse> {
    try {
      const response = await this.axiosInstance.post(
        `/group/remove/${this.instance}`,
        { groupId, participants }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async promoteParticipants(groupId: string, participants: string[]): Promise<GroupResponse> {
    try {
      const response = await this.axiosInstance.post(
        `/group/promote/${this.instance}`,
        { groupId, participants }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async demoteParticipants(groupId: string, participants: string[]): Promise<GroupResponse> {
    try {
      const response = await this.axiosInstance.post(
        `/group/demote/${this.instance}`,
        { groupId, participants }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async fetchInviteCode(groupId: string): Promise<InviteCodeResponse> {
    try {
      const response = await this.axiosInstance.get(
        `/group/invitecode/${this.instance}/${groupId}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async revokeInviteCode(groupId: string): Promise<InviteCodeResponse> {
    try {
      const response = await this.axiosInstance.delete(
        `/group/invitecode/${this.instance}/${groupId}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async leaveGroup(groupId: string): Promise<GroupResponse> {
    try {
      const response = await this.axiosInstance.post(
        `/group/leave/${this.instance}`,
        { groupId }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getInfo(groupJid: string): Promise<GroupResponse> {
    try {
      const response = await this.axiosInstance.get(
        `/group/getInfo/${this.instance}?id=${groupJid}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
}
