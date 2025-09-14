export type ContentField = 'rule' | 'exception' | 'example' | 'exercise';

export class UpdateContentDto {
  type!: ContentField;
  content!: string;
}
