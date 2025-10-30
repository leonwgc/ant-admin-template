import React from 'react';
import './CssFeature.scss';

interface CssFeatureProps {}

const CssFeature: React.FC<CssFeatureProps> = () => {
  return (
    <div className="css-feature-demo">
      <h2>CSS 新特性演示</h2>
      <section>
        <h3>accent-color</h3>
        <input type="checkbox" className="css-feature-demo__accent" />
        <input type="range" className="css-feature-demo__accent" />
      </section>
      <section>
        <h3>caret-color</h3>
        <input
          type="text"
          className="css-feature-demo__caret"
          placeholder="输入时光标为绿色"
        />
      </section>
      <section>
        <h3>::marker</h3>
        <ul>
          <li
            style={{ listStyle: 'disc' }}
            className="css-feature-demo__market"
          >
            自定义 marker
          </li>
        </ul>
      </section>
      <section>
        <h3>:user-valid / :user-invalid</h3>
        <input
          type="email"
          className="css-feature-demo__user-valid css-feature-demo__user-invalid"
          placeholder="请输入邮箱"
          required
        />
      </section>
      <section>
        <h3>:placeholder-shown</h3>
        <input
          type="text"
          className="css-feature-demo__placeholder-shown"
          placeholder="有 placeholder 时高亮"
        />
      </section>
      <section>
        <h3>text-wrap: balance</h3>
        <div
          className="css-feature-demo__balance"
          style={{ width: 300, border: '1px solid #eee', padding: 8 }}
        >
          这是一段很长的文本，用于演示 text-wrap: balance
          的效果。它会让文本在多行时更均匀地分布。
        </div>
      </section>
      <section>
        <h3>scroll-snap-type</h3>
        <div className="css-feature-demo__scroll-snap">
          <div className="css-feature-demo__scroll-snap-item">Item 1</div>
          <div className="css-feature-demo__scroll-snap-item">Item 2</div>
          <div className="css-feature-demo__scroll-snap-item">Item 3</div>
          <div className="css-feature-demo__scroll-snap-item">Item 4</div>
          <div className="css-feature-demo__scroll-snap-item">Item 5</div>
          <div className="css-feature-demo__scroll-snap-item">Item 6</div>
        </div>
      </section>
    </div>
  );
};

export default CssFeature;
