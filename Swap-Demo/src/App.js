
import './App.css';
import { Index } from "./screens/Index";
// import { Temp } from "./screens/Temp";
import { MoralisProvider } from "react-moralis";

//--fahad bhi
// serverUrl="https://tzl2fe6sobrl.usemoralis.com:2053/server" appId="yN4EdX1I0oAFQl5QMxRNf5omIAe8GxbOC27Q3z02"
// --usman khan
// serverUrl="https://rx2akhzzxjhs.usemoralis.com:2053/server" appId="xVysWuCtP5SHLzG5Q06ZqtLxMI2O8xvavOx9WAZh"

// - Abdullah Qureshi
// serverUrl="https://q09eyrv22atk.usemoralis.com:2053/server" appId="ldenGg4fM7WxXL5X4C98qFlxU7BOVBKl4wVVEd4h"

// https://tzl2fe6sobrl.usemoralis.com:2053/server/functions/getBalance?_ApplicationId=yN4EdX1I0oAFQl5QMxRNf5omIAe8GxbOC27Q3z02

function App() {
  return (
    <div className="App">
       <MoralisProvider serverUrl={process.env.REACT_APP_SERVER_URL} appId={process.env.REACT_APP_APP_ID} > 
        <Index />
        {/* <Temp /> */}
    </MoralisProvider>
    </div>
  );
}

export default App;
