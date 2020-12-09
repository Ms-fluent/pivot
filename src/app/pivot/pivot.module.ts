import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MsPivotLabel} from './label/pivot-label';
import {MsPivot} from './pivot';
import {MsPivotBody} from './pivot-body';
import {MsPivotContent, MsPivotContentDef} from './pivot-content';
import {MsPivotHeader} from './pivot-header';

@NgModule({
  imports: [CommonModule],
  declarations: [MsPivotLabel, MsPivot, MsPivotBody, MsPivotContentDef, MsPivotHeader, MsPivotContent],
  exports: [MsPivotLabel, MsPivot, MsPivotBody, MsPivotContentDef, MsPivotHeader, MsPivotContent]
})
export class MsPivotModule {
}
