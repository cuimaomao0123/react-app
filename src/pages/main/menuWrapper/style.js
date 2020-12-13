import styled from 'styled-components';

export const MenuWrapper = styled.div`
  position: relative;
  width: ${props => props.width} + 'px';
  height: 100%;
  background-color: #495060;
  .logo{
    height: 60px;
    width: 60px;
    position: absolute;
    left: 45%;
    transform: translateX(-50%);
    margin-top: 15px;
  }
`