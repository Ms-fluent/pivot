import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import {MsPivotContentDef} from './pivot-content';
import {ActivatedRoute} from '@angular/router';

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

  constructor(private _elementRef: ElementRef<HTMLElement>) {
  }

  ngAfterContentInit(): void {
  }

  ngAfterViewInit(): void {
     this.flexLayout.nativeElement.style.width = `${this.width * this.containers.length}px`;
  }

  private _left: number = 0;
  moveAt(index: number, duration: number = 200) {
    const position =  -this.width * index;
    this.flexLayout.nativeElement.animate([
      {transform: `translateX(${this._left}px)`},
      {transform: `translateX(${position}px)`},
    ], {fill: 'both', easing: 'ease-in-out', duration });
    this._left = position;
  }

  get width(): number {
    return this._elementRef.nativeElement.offsetWidth;
  }

  get host(): HTMLElement {
    return this._elementRef.nativeElement;
  }
}
