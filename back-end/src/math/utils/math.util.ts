import { MAX_ROMAN_IN_DECIMAL, MIN_ROMAN_IN_DECIMAL } from '../constatns';

export function convertDecimalToRoman(decimal: number): string {
  if (decimal > MAX_ROMAN_IN_DECIMAL || decimal < MIN_ROMAN_IN_DECIMAL) {
    throw new Error(
      `Impossible to convert ${decimal} to Roman. It's out of range`,
    );
  }

  const equivalents = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const romanDigits = [
    'M',
    'CM',
    'D',
    'CD',
    'C',
    'XC',
    'L',
    'XL',
    'X',
    'IX',
    'V',
    'IV',
    'I',
  ];

  let result = '';
  for (let i = 0; decimal; i++)
    while (decimal >= equivalents[i]) {
      result += romanDigits[i];
      decimal -= equivalents[i];
    }

  return result;
}
