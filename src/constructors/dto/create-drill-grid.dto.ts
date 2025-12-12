import { DrillGridRow, DrillGridColumn, DrillGridCell, DrillGridSettings, DrillGridPurpose } from '../entities/drill-grid.entity';

export class CreateDrillGridDto {
  rows!: DrillGridRow[];
  columns!: DrillGridColumn[];
  cells!: DrillGridCell[];
  settings?: DrillGridSettings | null;
  purpose?: DrillGridPurpose;
  studentUserId?: string | null;
  originalId?: string | null;
}

