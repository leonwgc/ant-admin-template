import { createFromIconfontCN } from '@ant-design/icons';

import styled from 'styled-components';

const Icon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2639743_szdi6yxzgdr.js',
});

const StyledIcon = styled(Icon)`
  font-size: ${({ fontSize = 16 }) => fontSize}px;
  color: ${({ color }) => color}!important;
`;

export default StyledIcon;
