import { FlowchartNode, FlowchartEdge, FlowchartSettings } from '../entities/flowchart.entity';

export class CreateFlowchartDto {
  nodes!: FlowchartNode[];
  edges!: FlowchartEdge[];
  startNodeId!: string;
  settings?: FlowchartSettings | null;
}

