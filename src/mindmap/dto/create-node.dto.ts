export class CreateNodeDto {
  id!: string;
  title!: string;
  parentId!: string | null;
  position!: { x: number; y: number };
  side!: 'left' | 'right';
  expanded!: boolean;
  rule?: string;
  exception?: string;
  example?: string;
  exercise?: string;
}
