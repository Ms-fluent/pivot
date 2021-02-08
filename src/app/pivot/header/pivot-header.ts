import {
  AfterContentInit,
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
export class MsPivotHeader implements AfterContentInit {

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

  private _activateLabel: MsPivotLabel;

  ngAfterContentInit(): void {
    this.labels.forEach(label => {
      label.mouseenter.subscribe(() => {
          if (label.isActive) {
            this.activeBorder.move(label, true);
          }
        }
      );

      label.mouseout.subscribe(() => {
          if (label.isActive) {
            this.activeBorder.move(label, false);
          }
        }
      );
    });
  }

  async selectLabel(label: MsPivotLabel, clickEvent: boolean): Promise<void> {
    if (this._activateLabel) {
      this._activateLabel._isActive = false;
    }

    this._activateLabel = label;
    label._isActive = true;
    this.activeBorder.move(label, clickEvent).then();
    const labelRect = label.host.getBoundingClientRect();
    const layoutRect = this.layoutHost.getBoundingClientRect();
    if (labelRect.right > layoutRect.right) {
      const scrollLeft = (labelRect.right - layoutRect.right) + 50;
      this.layoutHost.scrollBy({left: scrollLeft, behavior: 'smooth'});
    } else if (labelRect.left < layoutRect.left) {
      const scrollRight = (labelRect.left - layoutRect.left) - 50;
      this.layoutHost.scrollBy({left: scrollRight, behavior: 'smooth'});
    }
    return Promise.resolve();
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
