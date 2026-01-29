/**
 * @file pages/Css/CssStickyExamples.tsx
 * @author leon.wang
 */

import React, { FC } from 'react';
import { Card, Tabs } from '@derbysoft/neat-design';
import './CssStickyExamples.scss';

interface CssStickyExamplesProps {}

/**
 * CSS Sticky practical usage examples
 * Demonstrates various real-world scenarios
 */
const CssStickyExamples: FC<CssStickyExamplesProps> = () => {
  const items = [
    {
      key: '1',
      label: 'Sticky Header',
      children: <StickyHeader />,
    },
    {
      key: '2',
      label: 'Sticky Table Header',
      children: <StickyTableHeader />,
    },
    {
      key: '3',
      label: 'Sticky Section Headers',
      children: <StickySectionHeaders />,
    },
    {
      key: '4',
      label: 'Sticky Sidebar',
      children: <StickySidebar />,
    },
    {
      key: '5',
      label: 'Sticky Footer',
      children: <StickyFooter />,
    },
    {
      key: '6',
      label: 'Sticky Columns',
      children: <StickyColumns />,
    },
  ];

  return (
    <div className="css-sticky-examples">
      <Card title="CSS Sticky - Practical Usage Examples">
        <Tabs items={items} />
      </Card>
    </div>
  );
};

/**
 * Example 1: Sticky Header - Fixed navigation on scroll
 */
