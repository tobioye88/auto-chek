import { Module } from '@nestjs/common';
import { WordController } from './controllers/word.controller';
import { WordService } from './services/word.service';

@Module({
  providers: [WordService],
  controllers: [WordController],
})
export class WordModule {}
