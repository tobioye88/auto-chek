import { HttpException, Injectable } from '@nestjs/common';
import { HackerNewsHelper } from '../../../helpers/hacker-news/hacker-news.helper';

@Injectable()
export class WordService {
  async getTopTenMostOccurringWordsInTitles(): Promise<[string, number][]> {
    try {
      const stories = await HackerNewsHelper.getLastStories(25);
      let titles = stories.map((story) => story.title);
      titles = titles.filter((title) => !!title);
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

      const sortedWords = [...wordMap.entries()].sort((a, b) => b[1] - a[1]);
      const topTen = sortedWords.splice(0, 10);
      // console.log({ wordMap, sortedWords });

      return Promise.resolve<[string, number][]>(topTen);
    } catch (e) {
      throw new HttpException(e.message, 500);
    }
  }

  mapOfFrequentWords(map: Map<string, number>, words: string[]) {
    for (let word of words) {
      if (map.has(word)) {
        map.set(word, map.get(word) + 1);
      } else {
        map.set(word, 1);
      }
    }
  }

  async getTopTenMostOccurringWordsInTitlesLastWeek(): Promise<string[]> {
    return Promise.resolve<string[]>([]);
  }

  async getTopTenMostOccurringWordsInTitlesLast600(): Promise<string[]> {
    return Promise.resolve<string[]>([]);
  }
}
