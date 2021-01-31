import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MsPivotLabel} from './label/pivot-label';
import {MsPivot} from './pivot';
import {MsPivotBody} from './pivot-body';
import {MsPivotContent, MsPivotContentDef} from './pivot-content';
import {MsPivotHeader} from './header/pivot-header';
import {MsPivotActiveBorder} from './pivot-active-border';

@NgModule({
  imports: [CommonModule],
  declarations: [MsPivotLabel, MsPivot, MsPivotBody, MsPivotContentDef, MsPivotHeader, MsPivotContent, MsPivotActiveBorder],
  exports: [MsPivotLabel, MsPivot, MsPivotBody, MsPivotContentDef, MsPivotHeader, MsPivotContent, MsPivotActiveBorder],
  entryComponents: [MsPivotContent]
})
export class MsPivotModule {
}
