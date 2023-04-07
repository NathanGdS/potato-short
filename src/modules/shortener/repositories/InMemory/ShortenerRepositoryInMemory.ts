import {
  Shortener,
  ShortenerProps,
} from '@modules/shortener/entities/shortener.entity';
import { registerAccessType } from '@modules/shortener/types/shortener.types';
import { IShortenerRepository } from 'base/repositories/IShortenerRepository';

export class ShortenerRepositoryInMemory implements IShortenerRepository {
  short: ShortenerProps[] = [];

  async create(url: string): Promise<string> {
    const shortener = Shortener.create(url).toJson();
    this.short.push(shortener);
    return shortener.urlShortened;
  }

  async findByOriginalUrl(url: string): Promise<ShortenerProps> {
    return this.short.find((s) => s.originalUrl === url);
  }

  async findAllByUrl(url: string): Promise<ShortenerProps[]> {
    return this.short.filter((s) => s.originalUrl === url);
  }

  async findByShortedCode(shortedCode: string): Promise<ShortenerProps> {
    return this.short.find((s) => s.urlShortened == shortedCode);
  }

  async registerAccess({
    accessDate,
    accesses,
    id,
    shouldPassAds,
  }: registerAccessType): Promise<void> {
    const findIndex = this.short.findIndex((s) => s.id == id);
    this.short[findIndex].accesses = accesses;
    this.short[findIndex].lastAccessDate = accessDate;
    this.short[findIndex].shouldPassAds = shouldPassAds;
    this.short[findIndex].lastAccessDate = accessDate;
    this.short[findIndex].updatedAt = accessDate;
  }
}
