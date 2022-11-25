import HighchartsReact from "highcharts-react-official";
import styled from "styled-components";

export const StyledButtonContainer = styled.div`
  margin: 0 auto;
  width: 75%;
  display: flex;
  flex-direction: column;
  gap: 1em;
  border: 3px solid black;
  background-color: blue;
`;

export const ChartDiv = styled.div`
  width: 75%;
  margin: 0 auto;
`;

export const StyledButton = styled.button`
  text-align: left;
  background-color: inherit;
  border: none;
  cursor: pointer;
  padding: 1em;
  &:hover {
    background-color: gray;
  }
`;

export const Space = styled.div`
  margin: 1em;
`;
