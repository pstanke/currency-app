import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import ResultBox from './ResultBox';

describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox from='PLN' to='USD' amount={100} />);
  });

  it('should render proper info about conversion', () => {
    const testCases = [
      {
        amount: '100',
        expectResult: 'PLN 100.00 = $28.57',
        from: 'PLN',
        to: 'USD',
      },
      {
        amount: '20',
        expectResult: 'PLN 20.00 = $5.71',
        from: 'PLN',
        to: 'USD',
      },
      {
        amount: '200',
        expectResult: 'PLN 200.00 = $57.14',
        from: 'PLN',
        to: 'USD',
      },
      {
        amount: '345',
        expectResult: 'PLN 345.00 = $98.57',
        from: 'PLN',
        to: 'USD',
      },
      {
        amount: '100',
        expectResult: '$100.00 = PLN 350.00',
        from: 'USD',
        to: 'PLN',
      },
      {
        amount: '20',
        expectResult: '$20.00 = PLN 70.00',
        from: 'USD',
        to: 'PLN',
      },
      {
        amount: '200',
        expectResult: '$200.00 = PLN 700.00',
        from: 'USD',
        to: 'PLN',
      },
      {
        amount: '345',
        expectResult: '$345.00 = PLN 1,207.50',
        from: 'USD',
        to: 'PLN',
      },
    ];

    for (const testObj of testCases) {
      render(
        <ResultBox
          from={testObj.from}
          to={testObj.to}
          amount={parseInt(testObj.amount)}
        />
      );

      const resultDiv = screen.getByTestId('result');

      expect(resultDiv).toHaveTextContent(testObj.expectResult);

      cleanup();
    }
  });

  it('should render proper info if values in "from" and "to" are the same', () => {
    const testCases = [
      {
        amount: '100',
        from: 'PLN',
        to: 'PLN',
        expectResult: 'PLN 100.00 = PLN 100.00',
      },
      {
        amount: '20',
        from: 'PLN',
        to: 'PLN',
        expectResult: 'PLN 20.00 = PLN 20.00',
      },
      {
        amount: '200',
        from: 'USD',
        to: 'USD',
        expectResult: '$200.00 = $200.00',
      },
      {
        amount: '345',
        from: 'USD',
        to: 'USD',
        expectResult: '$345.00 = $345.00',
      },
    ];

    for (const testObj of testCases) {
      render(
        <ResultBox
          from={testObj.from}
          to={testObj.to}
          amount={parseInt(testObj.amount)}
        />
      );

      const resultDiv = screen.getByTestId('result');

      expect(resultDiv).toHaveTextContent(testObj.expectResult);

      cleanup();
    }
  });

  it('should return error when value is negative', () => {
    const testCases = [
      {
        amount: '-100',
        from: 'PLN',
        to: 'USD',
        expectResult: 'Wrong value...',
      },
      {
        amount: '-20',
        from: 'USD',
        to: 'PLN',
        expectResult: 'Wrong value...',
      },
    ];

    for (const testObj of testCases) {
      render(
        <ResultBox
          from={testObj.from}
          to={testObj.to}
          amount={parseInt(testObj.amount)}
        />
      );

      const resultDiv = screen.getByTestId('result');

      expect(resultDiv).toHaveTextContent(testObj.expectResult);

      cleanup();
    }
  });
});
