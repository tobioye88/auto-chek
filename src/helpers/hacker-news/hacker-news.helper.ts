import { IHackerNewsStory } from '../../interfaces/hacker-new.interface';
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

  static async getLastStroyId(): Promise<number> {
    const httpClient = new HttpClient(HackerNewsHelper.BASE_URL);
    return httpClient.get<number>('/v0/maxitem.json?print=pretty');
  }

  static async getStoryById(id: number): Promise<IHackerNewsStory> {
    const httpClient = new HttpClient(HackerNewsHelper.BASE_URL);
    return httpClient.get<IHackerNewsStory>(`/v0/item/${id}.json?print=pretty`);
  }
}
