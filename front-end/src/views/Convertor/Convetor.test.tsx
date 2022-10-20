import React from 'react';
import { render, screen } from '@testing-library/react';
import { ConversionService } from '../../services/conversion.service';
import { Convertor, DEFAULT_HINT } from './Convertor';

it('should render a hint', () => {
  render(<Convertor conversionService={new ConversionService()} />);
  const linkElement = screen.getByText(DEFAULT_HINT);
  expect(linkElement).toBeInTheDocument();
});
