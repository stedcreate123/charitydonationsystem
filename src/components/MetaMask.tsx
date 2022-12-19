import { Button } from "@/components";
import { MetaMaskLogo } from "@/assets";
import {
  Connector,
  useAccount,
  useBalance,
  useConnect,
  useDisconnect,
} from "wagmi";
import { LocalStorage, Notification } from "@/utils";
import { useEffect } from "react";

const MetaMask = () => {
  /**
   * Component States
   */
  const { connectAsync, connectors } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data } = useBalance({
    address: address,
  });

  /**
   * Component functions
   */
  const connectToMetamask = async (connector: Connector) => {
    /**
     * Here We Requests For The Accounts
     * => This Will Be The Same For All Users
     * (
     * donor ==> account to use when making donations
     * or
     * organization ==> account to use when receiving the donations
     * )
     */

    if (!window.ethereum) {
      Notification.errorNotification(
        "Please Install MetaMask Extension From Your Browser Store And Try Again."
      );
      return;
    }
    const { chain } = await connectAsync({ connector });

    if (chain.unsupported) {
      Notification.errorNotification("Please Connect To The Mainnet Account.");
      disconnect();
    }
  };

  useEffect(() => {
    if (isConnected) {
      LocalStorage.storeValue("project_address", address);
    }
  }, [isConnected, address]);

  const handleDisconnect = () => {
    disconnect();
  };

  return (
    <section>
      {isConnected ? (
        <section className="flex flex-col gap-2">
          <div className="flex items-center bg-gray-700 rounded-xl py-0 px-2">
            <div className="text-white flex gap-2">
              {data?.formatted}{" "}
              <span className="uppercase">{data?.symbol}</span>
            </div>

            <Button
              title={`${address?.slice(0, 6)}...${address?.slice(
                address?.length - 4,
                address?.length
              )}`}
              button_styles="rounded-xl m-1 px-3 h-[30px] bg-gray-600"
              button_title_wrapper_styles="text-white font-medium mr-2"
            />
          </div>

          <div className="flex justify-end">
            <Button
              title="Disconnect?"
              button_styles="rounded-full px-3 h-[30px] bg-red-600"
              button_title_wrapper_styles="text-white font-medium mr-2"
              purpose={() => handleDisconnect()}
            />
          </div>
        </section>
      ) : (
        connectors.map((connector, connector_index) => (
          <div key={connector_index} className="flex items-center ">
            <div className="w-[3rem] h-[3rem] bg-indigo-500 rounded-full flex justify-center items-center ">
              <img
                src={MetaMaskLogo}
                alt=""
                className="w-[2rem] h-[2rem] object-cover "
              />
            </div>

            <Button
              title="Connect To MetaMask"
              button_styles="bg-indigo-500 px-2 text-sm rounded-full text-white whitespace-nowrap h-[2.5rem]"
              purpose={() => connectToMetamask(connector)}
            />
          </div>
        ))
      )}
    </section>
  );
};

export default MetaMask;
