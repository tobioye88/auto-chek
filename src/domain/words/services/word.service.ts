import { Injectable } from '@nestjs/common';

@Injectable()
export class WordService {
  async getTopTenMostOccurringWordsInTitles(): Promise<string[]> {
    return Promise.resolve<string[]>([]);
  }
  async getTopTenMostOccurringWordsInTitlesLastWeek(): Promise<string[]> {
    return Promise.resolve<string[]>([]);
  }
  async getTopTenMostOccurringWordsInTitlesLast600(): Promise<string[]> {
    return Promise.resolve<string[]>([]);
  }
}
