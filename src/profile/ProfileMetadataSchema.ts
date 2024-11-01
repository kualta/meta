import { z } from 'zod';

import { ProfileSchemaId } from './ProfileSchemaId.js';
import { MetadataAttribute, MetadataAttributeSchema } from '../MetadataAttribute.js';
import {
  AppId,
  AppIdSchema,
  Markdown,
  Signature,
  SignatureSchema,
  URI,
  NonEmptyStringSchema,
  UriSchema,
  MarkdownSchema,
} from '../primitives.js';

export type ProfileMetadataDetails = {
  /**
   * A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI. Use a UUID if unsure.
   */
  id: string;
  /**
   * The App Id that this Profile details are relevant for.
   *
   * If omitted the data is considered to be the global Profile data.
   */
  appId?: AppId;
  /**
   * The profile display name.
   */
  name?: string;
  /**
   * The profile bio as markdown.
   */
  bio?: Markdown;
  /**
   * The profile picture.
   */
  picture?: URI;
  /**
   * The profile cover picture.
   */
  coverPicture?: URI;
  /**
   * A bag of attributes that can be used to store any kind of metadata that is not currently supported by the standard.
   * Over time, common attributes will be added to the standard and their usage as arbitrary attributes will be discouraged.
   */
  attributes?: MetadataAttribute[];
};
/**
 * @internal
 */
const ProfileMetadataDetailsSchema: z.ZodType<ProfileMetadataDetails, z.ZodTypeDef, object> =
  z.object(
    {
      id: NonEmptyStringSchema.describe(
        'A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI. Use a UUID if unsure.',
      ),

      name: NonEmptyStringSchema.describe('The profile display name.').optional(),

      bio: MarkdownSchema.describe('The profile bio as markdown.').optional(),

      picture: UriSchema.describe('The profile picture.').optional(),

      coverPicture: UriSchema.describe('The profile cover picture.').optional(),

      attributes: MetadataAttributeSchema.array()
        .min(1)
        .optional()
        .describe(
          'A bag of attributes that can be used to store any kind of metadata that is not currently supported by the standard. ' +
            'Over time, common attributes will be added to the standard and their usage as arbitrary attributes will be discouraged.',
        ),

      appId: AppIdSchema.optional().describe(
        'The App Id that this Profile data refers to. ' +
          'If omitted the data is considered to be the global Profile data.',
      ),
    },
    { description: 'The Lens specific metadata details.' },
  );

/**
 * Use this to create Profile metadata objects.
 */
export type ProfileMetadata = {
  /**
   * The schema id.
   */
  $schema: ProfileSchemaId.LATEST;
  /**
   * The metadata details.
   */
  lens: ProfileMetadataDetails;
  /**
   * A cryptographic signature of the `lens` data.
   */
  signature?: Signature;
};

/**
 * Profile Metadata schema.
 *
 * @category Parse
 *
 * @example
 * with `parse`:
 * ```ts
 * ProfileMetadataSchema.parse(valid); // => ProfileMetadata
 *
 * ProfileMetadataSchema.parse(invalid); // => throws ZodError
 * ```
 *
 * @example
 * with `safeParse`:
 * ```ts
 * ProfileMetadataSchema.safeParse(valid);
 * // => { success: true, data: ProfileMetadata }
 *
 * ProfileMetadataSchema.safeParse(invalid);
 * // => { success: false, error: ZodError }
 * ```
 */
export const ProfileMetadataSchema: z.ZodType<ProfileMetadata, z.ZodTypeDef, object> = z.object({
  $schema: z.literal(ProfileSchemaId.LATEST),
  lens: ProfileMetadataDetailsSchema,
  signature: SignatureSchema.optional(),
});
