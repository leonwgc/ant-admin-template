import React from 'react';
import { styled, PopMenu } from 'react-uni-comps';
import { useUpdateStore, useAppData } from 'simple-redux-store';

const StyledSetting = styled.div`
  position: fixed;
  right: 8px;
  top: ${window.innerHeight / 2.5}px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 4px solid #fff;
  box-shadow: 0 1px 2px 0 rgba(56, 56, 56, 0.15);
  cursor: pointer;
`;

const StyledPopMenu = styled(PopMenu)`
  .list {
    padding: 16px 8px;
    width: 360px;
    display: flex;
    justify-content: space-around;

    .item {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }
  }
`;

export default function Theme() {
  const updateStore = useUpdateStore();
  const { color = '#005cff' } = useAppData();

  return (
    <StyledPopMenu
      trigger="click"
      content={
        <div className="list">
          {['#00bc70', '#005cff', '#f5222d', '#fa541b', '#13c2c2', '#2f54ec', '#712fd1'].map(
            (i) => (
              <div
                className="item"
                style={{ background: i }}
                key={i}
                onClick={() => {
                  updateStore({ color: i });
                }}
              ></div>
            )
          )}
        </div>
      }
    >
      <StyledSetting style={{ background: color }} />
    </StyledPopMenu>
  );
}
