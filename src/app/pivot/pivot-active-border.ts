import {Directive, ElementRef} from '@angular/core';
import {MsPivotHeader} from './header/pivot-header';
import {MsPivotLabel} from './label/pivot-label';

@Directive({
  selector: '[msPivotActiveBorder]',
  host: {
    'class': 'ms-pivotActiveBorder'
  }
})
export class MsPivotActiveBorder {

  private _translateX: number = 0;
  private _width: number = 0;

  private _label: MsPivotLabel;

  constructor(private _elementRef: ElementRef<HTMLElement>, private _header: MsPivotHeader) {
  }

  move(label: MsPivotLabel, all: boolean = true): Promise<void> {
    this._label = label;
    const translateX = all ? label.host.offsetLeft : this.getTranslateX(label);
    const width = all ? label.host.offsetWidth : label.layoutHost.offsetWidth;

    const keyframes = [
      {width: `${this._width}px`, transform: `translateX(${this._translateX}px)`},
      {width: `${width}px`, transform: `translateX(${translateX}px)`}
    ];
    return new Promise<void>(resolve => {
      this.host.animate(keyframes, {fill: 'none', duration: 100})
        .onfinish = () => {
        this._translateX = translateX;
        this._width = width;

        this.host.style.transform = `translateX(${translateX}px)`;
        this.host.style.width = `${width}px`;
        resolve();
      };
    });
  }


  getTranslateX(label: MsPivotLabel): number {
    return label.host.offsetLeft + label.layoutHost.offsetLeft;
  }

  get host(): HTMLElement {
    return this._elementRef.nativeElement;
  }
}
