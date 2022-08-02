import {
  IHackerNewsStory,
  IHackerNewsUser,
} from '../../interfaces/hacker-new.interface';
import { HttpClient } from '../client/http.client';

export class HackerNewsHelper {
  static BASE_URL = 'https://hacker-news.firebaseio.com';

  static async getLastStories(number: number): Promise<IHackerNewsStory[]> {
    try {
      const lastStoryId = await HackerNewsHelper.getLastStroyId();
      // console.log(lastStoryId);
      const allPromises = [];
      for (let i = lastStoryId; i > lastStoryId - number; i--) {
        allPromises.push(HackerNewsHelper.getStoryById(i));
      }
      return await Promise.all<IHackerNewsStory[]>(allPromises);
    } catch (e) {
      console.log(e.message, e);
      return [];
    }
  }

  private static async getLastStroyId(): Promise<number> {
    const httpClient = new HttpClient(HackerNewsHelper.BASE_URL);
    return httpClient.get<number>('/v0/maxitem.json?print=pretty');
  }

  private static async getStoryById(id: number): Promise<IHackerNewsStory> {
    const httpClient = new HttpClient(HackerNewsHelper.BASE_URL);
    return httpClient.get<IHackerNewsStory>(`/v0/item/${id}.json?print=pretty`);
  }

  static async getUsersByIds(ids: string[]): Promise<IHackerNewsUser[]> {
    const uniqueSet = new Set(ids);
    const uniqueIds = Array.from(uniqueSet).filter((id) => !!id);
    const allPromises = [];
    for (let i = 0; i < uniqueIds.length; i++) {
      allPromises.push(HackerNewsHelper.getUserById(uniqueIds[i]));
    }
    return await Promise.all<IHackerNewsUser[]>(allPromises);
  }

  private static async getUserById(id: string): Promise<IHackerNewsStory> {
    const httpClient = new HttpClient(HackerNewsHelper.BASE_URL);
    return httpClient.get<IHackerNewsStory>(`/v0/user/${id}.json?print=pretty`);
  }

  static mapUsersByIds(users: IHackerNewsUser[]): Map<string, IHackerNewsUser> {
    const map = new Map<string, IHackerNewsUser>();
    for (let user of users) {
      map.set(user.id, user);
    }
    return map;
  }
}
