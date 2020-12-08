import styled from 'styled-components';

export const ContentWrapper = styled.div` 
height: 100%;
width: 100%;
`
export const ContentTop = styled.div`
  position: relative;
  height: 60px;
  width: 100%;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  button{
    position: absolute;
    left: 25px;
    top: 50%;
    transform:translateY(-50%);
  }
`