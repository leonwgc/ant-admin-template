/**
 * @file components/NumberRoll/NumberRoll.tsx
 * @author leon.wang
 */
import React, { FC } from 'react';
import './NumberRoll.scss';

// ─── Single-digit roller ───────────────────────────────────────────────────────

interface DigitRollerProps {
  digit: number;
  duration: number;
  cellHeight: number;
  fontSize: number;
}

const DigitRoller: FC<DigitRollerProps> = ({ digit, duration, cellHeight, fontSize }) => (
  <span className="number-roll__track" style={{ height: cellHeight, fontSize }}>
    <span
      className="number-roll__inner"
      style={{
        transform: `translateY(-${digit * cellHeight}px)`,
        transition: `transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      }}
    >
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
        <span key={d} className="number-roll__cell" style={{ height: cellHeight }}>
          {d}
        </span>
      ))}
    </span>
  </span>
);

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NumberRollProps {
  /** The number to display */
  value: number;
  /** Animation duration in ms (default: 800) */
  duration?: number;
  /** Font size in px (default: 32) */
  fontSize?: number;
  /** Text color */
  color?: string;
  /** Thousands separator — set to '' to disable (default: ',') */
  separator?: string;
  /** Decimal places; -1 = auto (default: -1) */
  decimals?: number;
  /** Prefix text (e.g. '$') */
  prefix?: string;
  /** Suffix text (e.g. '%') */
  suffix?: string;
  /** CSS font-weight (default: 700) */
  fontWeight?: number | string;
  /** Additional className */
  className?: string;
}

// ─── Main Component ───────────────────────────────────────────────────────────

/**
 * NumberRoll — animates each digit individually with a slot-machine roll effect
 * whenever the numeric value changes.
 */
const NumberRoll: FC<NumberRollProps> = ({
  value,
  duration = 800,
  fontSize = 32,
  color,
  separator = ',',
  decimals = -1,
  prefix = '',
  suffix = '',
  fontWeight = 700,
  className = '',
}) => {
  const cellHeight = Math.round(fontSize * 1.5);

  // Format the number into a display string
  const formatValue = (num: number): string => {
    const isNeg = num < 0;
    const abs = Math.abs(num);

    let str: string;
    if (decimals === -1) {
      str = abs.toString();
    } else {
      str = abs.toFixed(decimals);
    }

    if (separator) {
      const [intPart, decPart] = str.split('.');
      const withSep = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
      str = decPart !== undefined ? `${withSep}.${decPart}` : withSep;
    }

    return isNeg ? `-${str}` : str;
  };

  const formatted = formatValue(value);

  type Token =
    | { type: 'digit'; value: number }
    | { type: 'static'; value: string };

  const tokens: Token[] = formatted.split('').map((ch) => {
    if (ch >= '0' && ch <= '9') {
      return { type: 'digit', value: parseInt(ch) };
    }
    return { type: 'static', value: ch };
  });

  return (
    <span
      className={`number-roll ${className}`}
      style={{ fontSize, color, fontWeight, height: cellHeight, lineHeight: `${cellHeight}px` }}
    >
      {prefix && (
        <span className="number-roll__affix" style={{ lineHeight: `${cellHeight}px` }}>
          {prefix}
        </span>
      )}
      {tokens.map((token, i) =>
        token.type === 'digit' ? (
          <DigitRoller
            key={i}
            digit={token.value}
            duration={duration}
            cellHeight={cellHeight}
            fontSize={fontSize}
          />
        ) : (
          <span
            key={i}
            className="number-roll__sep"
            style={{ lineHeight: `${cellHeight}px` }}
          >
            {token.value}
          </span>
        ),
      )}
      {suffix && (
        <span className="number-roll__affix" style={{ lineHeight: `${cellHeight}px` }}>
          {suffix}
        </span>
      )}
    </span>
  );
};

export default NumberRoll;
