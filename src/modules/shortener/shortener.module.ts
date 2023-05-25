import { Module } from '@nestjs/common';
import { ShortenerRepositoryAlias } from 'base/repositories/IShortenerRepository';
import { NestjsProvider } from 'utils/createProvider';
import { ShortenerRepositoryInMemory } from './repositories/InMemory/ShortenerRepositoryInMemory';
import { ShortenerController } from './shortener.controller';
import { ShortenerService } from './shortener.service';

@Module({
  controllers: [ShortenerController],
  providers: [
    ShortenerService,
    NestjsProvider.provide(ShortenerRepositoryAlias).useClass(
      ShortenerRepositoryInMemory,
    ),
  ],
})
export class ShortenerModule {}
