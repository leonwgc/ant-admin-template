import React, { useCallback, useRef } from 'react';
import { useVirtualList } from 'ahooks';
import { Input, Button } from 'antd';

/**
 * overflowAnchor: none to prevent scroll jumping when the content changes
 * 页面内容高度发生变化引起滚动条跳动的问题。浏览器会自动触发onscroll事件，调整滚动条的位置，让滚动条不乱跳动 ;
 * 懒加载的时候由于不断更新列表项内部的高度，因此就会使浏览器自动触发滚动事件，而滚动事件又触发懒加载的更新，形成死循环，造成自动滚动的问题。
 * 在父元素中添加样式overflow-anchor:none就正常了。不知道为啥只有react18，root.render()方式才会有问题
 */

const originalList = Array.from(Array(999).keys());

export default () => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);

  const [value, onChange] = React.useState('');

  const [list, scrollTo] = useVirtualList(originalList, {
    containerTarget: containerRef,
    wrapperTarget: wrapperRef,
    itemHeight: (i) => (i % 2 === 0 ? 42 + 8 : 84 + 8),
    overscan: 5,
  });

  const handeleScrollTo = useCallback(() => {
    if (!value) return;
    scrollTo(Number(value));
  }, [value, scrollTo]);

  return (
    <div>
      <div style={{ textAlign: 'right', marginBottom: 16 }}>
        <Input
          style={{ width: 120 }}
          placeholder="line number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onPressEnter={handeleScrollTo}
        />
        <Button style={{ marginLeft: 8 }} onClick={handeleScrollTo}>
          scroll to
        </Button>
      </div>
      <div
        ref={containerRef}
        style={{
          height: '300px',
          overflow: 'auto',
          border: '1px solid #e8e8e8',
          overflowAnchor: 'none',
        }}
      >
        <div ref={wrapperRef}>
          {list.map((ele) => (
            <div
              style={{
                height: ele.index % 2 === 0 ? 42 : 84,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid #e8e8e8',
                marginBottom: 8,
              }}
              key={ele.index}
            >
              Row: {ele.data}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
