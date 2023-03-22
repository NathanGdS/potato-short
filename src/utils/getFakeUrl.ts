import { faker } from '@faker-js/faker';
import * as url from 'node:url';

export function getFakeUrl(): url.UrlWithStringQuery {
  return url.parse(faker.internet.url());
}
