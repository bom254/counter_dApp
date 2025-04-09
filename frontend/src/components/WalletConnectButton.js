import { useWallets } from "@mysten/dapp-kit";
import { useContext } from "react";
import { SuiContext } from "../context/SuiContext";

function WalletConnectButton() {
    const { connect, disconnect, wallet } = useWallets();
    const { setWallet } = useContext(SuiContext);

    const handleConnect = async() => {
        await connect();
        setWallet(wallet);
    };

    return (
        <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transtion duration-300"
            onClick={wallet ? disconnect : handleConnect}
        >
            {wallet ? `Disconnect (${wallet.accounts[0].address.slice(0, 6)}...)` : "Connect Wallet"}
        </button>
    );
}

export default WalletConnectButton;