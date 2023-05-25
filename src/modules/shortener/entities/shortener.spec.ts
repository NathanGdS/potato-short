import { getFakeUrl } from '@utils/getFakeUrl';
import { Shortener } from './shortener.entity';

describe('Shortener entity', () => {
  it('should be able to short an url', () => {
    const newUrl = String(getFakeUrl());
    const newShortenedUrl = Shortener.create(newUrl).toJson();

    expect(newShortenedUrl.id).toBeDefined();
    expect(newShortenedUrl.urlShortened).toBeDefined();
    expect(newShortenedUrl.createdAt).toBeDefined();
    expect(newShortenedUrl.updatedAt).toBeDefined();

    expect(newShortenedUrl.shouldPassAds).toStrictEqual(false);
    expect(newShortenedUrl.lastAccessDate).toStrictEqual(null);
    expect(newShortenedUrl.accesses).toStrictEqual(0);
    expect(newShortenedUrl.originalUrl).toStrictEqual(newUrl);
  });

  it('should be able to increase access value', () => {
    const newUrl = String(getFakeUrl());
    const newShortenedUrl = Shortener.create(newUrl);
    const lengthToIncrease = 3;

    for (let i = 0; i < lengthToIncrease; i++) {
      newShortenedUrl.increaseAccess();
    }

    const modifiedObject = newShortenedUrl.toJson();
    expect(modifiedObject.accesses).toStrictEqual(lengthToIncrease);
    expect(modifiedObject.lastAccessDate).toBeDefined();
  });

  it('should change the property shouldPassAds to true if the link was used 10 times or more', () => {
    const newUrl = String(getFakeUrl());
    const newShortenedUrl = Shortener.create(newUrl);
    const lengthToIncrease = 10;

    for (let i = 0; i < lengthToIncrease; i++) {
      newShortenedUrl.increaseAccess();
    }

    const modifiedObject = newShortenedUrl.toJson();
    expect(modifiedObject.accesses).toStrictEqual(lengthToIncrease);
    expect(modifiedObject.shouldPassAds).toStrictEqual(true);
  });
});
