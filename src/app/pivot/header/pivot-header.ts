import {
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  Output,
  QueryList,
  ViewChild
} from '@angular/core';
import {MsPivotLabel} from '../label/pivot-label';
import {MsPivotActiveBorder} from '../pivot-active-border';

@Component({
  templateUrl: `pivot-header.html`,
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

  layoutScroll = new EventEmitter<Event>();

  @ContentChildren(forwardRef(() => MsPivotLabel), {descendants: true})
  labels: QueryList<MsPivotLabel>;

  @ViewChild(MsPivotActiveBorder)
  activeBorder: MsPivotActiveBorder;

  @ViewChild('layout')
  private _layout: ElementRef<HTMLDivElement>;

  onLayoutScroll(event: Event) {
    this.layoutScroll.emit(event);
    this.activeBorder.update();
  }

  get selectedIndex(): number {
    return undefined;
  }

  get focusIndex(): number {
    return undefined;
  }

  get layoutHost(): HTMLDivElement {
    return this._layout.nativeElement;
  }
}
