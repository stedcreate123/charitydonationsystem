import ReactDOM from "react-dom/client";
import "./index.css";
import { RecoilRoot } from "recoil";
import "./index.css";
import Layout from "./Layout";
// import "regenerator-runtime/runtime";
import { WagmiProvider } from "./context/WagmiContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <RecoilRoot>
    <WagmiProvider>
      <Layout />
    </WagmiProvider>
  </RecoilRoot>
);
