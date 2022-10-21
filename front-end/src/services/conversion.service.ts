import {
  BehaviorSubject,
  EMPTY,
  filter,
  firstValueFrom,
  from,
  fromEvent,
  map,
  merge,
  Subject,
  switchMap,
  timeout,
} from 'rxjs';

export interface DecimalToRomanConvertable {
  convertDecimalToRoman(decimal: number): Promise<string>;
}

export class ConversionService implements DecimalToRomanConvertable {
  // ℹ️ Cache prevents from sending unnecessary requests to API
  private cache = new Map();
  private clientId$ = new BehaviorSubject<string>('');
  private conversionResults$ = new Subject<{ roman: string; decimal: number }>();

  constructor() {
    this.initSse();
  }

  async convertDecimalToRoman(decimal: number): Promise<string> {
    const valueFromCache = this.cache.get(decimal);
    if (valueFromCache !== undefined) return valueFromCache;

    const startConversionTask$ = from(this.createConversionTask(decimal)).pipe(switchMap(() => EMPTY));
    const getConversionResults$ = this.conversionResults$.asObservable().pipe(
      timeout(5000),
      filter(({ decimal: currentDecimal }) => decimal === currentDecimal),
      map(({ roman }) => roman),
    );

    const result = await firstValueFrom(merge(startConversionTask$, getConversionResults$));

    this.cache.set(decimal, result);

    return result;
  }

  private async createConversionTask(decimal: number): Promise<void> {
    let response;
    try {
      response = await fetch('/api/tasks', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          decimal,
          clientId: this.clientId$.value,
        }),
      });
    } catch (error) {
      throw new Error('AJAX request failed');
    }

    const body = await response.json();

    if (body.message) {
      throw new Error(body.message);
    }
  }

  private initSse(): void {
    const emitter = new EventSource('/api/tasks');
    const connect$ = fromEvent<MessageEvent>(emitter, 'connect');
    const message$ = fromEvent<MessageEvent>(emitter, 'message');

    connect$.subscribe(({ data: clientId }) => this.clientId$.next(clientId));
    message$
      .pipe(
        map(event => event.data),
        map(data => JSON.parse(data)),
      )
      .subscribe(({ roman, decimal }) => this.conversionResults$.next({ roman, decimal }));
  }
}
