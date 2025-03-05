import { v4 } from 'uuid';

import { type FeedMetadata, FeedMetadataSchema, FeedMetadataSchemaId } from '../feed';
import { evaluate } from './ValidationError';

export type FeedOptions = {
  /**
   * A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI.
   *
   * @defaultValue a UUID
   */
  id?: string;
  /**
   * The name of the Feed.
   */
  name: string;
  /**
   * Optional markdown formatted description of the Feed.
   */
  description?: string;
};

/**
 * Creates a valid FeedMetadata.
 *
 * ```ts
 * const metadata = feed({
 *   name: 'XYZ',
 *   description: 'Bringing you one step closer to achieving absolutely nothing, but in style!',
 * });
 * ```
 *
 * @category Compose
 * @param input - Use your IDE suggestions for an enhanced development experience
 */
export function feed({ id = v4(), ...others }: FeedOptions): FeedMetadata {
  return evaluate(
    FeedMetadataSchema.safeParse({
      $schema: FeedMetadataSchemaId.LATEST,
      lens: {
        id,
        ...others,
      },
    }),
  );
}
