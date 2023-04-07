import { Module } from '@nestjs/common';
import { ShortenerRepositoryAlias } from 'base/repositories/IShortenerRepository';
import { ShortenerRepositoryInMemory } from './repositories/InMemory/ShortenerRepositoryInMemory';
import { ShortenerController } from './shortener.controller';
import { ShortenerService } from './shortener.service';

@Module({
  controllers: [ShortenerController],
  providers: [
    ShortenerService,
    {
      provide: ShortenerRepositoryAlias,
      useClass: ShortenerRepositoryInMemory,
    },
  ],
})
export class ShortenerModule {}
