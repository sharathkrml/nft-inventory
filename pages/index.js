import { useEffect, useState } from "react";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { MUMBAI_URL, POLYGON_URL } from "../constants";
import { useMetamask, useAddress, useDisconnect } from "@thirdweb-dev/react";
export default function Home() {
  const mumbaiweb3 = createAlchemyWeb3(
    `${MUMBAI_URL}${process.env.NEXT_PUBLIC_API}`
  );
  const polygonweb3 = createAlchemyWeb3(
    `${POLYGON_URL}${process.env.NEXT_PUBLIC_API}`
  );
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectButton = useDisconnect();
  const [polygonNfts, setPolygonNfts] = useState();
  const [mumbaiNfts, setMumbaiNfts] = useState();
  useEffect(async () => {
    if (address) {
      const mumbainfts = await mumbaiweb3.alchemy.getNfts({
        owner: address,
      });
      setMumbaiNfts(mumbainfts);
      const polygonnfts = await polygonweb3.alchemy.getNfts({
        owner: address,
      });
      setPolygonNfts(polygonnfts);
      console.log("mumbai=>", mumbainfts);
      console.log("polygon=>", polygonnfts);
    }
  }, [address]);

  return (
    <nav className="flex justify-end">
      <div>
        {address ? (
          <div className="px-2 py-2 rounded-lg border-2 mr-4 mt-4 bg-slate-800 text-white">
            {address.substring(0, 9)}...
            <button onClick={disconnectButton} className="text-red-500 ml-6">
              X
            </button>
          </div>
        ) : (
          <button
            onClick={connectWithMetamask}
            className="px-10 py-2 rounded-lg border-2 mr-4 mt-4 bg-slate-800 text-white"
          >
            Connect to wallet
          </button>
        )}
      </div>
    </nav>
  );
}
