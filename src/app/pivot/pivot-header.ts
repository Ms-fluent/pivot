import {Component, ContentChildren, ElementRef, EventEmitter, forwardRef, Output, QueryList, ViewChild} from '@angular/core';
import {MsPivotLabel} from './label/pivot-label';

@Component({
  template: `
      <ng-content></ng-content> <span class="ms-pivotActiveBorder" #pivotActiveBorder></span>`,
  selector: 'ms-pivot-header, msPivotHeader',

  host: {
    'class': 'ms-pivotHeader',
    'attr.role': 'tablist'
  }
})
export class MsPivotHeader {

  @Output()
  indexFocused: EventEmitter<number>;


  @Output()
  selectFocusedIndex: EventEmitter<number>;

  @ContentChildren(forwardRef(() => MsPivotLabel), {descendants: true})
  labels: QueryList<MsPivotLabel>;

  @ViewChild('pivotActiveBorder')
  activeBorder: ElementRef;

  get selectedIndex(): number {
    return undefined;
  }

  get focusIndex(): number {
    return undefined;
  }
}
