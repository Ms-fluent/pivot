import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Directive,
  OnDestroy,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {MsPivotContentContext} from './pivot-content-context';

@Directive({
  selector: '[ms-pivotContentDef], [msPivotContentDef]'
})
export class MsPivotContentDef {
  constructor(public template: TemplateRef<MsPivotContentContext>) {
  }
}


@Component({
  template: `
      <ng-container #element></ng-container>`,
  selector: 'ms-pivotContent',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'ms-pivotContent'
  }
})
export class MsPivotContent implements AfterViewInit, OnDestroy {

  @ViewChild('element', {read: ViewContainerRef})
  view: ViewContainerRef;

  constructor(private _contentDef: MsPivotContentDef, private _context: MsPivotContentContext) {
  }

  ngAfterViewInit(): void {
    this.view.clear();
    this.view.createEmbeddedView(this._contentDef.template, this._context, 0);
  }

  ngOnDestroy(): void {
    this.view.clear();
  }
}
