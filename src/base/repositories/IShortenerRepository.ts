import { ShortenerProps } from '@modules/shortener/entities/shortener.entity';
import { registerAccessType } from '@modules/shortener/types/shortener.types';

export interface IShortenerRepository {
  create(url: string): Promise<string>;
  findByOriginalUrl(url: string): Promise<ShortenerProps>;
  findAllByUrl(url: string): Promise<ShortenerProps[]>;
  findByShortedCode(shortedCode: string): Promise<ShortenerProps>;
  registerAccess(data: registerAccessType): Promise<void>;
}

export const ShortenerRepositoryAlias = Symbol('IShortenerRepository');
