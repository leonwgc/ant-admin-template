import React from 'react';
import { Icon, styled, Avatar, useUnmount, ErrorBoundary } from 'react-uni-comps';
import { getThemeColorCss } from 'react-uni-comps/es/themeHelper';
import { useAppData, useUpdateStore } from 'simple-redux-store';
import OrgTree from 'src/v2/common/OrgTree';

//#region  style & other

const StyledWrap = styled.div`
  width: 225px;
  flex: none;
  min-height: calc(100vh - 76px);
  border-right: 1px solid #dcdee0;
  background-color: #fff;
  padding: 20px;

  .h {
    height: unset;
    .ant-tree .ant-tree-node-content-wrapper {
      height: unset;
      padding: 4px;
    }
  }

  .company {
    margin-bottom: 10px;
    ${getThemeColorCss('color')}
    user-select: none;
    cursor: pointer;

    .uc-avatar {
      ${getThemeColorCss('background-color')}
      color: #fff;
      border-radius: 2px;
      margin-right: 10px;
    }
  }
`;

//#endregion

// store: selectedOrg

const iconFun = () => <Icon type="icon-bumen" style={{ color: ' #979797' }} />;

function LeftOrgSelect(props) {
  const { orgInfo = {} } = useAppData(({ app }) => app);
  const updateStore = useUpdateStore();

  useUnmount(() => {
    updateStore({
      selectedOrg: undefined,
    });
  });

  return (
    <StyledWrap>
      {orgInfo.custId && (
        <ErrorBoundary>
          <OrgTree
            showSearch
            selectable
            checkable={false}
            icon={iconFun}
            extra={
              <div className="company" onClick={() => updateStore({ selectedOrg: undefined })}>
                <Avatar size={22}>{orgInfo?.name?.[0]}</Avatar>
                <span className="name">{orgInfo.name}</span>
              </div>
            }
            onSelect={(keys, e) => {
              if (e.selected) {
                updateStore({
                  selectedOrg: { name: e.selectedNodes[0].name, id: e.selectedNodes[0].id },
                });
              } else {
                updateStore({
                  selectedOrg: null,
                });
              }
            }}
          />
        </ErrorBoundary>
      )}
    </StyledWrap>
  );
}

export default LeftOrgSelect;
