import { randomUUID } from 'crypto';
import { getShortener } from '../../utils/getShortener';

export type ShortenerProps = {
  id?: string;
  originalUrl: string;
  urlShortened?: string;
  accesses?: number;
  shouldPassAds?: boolean;
  lastAccessDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Shortener {
  private constructor(private props: ShortenerProps) {
    this.props = {
      id: props.id ?? randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      accesses: 0,
      lastAccessDate: null,
      shouldPassAds: false,
      originalUrl: props.originalUrl,
      urlShortened: getShortener(),
    };
  }

  static create(urlToShort: string) {
    return new Shortener({
      originalUrl: urlToShort,
    });
  }

  increaseAccess() {
    this.props.accesses++;
    this.props.lastAccessDate = new Date();
    if (this.props.accesses >= 10) {
      this.props.shouldPassAds = true;
      this.props.updatedAt = new Date();
    }
  }

  toJson() {
    return this.props;
  }
}
