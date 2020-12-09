import {MsPivotLabel} from './label/pivot-label';
import {MsPivotContentDef} from './pivot-content';

export class MsPivotItem {
  constructor(public label: MsPivotLabel, public content: MsPivotContentDef) {
  }
}
