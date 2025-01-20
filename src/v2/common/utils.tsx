import React from 'react';
/**
 *
 *
 * @param {*} text
 * @param {string} [highlightText='']
 * @param {string} [color='#005cff']
 * @return {*}
 */
export const getHighlightText = (text, highlightText = '', color = '#005cff') => {
  let hIndex = text.indexOf(highlightText);
  if (hIndex === -1) {
    // use regex
    const mt = text.match(new RegExp(highlightText, 'i'));

    if (mt) {
      hIndex = mt.index;
    }
  }
  const rest = text.slice(hIndex + highlightText.length);
  const first = text.slice(0, hIndex);
  return (
    <>
      {first}
      <span style={{ color }}>{highlightText}</span>
      {rest}
    </>
  );
};
