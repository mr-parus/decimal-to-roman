import { convertDecimalToRoman } from './math.util';

describe('convertDecimalToRoman', () => {
  it('should convert correctly digits in range [1:3999]', () => {
    const data: [number, string][] = [
      [1, 'I'],
      [4, 'IV'],
      [5, 'V'],
      [9, 'IX'],
      [10, 'X'],
      [111, 'CXI'],
      [444, 'CDXLIV'],
      [555, 'DLV'],
      [999, 'CMXCIX'],
      [1150, 'MCL'],
      [2309, 'MMCCCIX'],
      [3999, 'MMMCMXCIX'],
    ];

    for (const [decimal, expectedRoman] of data) {
      expect(convertDecimalToRoman(decimal)).toEqual(expectedRoman);
    }
  });
});
