import { createId } from '@paralleldrive/cuid2';

export function getShortener() {
  return createId();
}
