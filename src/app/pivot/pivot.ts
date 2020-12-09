import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  ContentChild,
  Injector,
  Input,
  Optional,
  ViewEncapsulation
} from '@angular/core';
import {MsPivotHeader} from './pivot-header';
import {MsPivotBody} from './pivot-body';
import {MsPivotLabel} from './label/pivot-label';
import {MsPivotContent, MsPivotContentDef} from './pivot-content';
import {MsPivotContentContext} from './pivot-content-context';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  template: `
      <ng-content></ng-content>`,
  selector: 'ms-pivot, msPivot',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,

  host: {
    'class': 'ms-pivot',
    'attr.role': 'tab'
  }
})
export class MsPivot implements AfterViewInit, AfterContentInit {
  private _isInitialized: boolean = false;

  private _animationDuration: number = 200;

  /** The index of the active tab. */
  @Input()
  get selectedIndex(): number | null {
    return this._selectedIndex;
  }

  set selectedIndex(index: number) {
    if (this._isInitialized) {
      this.activeAt(index);
    } else {
      this._selectedIndex = index;
    }
  }

  private _selectedIndex: number | null = 0;
  private _selectedLabel: MsPivotLabel = null;

  @ContentChild(MsPivotHeader)
  header: MsPivotHeader;


  @ContentChild(MsPivotBody)
  body: MsPivotBody;


  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private parentInjector: Injector,
              @Optional() private _router: Router,
              private _route: ActivatedRoute) {
  }

  ngAfterContentInit(): void {

  }

  ngAfterViewInit(): void {
    if (this.header.labels.length !== this.body.contents.length) {
      throw new Error(`The pivot should have the same number of labels and contents.`);
    }


    this.labels.forEach((label, index) => label._index = index);
    this.labels.forEach(label => label.click.subscribe(() => this.select(label)));
    this.labels.forEach(label => label.mouseover.subscribe(() => this.labelHoverEvent(label)));

    Promise.resolve().then(() => this.activeAt(this._selectedIndex));
    this._isInitialized = true;
  }

  activeAt(index: number) {
    if (index < 0) {
      index = 0;
    } else if (index >= this.header.labels.length) {
      index = this.header.labels.length - 1;
    }

    const label = this.labels[index];
    const content = this.contents[index];
    const container = this.body.containers.toArray()[index];

    let left = 0;
    let width = 0;

    if (label.isHover) {
      left = label.host.offsetLeft;
      width = label.host.offsetWidth;
    } else {
      left = label.host.offsetLeft + label.labelLayout.nativeElement.offsetLeft;
      width = label.labelLayout.nativeElement.offsetWidth;
    }

    this._moveActiveBorder(left, width);

    this.labels.forEach(item => {
      item._isActive = false;
      item.markForCheck();
    });
    label._isActive = true;
    label.host.blur();

    this._selectedIndex = index;
    this._selectedLabel = label;

    const context = new MsPivotContentContext(index, this.body.contents.length);
    const parentInjector = this.parentInjector;
    const injector: Injector = {
      get(token: any, notFoundValue?: any): any {
        const customTokens = new WeakMap<any, any>([
          [MsPivotContentContext, context],
          [MsPivotContentDef, content]
        ]);
        const value = customTokens.get(token);

        if (typeof value !== 'undefined') {
          return value;
        }

        return parentInjector.get(token, notFoundValue);
      }

    };

    if (this._selectedLabel._contentRef) {
      // this._selectedContentRef.destroy();
    } else {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(MsPivotContent);
      this._selectedLabel._contentRef = container.createComponent<MsPivotContent>(componentFactory, 0, injector);
      this._selectedLabel._contentRef.changeDetectorRef.detectChanges();
    }

    this.body.moveAt(index);
  }

  select(label: MsPivotLabel) {
    const index = this.labels.indexOf(label);
    this.activeAt(index);
  }

  labelHoverEvent(label: MsPivotLabel) {
    if (!label.isActive) {
      return;
    }

    let left = 0;
    let width = 0;
    if (label.isHover) {
      left = label.host.offsetLeft;
      width = label.host.offsetWidth;
    } else {
      left = label.host.offsetLeft + label.labelLayout.nativeElement.offsetLeft;
      width = label.labelLayout.nativeElement.offsetWidth;
    }

    this._moveActiveBorder(left, width);

  }

  selectPrev() {
  }

  selectNext() {
  }

  private _moveActiveBorder(left: number, width: number): Promise<void> {
    return new Promise<void>(resolve => {
      this.activeBorderHost.animate([
        {width: `${this.activeBorderHost.offsetWidth}px`, left: `${this.activeBorderHost.offsetLeft}px`},
        {width: `${width}px`, left: `${left}px`}
      ], {fill: 'both', duration: this._animationDuration})
        .onfinish = () => resolve();
    });
  }


  get labels(): Array<MsPivotLabel> {
    return this.header.labels.toArray();
  }


  get contents(): Array<MsPivotContentDef> {
    return this.body.contents.toArray();
  }

  get activeBorderHost(): HTMLElement {
    return this.header.activeBorder.nativeElement;
  }
}
