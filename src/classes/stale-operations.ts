import {Operations} from './operations';

const OPERATIONS_PER_RUN = 30;

export class StaleOperations extends Operations {
  hasRemainingOperations(): boolean {
    return this._operationsConsumed < OPERATIONS_PER_RUN;
  }

  getRemainingOperationsCount(): number {
    return OPERATIONS_PER_RUN - this._operationsConsumed;
  }
}
