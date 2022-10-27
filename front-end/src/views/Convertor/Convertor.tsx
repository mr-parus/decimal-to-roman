import React, { useRef, useState } from 'react';
import { from, Subscription } from 'rxjs';
import { isInt } from '../../utils/math.util';
import { ConvertorParams } from './Convertor.types';

export const DEFAULT_HINT = 'Enter a valid decimal ⤵';

// ℹ️ SOLID Design Principle: Dependency Inversion
// Convertor component relays on the DecimalToRomanConvertable interface abstraction
// but not on the ConversionService implementation
export function Convertor({ conversionService }: ConvertorParams) {
  const [romanOutput, setRomanOutput] = useState<string>(DEFAULT_HINT);
  const [decimalInput, setDecimalInput] = useState<string>('');
  const conversionSubscription = useRef<Subscription>();

  const convert = (value: string): void => {
    if (conversionSubscription.current) conversionSubscription.current?.unsubscribe();

    const decimal = parseFloat(value);
    if (!isInt(decimal)) {
      return setRomanOutput(DEFAULT_HINT);
    }

    setRomanOutput('Converting ...');
    conversionSubscription.current = from(conversionService.convertDecimalToRoman(decimal)).subscribe({
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
      <b data-testid="roman-output">{romanOutput}</b>
      <input value={decimalInput} onChange={onChange} data-testid="decimal-input" type="number" min="1" />
    </div>
  );
}
