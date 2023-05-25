import { ShortenerRepositoryAlias } from '@base/repositories/IShortenerRepository';
import { Test, TestingModule } from '@nestjs/testing';
import { NestjsProvider } from '@utils/createProvider';
import { ShortenerRepositoryInMemory } from './repositories/InMemory/ShortenerRepositoryInMemory';
import { ShortenerService } from './shortener.service';

describe('ShortenerService', () => {
  let service: ShortenerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShortenerService,
        NestjsProvider.provideTo(ShortenerRepositoryAlias).theClass(
          ShortenerRepositoryInMemory,
        ),
      ],
    }).compile();

    service = module.get<ShortenerService>(ShortenerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
