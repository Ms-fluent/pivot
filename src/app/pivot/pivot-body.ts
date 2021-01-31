import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef, HostListener,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import {MsPivotContentDef} from './pivot-content';
import {MsPivot} from './pivot';

@Component({
  templateUrl: 'pivot-body.html',
  selector: 'ms-pivotBody, msPivotBody',
  host: {
    'class': 'ms-pivotBody',
    'attr.role': ' tabpanel'
  }
})
export class MsPivotBody implements AfterContentInit, AfterViewInit {

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

  constructor(private _elementRef: ElementRef<HTMLElement>,
              private _pivot: MsPivot) {
  }

  ngAfterContentInit(): void {
  }

  ngAfterViewInit(): void {
    this.flexLayout.nativeElement.style.width = `${this.width * this.containers.length}px`;
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
    return this._elementRef.nativeElement.offsetWidth;
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
