import { useSuiClient } from "@mysten/dapp-kit";
import { useState, useEffect } from "react";
import { useSignAndExecuteTransaction } from "@mysten/dapp-kit";

function ContractDetails({ contractId }) {
    const suiClient = useSuiClient();
    const [counter, setCounter] = useState(0);
    const [ value, setValue ] = useState(0);
    const [loading, setLoading] = useState(false);
    const {mutate: signAndExecute} = useSignAndExecuteTransaction();

    // Fetching contract data
    useEffect(() => {
        const fetchData = async () => {
            const object = await suiClient.getObject({ id: contractId, options: {showContent:true}});
            const fields = object.data.content.fields;
            setCounter(fields.counter);
            setValue(fields.value);
        };
        fetchData();
    }, [contractId, suiClient]);

    const handleIncrement = () => {
        setLoading(true);
        const tx = {
            kind: "moveCall",
            data: {
                packageObjectId: "",
                module: "Thursday",
                function: "increment",
                typeArguments: [],
                arguments: [contractId],
            },
        };

        signAndExecute(
            {transaction: tx},
            {
                onSuccess: async () => {
                    const updateObject = await suiClient.getObject({ id: contractId, options: { showContent: true}});
                    setCounter(updateObject.data.content.fields.counter);
                    setLoading(false);
                },
                onError: (error) => {
                    console.error("Error incrementing:", error);
                    setLoading(false);
                },
            }
        );
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-6 animate-fade-in">
            <h2 className="text-2x1 font-bold text-gray-800 mb-4">My Contract</h2>
            <p className="text-gray-700">Counter: {counter}</p>
            <p className="text-gray-700">Value: {value}</p>
            <button 
                className={`mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 ${
                    counter >=100 || loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleIncrement}
                disabled={counter >= 100 || loading}
                aria-label="Increment counter"
            >
                {loading ? "Processing..." : "Increment"}
            </button>
        </div>
    );
}

export default ContractDetails;