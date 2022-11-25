import logo from "./logo.svg";
import "./App.css";
import Stock from "highcharts/modules/stock";
import axios from "axios";
import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import StockTools from "highcharts/modules/stock-tools.js";
import {
  Chart,
  ChartDiv,
  Space,
  StyledButton,
  StyledButtonContainer,
} from "./components/StyledComponents";

StockTools(Highcharts);

function App() {
  const [stock, setStock] = useState("AAPL:NASDAQ");

  const StockAndColor = (props) => {
    setStock((stock) => (stock = props));
  };

  Stock(Highcharts);
  const [data, setData] = useState();
  const [error, setError] = useState();
  const getData = () => {
    axios
      .get(`https://stockdata.test.quantfolio.dev/ticker/${stock}/values`)
      .then((response) => {
        setData(response.data);
      })
      .catch((response) => {
        setError(response);
      });
  };
  useEffect(() => {
    getData();
  }, [stock]);
  if (data) {
    const into = data.map((item) => ({
      datetime: Date.parse(item.datetime),
      open: parseFloat(item.open),
      high: parseFloat(item.high),
      low: parseFloat(item.low),
      close: parseFloat(item.close),
      volume: parseFloat(item.volume),
    }));

    const outputData = into.map(Object.values);

    const options = {
      rangeSelector: {
        buttons: [
          {
            type: "year",
            count: 1,
            text: "1YRS",
          },
          {
            type: "year",
            count: 5,
            text: "5YRS",
          },
          {
            type: "all",
            text: "MAX",
          },
        ],
      },
      title: {
        text: stock,
        style: {
          color: "black",
        },
      },

      series: [
        {
          name: stock,
          type: "ohlc",
          data: outputData.sort(),
          turboThreshold: 5000,
          color: "#00CCFF",
        },
      ],
      chart: {
        backgroundColor: "#324f6d",
      },
    };
    if (data)
      return (
        <div className="App">
          <section>
            <Space />
            <ChartDiv>
              <HighchartsReact
                highcharts={Highcharts}
                options={options}
                constructorType={"stockChart"}
              />
            </ChartDiv>
            <Space />
            <StyledButtonContainer>
              <StyledButton onClick={() => StockAndColor("AAPL:NASDAQ")}>
                AAPL:NASDAQ
              </StyledButton>
              <StyledButton onClick={() => StockAndColor("MSFT:NASDAQ")}>
                MSFT:NASDAQ
              </StyledButton>
              <StyledButton onClick={() => StockAndColor("ADBE:NASDAQ")}>
                ADBE:NASDAQ
              </StyledButton>
              <StyledButton onClick={() => StockAndColor("GOOGL:NASDAQ")}>
                GOOGL:NASDAQ
              </StyledButton>
            </StyledButtonContainer>
          </section>
        </div>
      );
  }
}

export default App;
