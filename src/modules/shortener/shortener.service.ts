import { Inject, Injectable } from '@nestjs/common';
import {
  IShortenerRepository,
  ShortenerRepositoryAlias,
} from 'base/repositories/IShortenerRepository';
import { z } from 'zod';
import { CreateShortenerDto } from './dto/create-shortener.dto';
import { Shortener } from './entities/shortener.entity';
import { InvalidShortenerCodeException } from './errors/InvalidShortenerCodeException';

@Injectable()
export class ShortenerService {
  constructor(
    @Inject(ShortenerRepositoryAlias)
    private readonly _repository: IShortenerRepository,
  ) {}

  async create({ url }: CreateShortenerDto) {
    const schema = z.string().url();

    schema.parse(url);

    const shortedCode = await this._repository.create(url);
    return await this._repository.findByShortedCode(shortedCode);
  }

  async findAllByUrl({ url }: CreateShortenerDto) {
    return await this._repository.findAllByUrl(url);
  }

  async findOriginalUrlByCode(code: string) {
    const getShorted = await this._repository.findByShortedCode(code);
    if (!getShorted) {
      throw new InvalidShortenerCodeException();
    }

    const shortener = Shortener.create(null, getShorted);
    shortener.increaseAccess();
    const props = shortener.toJson();

    await this._repository.registerAccess({
      id: props.id,
      accessDate: props.lastAccessDate,
      accesses: props.accesses,
      shouldPassAds: props.shouldPassAds,
    });

    return {
      url: props.originalUrl,
      accesses: props.accesses,
      shouldPassAds: props.shouldPassAds,
    };
  }
}
