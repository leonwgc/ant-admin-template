/**
 * @file src/pages/Hooks/IntlNumberFormatExample.tsx
 * @author leon.wang(leon.wang@derbysoft.net)
 */

import React, { useState } from 'react';
import { Card, Input, Select, Space, Typography, Divider } from '@derbysoft/neat-design';
import './IntlNumberFormatExample.scss';

const { Title, Text, Paragraph } = Typography;

/**
 * Intl.NumberFormat API example page
 * Demonstrates various number formatting options
 */
const IntlNumberFormatExample: React.FC = () => {
  const [amount, setAmount] = useState<number>(1234567.89);
  const [locale, setLocale] = useState<string>('en-US');

  // Example 1: Currency formatting
  const formatCurrency = (value: number, currency: string, locale: string) => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(value);
  };

  // Example 2: Percentage formatting
  const formatPercent = (value: number, locale: string) => {
    return new Intl.NumberFormat(locale, {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Example 3: Unit formatting
  const formatUnit = (value: number, unit: string, locale: string) => {
    return new Intl.NumberFormat(locale, {
      style: 'unit',
      unit: unit,
      unitDisplay: 'long',
    }).format(value);
  };

  // Example 4: Compact notation
  const formatCompact = (value: number, locale: string) => {
    return new Intl.NumberFormat(locale, {
      notation: 'compact',
      compactDisplay: 'short',
    }).format(value);
  };

  // Example 5: Scientific notation
  const formatScientific = (value: number, locale: string) => {
    return new Intl.NumberFormat(locale, {
      notation: 'scientific',
    }).format(value);
  };

  // Example 6: Engineering notation
  const formatEngineering = (value: number, locale: string) => {
    return new Intl.NumberFormat(locale, {
      notation: 'engineering',
    }).format(value);
  };

  // Example 7: Custom decimal places
  const formatDecimal = (value: number, locale: string, decimals: number) => {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  };

  // Example 8: With sign display
  const formatWithSign = (value: number, locale: string) => {
    return new Intl.NumberFormat(locale, {
      signDisplay: 'always',
    }).format(value);
  };

  // Example 9: Grouping
  const formatWithGrouping = (value: number, locale: string, useGrouping: boolean) => {
    return new Intl.NumberFormat(locale, {
      useGrouping: useGrouping,
    }).format(value);
  };

  const locales = [
    { label: 'English (US)', value: 'en-US' },
    { label: 'Chinese (China)', value: 'zh-CN' },
    { label: 'Japanese (Japan)', value: 'ja-JP' },
    { label: 'German (Germany)', value: 'de-DE' },
    { label: 'French (France)', value: 'fr-FR' },
    { label: 'Arabic (Saudi Arabia)', value: 'ar-SA' },
    { label: 'Hindi (India)', value: 'hi-IN' },
  ];

  return (
    <div className="intl-number-format-example">
      <Title level={2}>Intl.NumberFormat API Examples</Title>
      <Paragraph>
        The Intl.NumberFormat object enables language-sensitive number formatting.
        This page demonstrates various formatting options available in the API.
      </Paragraph>

      {/* Controls */}
      <Card className="intl-number-format-example__controls">
        <Space size="large">
          <div>
            <Text strong>Amount: </Text>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              style={{ width: 200 }}
            />
          </div>
          <div>
            <Text strong>Locale: </Text>
            <Select
              value={locale}
              onChange={setLocale}
              options={locales}
              style={{ width: 200 }}
            />
          </div>
        </Space>
      </Card>

      {/* Example 1: Currency Formatting */}
      <Card title="1. Currency Formatting" className="intl-number-format-example__card">
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div className="intl-number-format-example__result">
            <Text strong>USD: </Text>
            <Text code>{formatCurrency(amount, 'USD', locale)}</Text>
          </div>
          <div className="intl-number-format-example__result">
            <Text strong>EUR: </Text>
            <Text code>{formatCurrency(amount, 'EUR', locale)}</Text>
          </div>
          <div className="intl-number-format-example__result">
            <Text strong>CNY: </Text>
            <Text code>{formatCurrency(amount, 'CNY', locale)}</Text>
          </div>
          <div className="intl-number-format-example__result">
            <Text strong>JPY: </Text>
            <Text code>{formatCurrency(amount, 'JPY', locale)}</Text>
          </div>
        </Space>
        <Divider />
        <div className="intl-number-format-example__code">
          {`new Intl.NumberFormat('${locale}', {
  style: 'currency',
  currency: 'USD',
}).format(${amount})`}
        </div>
      </Card>

      {/* Example 2: Percentage Formatting */}
      <Card title="2. Percentage Formatting" className="intl-number-format-example__card">
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div className="intl-number-format-example__result">
            <Text strong>0.1234: </Text>
            <Text code>{formatPercent(0.1234, locale)}</Text>
          </div>
          <div className="intl-number-format-example__result">
            <Text strong>0.5678: </Text>
            <Text code>{formatPercent(0.5678, locale)}</Text>
          </div>
          <div className="intl-number-format-example__result">
            <Text strong>1.25: </Text>
            <Text code>{formatPercent(1.25, locale)}</Text>
          </div>
        </Space>
        <Divider />
        <div className="intl-number-format-example__code">
          {`new Intl.NumberFormat('${locale}', {
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format(0.1234)`}
        </div>
      </Card>

      {/* Example 3: Unit Formatting */}
      <Card title="3. Unit Formatting" className="intl-number-format-example__card">
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div className="intl-number-format-example__result">
            <Text strong>Kilometers: </Text>
            <Text code>{formatUnit(amount, 'kilometer', locale)}</Text>
          </div>
          <div className="intl-number-format-example__result">
            <Text strong>Gigabytes: </Text>
            <Text code>{formatUnit(amount, 'gigabyte', locale)}</Text>
          </div>
          <div className="intl-number-format-example__result">
            <Text strong>Hours: </Text>
            <Text code>{formatUnit(amount, 'hour', locale)}</Text>
          </div>
        </Space>
        <Divider />
        <div className="intl-number-format-example__code">
          {`new Intl.NumberFormat('${locale}', {
  style: 'unit',
  unit: 'kilometer',
  unitDisplay: 'long',
}).format(${amount})`}
        </div>
      </Card>

      {/* Example 4: Compact Notation */}
      <Card title="4. Compact Notation" className="intl-number-format-example__card">
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div className="intl-number-format-example__result">
            <Text strong>1,234,567: </Text>
            <Text code>{formatCompact(1234567, locale)}</Text>
          </div>
          <div className="intl-number-format-example__result">
            <Text strong>9,876,543,210: </Text>
            <Text code>{formatCompact(9876543210, locale)}</Text>
          </div>
          <div className="intl-number-format-example__result">
            <Text strong>123: </Text>
            <Text code>{formatCompact(123, locale)}</Text>
          </div>
        </Space>
        <Divider />
        <div className="intl-number-format-example__code">
          {`new Intl.NumberFormat('${locale}', {
  notation: 'compact',
  compactDisplay: 'short',
}).format(1234567)`}
        </div>
      </Card>

      {/* Example 5: Scientific Notation */}
      <Card title="5. Scientific Notation" className="intl-number-format-example__card">
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div className="intl-number-format-example__result">
            <Text strong>Current amount: </Text>
            <Text code>{formatScientific(amount, locale)}</Text>
          </div>
          <div className="intl-number-format-example__result">
            <Text strong>299,792,458: </Text>
            <Text code>{formatScientific(299792458, locale)}</Text>
          </div>
        </Space>
        <Divider />
        <div className="intl-number-format-example__code">
          {`new Intl.NumberFormat('${locale}', {
  notation: 'scientific',
}).format(${amount})`}
        </div>
      </Card>

      {/* Example 6: Engineering Notation */}
      <Card title="6. Engineering Notation" className="intl-number-format-example__card">
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div className="intl-number-format-example__result">
            <Text strong>Current amount: </Text>
            <Text code>{formatEngineering(amount, locale)}</Text>
          </div>
          <div className="intl-number-format-example__result">
            <Text strong>987,654,321: </Text>
            <Text code>{formatEngineering(987654321, locale)}</Text>
          </div>
        </Space>
        <Divider />
        <div className="intl-number-format-example__code">
          {`new Intl.NumberFormat('${locale}', {
  notation: 'engineering',
}).format(${amount})`}
        </div>
      </Card>

      {/* Example 7: Decimal Places */}
      <Card title="7. Custom Decimal Places" className="intl-number-format-example__card">
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div className="intl-number-format-example__result">
            <Text strong>0 decimals: </Text>
            <Text code>{formatDecimal(amount, locale, 0)}</Text>
          </div>
          <div className="intl-number-format-example__result">
            <Text strong>2 decimals: </Text>
            <Text code>{formatDecimal(amount, locale, 2)}</Text>
          </div>
          <div className="intl-number-format-example__result">
            <Text strong>4 decimals: </Text>
            <Text code>{formatDecimal(amount, locale, 4)}</Text>
          </div>
        </Space>
        <Divider />
        <div className="intl-number-format-example__code">
          {`new Intl.NumberFormat('${locale}', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format(${amount})`}
        </div>
      </Card>

      {/* Example 8: Sign Display */}
      <Card title="8. Sign Display" className="intl-number-format-example__card">
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div className="intl-number-format-example__result">
            <Text strong>Positive: </Text>
            <Text code>{formatWithSign(amount, locale)}</Text>
          </div>
          <div className="intl-number-format-example__result">
            <Text strong>Negative: </Text>
            <Text code>{formatWithSign(-amount, locale)}</Text>
          </div>
          <div className="intl-number-format-example__result">
            <Text strong>Zero: </Text>
            <Text code>{formatWithSign(0, locale)}</Text>
          </div>
        </Space>
        <Divider />
        <div className="intl-number-format-example__code">
          {`new Intl.NumberFormat('${locale}', {
  signDisplay: 'always',
}).format(${amount})`}
        </div>
      </Card>

      {/* Example 9: Grouping */}
      <Card title="9. Number Grouping" className="intl-number-format-example__card">
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div className="intl-number-format-example__result">
            <Text strong>With grouping: </Text>
            <Text code>{formatWithGrouping(amount, locale, true)}</Text>
          </div>
          <div className="intl-number-format-example__result">
            <Text strong>Without grouping: </Text>
            <Text code>{formatWithGrouping(amount, locale, false)}</Text>
          </div>
        </Space>
        <Divider />
        <div className="intl-number-format-example__code">
          {`new Intl.NumberFormat('${locale}', {
  useGrouping: true, // or false
}).format(${amount})`}
        </div>
      </Card>

      {/* Common Use Cases */}
      <Card title="Common Use Cases" className="intl-number-format-example__card">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Title level={5}>Price Display</Title>
            <div className="intl-number-format-example__result">
              <Text code>{formatCurrency(99.99, 'USD', 'en-US')}</Text>
            </div>
          </div>
          <div>
            <Title level={5}>File Size</Title>
            <div className="intl-number-format-example__result">
              <Text code>{formatUnit(2048, 'megabyte', 'en-US')}</Text>
            </div>
          </div>
          <div>
            <Title level={5}>Discount Rate</Title>
            <div className="intl-number-format-example__result">
              <Text code>{formatPercent(0.25, 'en-US')}</Text>
            </div>
          </div>
          <div>
            <Title level={5}>Social Media Stats</Title>
            <div className="intl-number-format-example__result">
              <Text code>{formatCompact(1234567, 'en-US')} followers</Text>
            </div>
          </div>
        </Space>
      </Card>

      {/* API Reference */}
      <Card title="API Reference" className="intl-number-format-example__card">
        <Title level={5}>Constructor Options</Title>
        <table className="intl-number-format-example__table">
          <thead>
            <tr>
              <th>Option</th>
              <th>Values</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>style</td>
              <td>'decimal' | 'currency' | 'percent' | 'unit'</td>
              <td>The formatting style to use</td>
            </tr>
            <tr>
              <td>currency</td>
              <td>ISO 4217 code (USD, EUR, etc.)</td>
              <td>Currency to use in formatting</td>
            </tr>
            <tr>
              <td>notation</td>
              <td>'standard' | 'scientific' | 'engineering' | 'compact'</td>
              <td>Number notation format</td>
            </tr>
            <tr>
              <td>signDisplay</td>
              <td>'auto' | 'never' | 'always' | 'exceptZero'</td>
              <td>When to display the sign</td>
            </tr>
            <tr>
              <td>minimumFractionDigits</td>
              <td>0-20</td>
              <td>Minimum number of fraction digits</td>
            </tr>
            <tr>
              <td>maximumFractionDigits</td>
              <td>0-20</td>
              <td>Maximum number of fraction digits</td>
            </tr>
            <tr>
              <td>useGrouping</td>
              <td>boolean</td>
              <td>Whether to use grouping separators</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default IntlNumberFormatExample;
