import { BreakpointState } from '@angular/cdk/layout';
import { pipe } from 'rxjs';
import { filter, mapTo } from 'rxjs/operators';

export const mapToColumn = (columns: number) => pipe(
  filter((result: BreakpointState) => result.matches),
  mapTo(columns)
);
