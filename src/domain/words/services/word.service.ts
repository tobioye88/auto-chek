import { HttpException, Injectable } from '@nestjs/common';
import { HackerNewsHelper } from '../../../helpers/hacker-news/hacker-news.helper';
import {
  IHackerNewsStory,
  IHackerNewsUser,
} from '../../../interfaces/hacker-new.interface';

@Injectable()
export class WordService {
  async getTopTenMostOccurringWordsInTitles(): Promise<[string, number][]> {
    try {
      const stories = await HackerNewsHelper.getLastStories(25);
      let titles = stories.map((story) => story.title);
      titles = titles.filter((title) => !!title);
      const wordMap = this.countWords(titles);

      const topTen = this.getTopTenWords(wordMap);
      // console.log({ wordMap, sortedWords });

      return Promise.resolve<[string, number][]>(topTen);
    } catch (e) {
      throw new HttpException(e.message, 500);
    }
  }

  private mapOfFrequentWords(map: Map<string, number>, words: string[]) {
    for (let word of words) {
      if (map.has(word)) {
        map.set(word, map.get(word) + 1);
      } else {
        map.set(word, 1);
      }
    }
  }

  private countWords(titles: string[]) {
    const wordMap = new Map<string, number>();

    titles.forEach((title) => {
      let cleanTitle = title
        .replace(/[^a-zA-Z0-9 ]/g, '')
        .replace(/\s{2,}/g, ' ');
      cleanTitle = cleanTitle.toLocaleLowerCase();
      // console.log('cleanTitle', cleanTitle);
      const words = cleanTitle.split(' ');
      this.mapOfFrequentWords(wordMap, words);
    });
    return wordMap;
  }

  private getTopTenWords(wordMap: Map<string, number>) {
    const sortedWords = [...wordMap.entries()].sort((a, b) => b[1] - a[1]);
    return sortedWords.splice(0, 10);
  }

  async getTopTenMostOccurringWordsInTitlesLastWeek(): Promise<string[]> {
    return Promise.resolve<string[]>([]);
  }

  async getTopTenMostOccurringWordsInTitlesLast600(): Promise<
    [string, number][]
  > {
    const stories = await HackerNewsHelper.getLastStories(600);
    const usersId = stories
      .filter((story) => !!story.by)
      .map((story) => story.by);
    const users = await HackerNewsHelper.getUsersByIds(usersId);
    const userMap = HackerNewsHelper.mapUsersByIds(users);

    const filteredStories = this.filterStoriesByUserKarma(stories, userMap);
    const titles = filteredStories
      .filter((story) => story.title)
      .map((story) => story.title);
    const wordMap = this.countWords(titles);
    const topTen = this.getTopTenWords(wordMap);

    return Promise.resolve<[string, number][]>(topTen);
  }

  private filterStoriesByUserKarma(
    stories: IHackerNewsStory[],
    usersMap: Map<string, IHackerNewsUser>,
  ): IHackerNewsStory[] {
    const filteredStories = stories.filter((story) => {
      const user = usersMap.get(story.by);
      return user && user.karma > 10_000;
    });
    return filteredStories;
  }
}
