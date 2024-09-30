import styled from "styled-components";

const MainButton = styled.button`
  background-color: #d10024;
  color: #fff;
  border: none;
  padding: 6px 15px;
  border-radius: 21px;
  font-size: 17px;
  text-transform: uppercase;
  transition: 0.5s;
  &:hover {
    background-color: #7c0015;
    transition: 0.5s;
  }
`;

export default MainButton;