export class MsPivotContentContext {
  odd: boolean;
  even: boolean;
  first: boolean;
  last: boolean;

  constructor(public index: number, total: number) {
    this.odd = index % 2 === 1;
    this.even = !this.odd;
    this.first = index === 0;
    this.last = index === total - 1;
  }
}
