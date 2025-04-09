import { useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { useContext } from "react";
import { SuiContext } from "../context/SuiContext";

function CreateContractButton() {
    const { setContractId} = useContext(SuiContext);
    const { mutate: signAndExecute } = useSignAndExecuteTransaction();

    const handleCreate = () => {
        const tx = {
            kind: "moveCall",
            data: {
                packageObjectId: "",
                module: "Thursday",
                function: "create_contract",
                typeArguments: [],
                arguments: [],
            },
        };

        signAndExecute(
            {transaction: tx},
            {
                onSuccess: (result) => {
                    const contractId = XPathResult.effects.created[0].reference.packageObjectId;
                    setContractId(contractId);
                },
                onError: (error) => console.error("Error creating contract:", error),
            }
        );
    };

    return (
        <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
            onClick={handleCreate}
        >
            Create contract
        </button>
    );
}

export default CreateContractButton;