const StickyHeader: FC = () => {
  return (
    <div className="sticky-example sticky-header-example">
      <div className="sticky-example__description">
        <h3>Sticky Header Navigation</h3>
        <p>
          Common use case: Keep navigation bar visible when scrolling down the
          page. Used in most modern websites.
        </p>
        <code>position: sticky; top: 0;</code>
      </div>

      <div className="sticky-example__demo">
        <div className="sticky-header-demo">
          <header className="sticky-header-demo__header">
            <div className="sticky-header-demo__logo">Logo</div>
            <nav className="sticky-header-demo__nav">
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#services">Services</a>
              <a href="#contact">Contact</a>
            </nav>
          </header>
          <div className="sticky-header-demo__content">
            <h2>Scroll down to see sticky effect</h2>
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i}>
                Content paragraph {i + 1}. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit.
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Example 2: Sticky Table Header - Keep column headers visible
 */
const StickyTableHeader: FC = () => {
  return (
    <div className="sticky-example sticky-table-header-example">
      <div className="sticky-example__description">
        <h3>Sticky Table Header</h3>
        <p>
          Keep table headers visible when scrolling through large datasets.
          Essential for data-heavy applications.
        </p>
        <code>thead &#123; position: sticky; top: 0; &#125;</code>
      </div>

      <div className="sticky-example__demo">
        <div className="sticky-table-demo">
          <table className="sticky-table-demo__table">
            <thead className="sticky-table-demo__thead">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 30 }, (_, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>User {i + 1}</td>
                  <td>user{i + 1}@example.com</td>
                  <td>{i % 2 === 0 ? 'Active' : 'Inactive'}</td>
                  <td>${Math.floor(Math.random() * 1000)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/**
 * Example 3: Sticky Section Headers - Group headers in lists
 */
const StickySectionHeaders: FC = () => {
  const sections = [
    { title: 'A', items: ['Apple', 'Avocado', 'Apricot', 'Almond'] },
    { title: 'B', items: ['Banana', 'Blueberry', 'Blackberry', 'Brazil Nut'] },
    { title: 'C', items: ['Cherry', 'Coconut', 'Cranberry', 'Cashew'] },
    { title: 'D', items: ['Date', 'Durian', 'Dragonfruit'] },
    { title: 'E', items: ['Elderberry', 'Eggfruit'] },
    { title: 'F', items: ['Fig', 'Feijoa'] },
    { title: 'G', items: ['Grape', 'Grapefruit', 'Guava', 'Gooseberry'] },
  ];

  return (
    <div className="sticky-example sticky-section-headers-example">
      <div className="sticky-example__description">
        <h3>Sticky Section Headers</h3>
        <p>
          Perfect for alphabetical lists, contact lists, or categorized content.
          Headers stick as you scroll through sections.
        </p>
        <code>section header &#123; position: sticky; top: 0; &#125;</code>
      </div>

      <div className="sticky-example__demo">
        <div className="sticky-section-demo">
          {sections.map((section) => (
            <div key={section.title} className="sticky-section-demo__section">
              <div className="sticky-section-demo__header">
                {section.title}
              </div>
              <ul className="sticky-section-demo__list">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Example 4: Sticky Sidebar - Navigation or filters
 */
const StickySidebar: FC = () => {
  return (
    <div className="sticky-example sticky-sidebar-example">
      <div className="sticky-example__description">
        <h3>Sticky Sidebar Navigation</h3>
        <p>
          Keep sidebar navigation or filters visible while scrolling main
          content. Common in documentation and e-commerce sites.
        </p>
        <code>sidebar &#123; position: sticky; top: 20px; &#125;</code>
      </div>

      <div className="sticky-example__demo">
        <div className="sticky-sidebar-demo">
          <aside className="sticky-sidebar-demo__sidebar">
            <h4>Navigation</h4>
            <ul>
              <li>
                <a href="#section1">Introduction</a>
              </li>
              <li>
                <a href="#section2">Getting Started</a>
              </li>
              <li>
                <a href="#section3">Advanced Topics</a>
              </li>
              <li>
                <a href="#section4">API Reference</a>
              </li>
              <li>
                <a href="#section5">Examples</a>
              </li>
            </ul>
          </aside>
          <main className="sticky-sidebar-demo__content">
            <h2>Main Content</h2>
            {Array.from({ length: 15 }, (_, i) => (
              <div key={i} className="sticky-sidebar-demo__section">
                <h3>Section {i + 1}</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris.
                </p>
              </div>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
};

/**
 * Example 5: Sticky Footer - Action buttons or toolbars
 */
const StickyFooter: FC = () => {
  return (
    <div className="sticky-example sticky-footer-example">
      <div className="sticky-example__description">
        <h3>Sticky Footer Actions</h3>
        <p>
          Keep action buttons or toolbars visible at the bottom. Useful for form
          submissions, shopping carts, or mobile app-like interfaces.
        </p>
        <code>footer &#123; position: sticky; bottom: 0; &#125;</code>
      </div>

      <div className="sticky-example__demo">
        <div className="sticky-footer-demo">
          <div className="sticky-footer-demo__content">
            <h2>Product Details</h2>
            {Array.from({ length: 12 }, (_, i) => (
              <p key={i}>
                Product information paragraph {i + 1}. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit.
              </p>
            ))}
          </div>
          <footer className="sticky-footer-demo__footer">
            <div className="sticky-footer-demo__actions">
              <button className="sticky-footer-demo__btn sticky-footer-demo__btn--secondary">
                Add to Cart
              </button>
              <button className="sticky-footer-demo__btn sticky-footer-demo__btn--primary">
                Buy Now
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

/**
 * Example 6: Sticky Columns - Fixed columns in tables
 */
const StickyColumns: FC = () => {
  return (
    <div className="sticky-example sticky-columns-example">
      <div className="sticky-example__description">
        <h3>Sticky Table Columns</h3>
        <p>
          Keep specific columns (usually first column) visible when scrolling
          horizontally. Essential for wide tables with many columns.
        </p>
        <code>th:first-child &#123; position: sticky; left: 0; &#125;</code>
      </div>

      <div className="sticky-example__demo">
        <div className="sticky-columns-demo">
          <table className="sticky-columns-demo__table">
            <thead>
              <tr>
                <th className="sticky-columns-demo__fixed-col">Product</th>
                <th>Jan</th>
                <th>Feb</th>
                <th>Mar</th>
                <th>Apr</th>
                <th>May</th>
                <th>Jun</th>
                <th>Jul</th>
                <th>Aug</th>
                <th>Sep</th>
                <th>Oct</th>
                <th>Nov</th>
                <th>Dec</th>
              </tr>
            </thead>
            <tbody>
              {['Product A', 'Product B', 'Product C', 'Product D'].map(
                (product) => (
                  <tr key={product}>
                    <td className="sticky-columns-demo__fixed-col">
                      {product}
                    </td>
                    {Array.from({ length: 12 }, (_, i) => (
                      <td key={i}>${Math.floor(Math.random() * 10000)}</td>
                    ))}
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CssStickyExamples;
