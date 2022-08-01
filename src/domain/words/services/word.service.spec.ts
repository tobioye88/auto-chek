import { Test, TestingModule } from '@nestjs/testing';
import { WordService } from './word.service';

describe('WordService', () => {
  let wordService: WordService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [WordService],
    }).compile();

    wordService = app.get<WordService>(WordService);
  });

  describe('root', () => {
    it('should test getTopTenMostOccurringWordsInTitles', async () => {
      expect(
        await wordService.getTopTenMostOccurringWordsInTitles(),
      ).toStrictEqual<any[]>([]);
    });
  });

  describe('root', () => {
    it('should test getTopTenMostOccurringWordsInTitlesLastWeek', async () => {
      expect(
        await wordService.getTopTenMostOccurringWordsInTitlesLastWeek(),
      ).toStrictEqual<any[]>([]);
    });
  });

  describe('root', () => {
    it('should test getTopTenMostOccurringWordsInTitlesLast600', async () => {
      expect(
        await wordService.getTopTenMostOccurringWordsInTitlesLast600(),
      ).toStrictEqual<any[]>([]);
    });
  });
});
