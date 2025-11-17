import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Mindmap } from './mindmap.entity';

@Entity()
export class MindmapNode {
	@PrimaryColumn('uuid')
	id!: string;

	@Column()
	title!: string;

	@Column({ type: 'uuid', nullable: true })
	parentId!: string | null;

	@Column({ type: 'jsonb', nullable: true })
	position!: { x: number; y: number };

	@Column({ nullable: true })
	side!: 'left' | 'right';

	@Column({ default: true })
	expanded!: boolean;

	@Column({ type: 'text', nullable: true })
	rule!: string;

	@Column({ type: 'text', nullable: true })
	exception!: string;

	@Column({ type: 'text', nullable: true })
	example!: string;

	@Column({ type: 'float', nullable: true })
x!: number;

	@Column({ type: 'float', nullable: true })
y!: number;

	@Column({ type: 'uuid' })
	userId!: string;

	@Column({ type: 'uuid', nullable: true })
	mindmapId!: string | null;

	@ManyToOne(() => Mindmap, (mindmap) => mindmap.nodes, { onDelete: 'CASCADE' })
	mindmap!: Mindmap;

}
