import { Test, TestingModule } from '@nestjs/testing';
import { mockStories, mockTestUsers } from '../../../../test/test.stubs';
import { HackerNewsHelper } from '../../../helpers/hacker-news/hacker-news.helper';
import { WordService } from './word.service';

describe('WordService', () => {
  let wordService: WordService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [WordService],
    }).compile();

    wordService = app.get<WordService>(WordService);
  });

  it('should test getTopTenMostOccurringWordsInTitles', async () => {
    jest
      .spyOn(HackerNewsHelper, 'getLastStories')
      .mockResolvedValue(Promise.resolve(mockStories));

    expect(
      await wordService.getTopTenMostOccurringWordsInTitles(),
    ).toStrictEqual<any[]>([
      ['pytorch', 1],
      ['design', 1],
      ['philosophy', 1],
      ['2021', 1],
      ['taxes', 1],
      ['opensource', 1],
      ['edition', 1],
      ['you', 1],
      ['cant', 1],
      ['simply', 1],
    ]);
  });

  it('should test getTopTenMostOccurringWordsInTitles to return empty list', async () => {
    jest
      .spyOn(HackerNewsHelper, 'getLastStories')
      .mockRejectedValue({ message: 'Some server Error' });
    expect.assertions(1);

    try {
      await wordService.getTopTenMostOccurringWordsInTitles();
    } catch (e) {
      expect(e.message).toBe('Some server Error');
    }
  });

  it('should test getTopTenMostOccurringWordsInTitlesLastWeek', async () => {
    expect(
      await wordService.getTopTenMostOccurringWordsInTitlesLastWeek(),
    ).toStrictEqual<any[]>([]);
  });

  it('should test getTopTenMostOccurringWordsInTitlesLast600', async () => {
    jest
      .spyOn(HackerNewsHelper, 'getLastStories')
      .mockResolvedValue(Promise.resolve(mockStories));
    jest
      .spyOn(HackerNewsHelper, 'getUsersByIds')
      .mockResolvedValue(Promise.resolve(mockTestUsers));
    expect(
      await wordService.getTopTenMostOccurringWordsInTitlesLast600(),
    ).toStrictEqual<any[]>([
      ['pytorch', 1],
      ['design', 1],
      ['philosophy', 1],
    ]);
  });
});
