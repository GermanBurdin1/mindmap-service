import { DrillGridRow, DrillGridColumn, DrillGridCell, DrillGridSettings } from '../entities/drill-grid.entity';

export class CreateDrillGridDto {
  rows!: DrillGridRow[];
  columns!: DrillGridColumn[];
  cells!: DrillGridCell[];
  settings?: DrillGridSettings | null;
}

