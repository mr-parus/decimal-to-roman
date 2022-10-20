import React, { useRef, useState } from 'react';
import { delay, from, Subscription } from 'rxjs';
import { ConvertorParams } from './Convertor.types';

export const DEFAULT_HINT = 'Enter a valid decimal ⤵';

export function Convertor({ conversionService }: ConvertorParams) {
  const [romanOutput, setRomanOutput] = useState<string>(DEFAULT_HINT);
  const [decimalInput, setDecimalInput] = useState<string>('');
  const conversionSubscription = useRef<Subscription>();

  const convert = (value: string) => {
    if (conversionSubscription.current) conversionSubscription.current?.unsubscribe();

    const decimal = parseInt(value);
    if (!isFinite(decimal)) {
      return setRomanOutput(DEFAULT_HINT);
    }

    setRomanOutput('Converting ...');
    conversionSubscription.current = from(conversionService.convertDecimalToRoman(decimal))
      .pipe(delay(200))
      .subscribe({
        error: error => setRomanOutput(`╳ Failed to convert. ${error.message}`),
        next: setRomanOutput,
      });
  };

  const onChange = ({ currentTarget: { value } }: React.FormEvent<HTMLInputElement>) => {
    setDecimalInput(value);
    convert(value);
  };

  return (
    <div className="container">
      <b>{romanOutput}</b>
      <input value={decimalInput} onChange={onChange} type="number" min="1" />
    </div>
  );
}
