import { Controller, Get } from '@nestjs/common';
import {
  IResponseHelper,
  ResponseHelper,
} from '../../../helpers/response.helper';
import { WordService } from '../services/word.service';

@Controller('/v1/words')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Get('top-10/in-titles-last')
  async getTopTenMostOccurringWordsInTitles(): Promise<
    IResponseHelper<string[]>
  > {
    const result = await this.wordService.getTopTenMostOccurringWordsInTitles();
    return ResponseHelper.success(
      result,
      'Top 10 most occurring words in the titles of the last 25 stories',
    );
  }

  @Get('top-10/in-titles-last-week')
  async getTopTenMostOccurringWordsInTitlesLastWeek(): Promise<
    IResponseHelper<string[]>
  > {
    const result =
      await this.wordService.getTopTenMostOccurringWordsInTitlesLastWeek();
    return ResponseHelper.success(
      result,
      'Top 10 most occurring words in the titles of the post of exactly the last week',
    );
  }

  @Get('top-10/in-titles-last-600')
  async getTopTenMostOccurringWordsInTitlesLast600(): Promise<
    IResponseHelper<string[]>
  > {
    const result =
      await this.wordService.getTopTenMostOccurringWordsInTitlesLast600();
    return ResponseHelper.success(
      result,
      'Top 10 most occurring words in titles of the last 600 stories of users with at least 10,000 karma',
    );
  }
}
