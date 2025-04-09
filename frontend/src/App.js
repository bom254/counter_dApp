import { useWallets, useSuiClient } from "@mysten/dapp-kit";
import { useContext, useEffect } from "react";
import { SuiContext } from "./context/SuiContext";
import WalletConnectButton from "./components/WalletConnectButton";
import CreateContractButton from "./components/CreateContractButton";
import ContractDetails from "./components/ContractDetails";

function App() {
    const { wallet, setContractId, contractId} = useContext(SuiContext);
    const suiClient = useSuiClient();

    // Checking for existing contract when the wallet connects
    useEffect(() => {
        if(wallet) {
            const fetchContract = async () => {
                const objects = await suiClient.getOwnedObjects({
                    owner: wallet.accounts[0].address,
                    filter: {StructType: "ID::Thursday::MyContract"},
                    options: { showContent: true},
                });
                if(objects.data.length > 0) {
                    setContractId(objects.data[0].data.objectId);
                }
            };
            fetchContract();
        }
    }, [wallet, suiClient, setContractId]);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
            <header className="w-full max-w-4x1 flex justify-between items-center py-4">
                <h1 className="text-3x1 font-bold text-gray-800">Sui Wednesday App</h1>
                <WalletConnectButton />
            </header>
            <main className="w-full max-w-4x1 flex-grow flex items-center justify-center">
                {!wallet ? (
                    <p className="text-gray-600">Please connect your wallet to start.</p>
                ) : !contractId ? (
                    <CreateContractButton />
                ) : (
                    <ContractDetails contractId={contractId} />
                )}
            </main>
        </div>
    );
}

export default App;