import { act, fireEvent, render, screen } from '@testing-library/react';
import { wait } from '@testing-library/user-event/dist/utils';
import React from 'react';
import { Convertor, DEFAULT_HINT } from './Convertor';

describe('Convertor component', () => {
  const mockConversionService = {
    convertDecimalToRoman: jest.fn(),
  };

  it('should render a hint', () => {
    render(<Convertor conversionService={mockConversionService} />);
    const linkElement = screen.getByText(DEFAULT_HINT);
    expect(linkElement).toBeInTheDocument();
  });

  it('should convert the decimal to roman', async () => {
    const EXPECTED_ROMAN = 'X';
    const CONVERSION_DELAY = 100;

    jest.spyOn(mockConversionService, 'convertDecimalToRoman').mockImplementation(async () => {
      await wait(CONVERSION_DELAY);
      return EXPECTED_ROMAN;
    });

    render(<Convertor conversionService={mockConversionService} />);

    const decimalInput = screen.getByTestId('decimal-input');
    const romanOutput = screen.getByTestId('roman-output');

    expect(decimalInput).toBeInTheDocument();
    expect(romanOutput.textContent).toContain(DEFAULT_HINT);

    await act(async () => {
      fireEvent.input(decimalInput, { target: { value: 10 } });
      expect(romanOutput.textContent).toContain('Converting');
      await wait(CONVERSION_DELAY);
    });

    expect(romanOutput.textContent).toContain(EXPECTED_ROMAN);
  });
});
