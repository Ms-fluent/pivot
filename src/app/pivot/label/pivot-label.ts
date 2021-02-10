import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {MsPivotContent} from '../pivot-content';

let _uniqueId = 0;

@Component({
  templateUrl: 'pivot-label.html',
  selector: 'ms-pivotLabel, msPivotLabel',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'ms-pivotLabel',
    '[class.ms-active]': 'isActive',
    '[attr.tabindex]': 'tabindex',
    '[attr.aria-selected]': 'isActive',
    '[attr.aria-label]': 'ariaLabel',
    '[attr.aria-labelledby]': 'ariaLabelledby'
  }
})
export class MsPivotLabel {
  _uniqueId = `ms-pivotLabel-${_uniqueId++}`;
  _index: number;

  _contentRef: ComponentRef<MsPivotContent>;

  @Input()
  icon: string;

  @Input()
  secondaryIcon: string;

  /** Aria label for the tab. */
  @Input('aria-label')
  ariaLabel: string;

  /**
   * Reference to the element that the tab is labelled by. Will be cleared if aria-label is set at the same time.
   */
  @Input('aria-labelledby')
  ariaLabelledby: string;


  get tabindex(): number {
    if (this._isActive) {
      return -1;
    }
    return 0;
  }


  /** Whether the component is disabled. */
  @Input()
  disabled: boolean;

  click = new EventEmitter<MouseEvent>();
  mouseenter = new EventEmitter<MouseEvent>();
  mouseout = new EventEmitter<MouseEvent>();
  mouseover = new EventEmitter<MouseEvent>();

  get isHover(): boolean {
    return this._isHover;
  }

  private _isHover: boolean = false;

  @ViewChild('pivotLabelLayout')
  labelLayout: ElementRef<HTMLElement>;

  /** The position of the tab. */
  get index(): number {
    return undefined;
  }

  /** Whether the tab is currently active. */
  get isActive(): boolean {
    return this._isActive;
  }

  _isActive: boolean = false;

  constructor(private _elementRef: ElementRef<HTMLElement>, private _changeDetectorRef: ChangeDetectorRef) {

  }

  @HostListener('click', ['$event'])
  clickEventListener(event: MouseEvent) {
    event.preventDefault();
    this.click.emit(event);
  }

  @HostListener('mouseenter', ['$event'])
  mouseEnterEventListener(event: MouseEvent) {
    if (1) {
      this._isHover = true;
      this.mouseenter.emit(event);
      this.mouseover.emit(event);
    } else {
      console.log('Is touch event');
    }
  }

  @HostListener('mouseleave', ['$event'])
  mouseLeaveEventListener(event: MouseEvent) {
    if (1) {
      this._isHover = true;
      this.mouseout.emit(event);
    } else {
      console.log('Is touch event');
    }
  }

  get host(): HTMLElement {
    return this._elementRef.nativeElement;
  }

  get layoutHost(): HTMLElement {
    return this.labelLayout.nativeElement;
  }

  markForCheck() {
    this._changeDetectorRef.markForCheck();
  }

  get isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
}
