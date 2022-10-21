const API_BASE_URL = 'http://localhost:3000/api';

export interface DecimalToRomanConvertable {
  convertDecimalToRoman(decimal: number): Promise<string>;
}

export class ConversionService implements DecimalToRomanConvertable {
  // ℹ️ Cache prevents from sending unnecessary requests to API
  private cache = new Map();

  async convertDecimalToRoman(decimal: number): Promise<string> {
    const valueFromCache = this.cache.get(decimal);
    if (valueFromCache !== undefined) return valueFromCache;

    const result = await this.scheduleConversion(decimal);

    this.cache.set(decimal, result);

    return result;
  }

  async scheduleConversion(decimal: number): Promise<string> {
    let response;
    try {
      response = await fetch(API_BASE_URL + '/math/decimal-to-roman', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ decimal }),
      });
    } catch (error) {
      throw new Error('AJAX request failed');
    }

    const isJson = response.headers.get('content-type')?.includes('application/json');
    if (!isJson) throw new Error(`Invalid response format ${response.headers.get('content-type')}`);

    const body = await response.json();

    if (body.message) {
      return body.message.toString();
    }

    return body.result.roman;
  }
}
