import { z } from 'zod';

/**
 * The main focus of a publication.
 */
export enum PublicationMainFocus {
  VIDEO = 'VIDEO',
  IMAGE = 'IMAGE',
  ARTICLE = 'ARTICLE',
  TEXT_ONLY = 'TEXT_ONLY',
  AUDIO = 'AUDIO',
  LINK = 'LINK',
  EMBED = 'EMBED',
  CHECKING_IN = 'CHECKING_IN',
  EVENT = 'EVENT',
  MINT = 'MINT',
  TRANSACTION = 'TRANSACTION',
  LIVESTREAM = 'LIVESTREAM',
  SHORT_VIDEO = 'SHORT_VIDEO',
  THREE_D = '3D',
  STORY = 'STORY',
  SPACE = 'SPACE',
}

export const PublicationMainFocusSchema = z.nativeEnum(PublicationMainFocus);
