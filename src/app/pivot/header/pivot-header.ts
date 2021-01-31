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
  private activeBorder: MsPivotActiveBorder;

  @ViewChild('layout')
  private _layout: ElementRef<HTMLDivElement>;

  async selectLabel(label: MsPivotLabel): Promise<void> {
    await this.activeBorder.move(label).then();
    const labelRect = label.host.getBoundingClientRect();
    const layoutRect = this.layoutHost.getBoundingClientRect();
    if (labelRect.right > layoutRect.right) {
      const scrollLeft = (labelRect.right - layoutRect.right);
      this.layoutHost.scrollBy({left: scrollLeft, behavior: 'smooth'});
    } else if (labelRect.left < layoutRect.left) {
      const scrollRight = (labelRect.left - layoutRect.left);
      this.layoutHost.scrollBy({left: scrollRight, behavior: 'smooth'});
    }
    return Promise.resolve();
  }

  onLayoutScroll(event: Event) {
    console.log('scrool');
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
