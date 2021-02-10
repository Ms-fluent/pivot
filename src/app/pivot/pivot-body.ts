import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef, HostListener, OnDestroy,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import {MsPivotContentDef} from './pivot-content';
import {MsPivot} from './pivot';
import ResizeObserver from 'resize-observer-polyfill';

@Component({
  templateUrl: 'pivot-body.html',
  selector: 'ms-pivotBody, msPivotBody',
  host: {
    'class': 'ms-pivotBody',
    'attr.role': ' tabpanel'
  }
})
export class MsPivotBody implements AfterContentInit, AfterViewInit, OnDestroy {

  /** Event emitted when the body animation has completed. */
  @Output()
  animationDone: EventEmitter<void>;

  @ContentChildren(forwardRef(() => MsPivotContentDef))
  contents: QueryList<MsPivotContentDef>;

  @ViewChildren('element', {read: ViewContainerRef})
  containers: QueryList<ViewContainerRef>;

  @ViewChild('layout')
  flexLayout: ElementRef<HTMLDivElement>;

  private _translateX: number = 0;

  private _resizeObserver = new ResizeObserver(entries => {
    const width = (entries[0].target as HTMLElement).offsetWidth;
    this.flexLayout.nativeElement.style.width = `${width * this.containers.length}px`;
  });

  constructor(private _elementRef: ElementRef<HTMLElement>,
              private _pivot: MsPivot) {
  }

  ngAfterContentInit(): void {
  }

  ngAfterViewInit(): void {
    // this.flexLayout.nativeElement.style.width = `${this.width * this.containers.length}px`;

    this._resizeObserver.observe(this.host);
  }

  ngOnDestroy(): void {
    this._resizeObserver.disconnect();
  }

  moveAt(index: number, duration: number = 200) {
    const position = -this.width * index;
    this.flexLayout.nativeElement.animate([
      {transform: `translateX(${this._translateX}px)`, opacity: 0},
      {transform: `translateX(${position}px)`, opacity: 1},
    ], {fill: 'both', easing: 'ease-in-out', duration});
    this._translateX = position;
  }

  get width(): number {
    return this.host.offsetWidth;
  }

  get host(): HTMLElement {
    return this._elementRef.nativeElement;
  }

  @HostListener('swipeleft')
  onswipeleft() {
    if (this._pivot.hasNext()) {
      this._pivot.selectNext();
    }
  }

  @HostListener('swiperight')
  swiperight() {
    if (this._pivot.hasPrev()) {
      this._pivot.selectPrev();
    }
  }
}
