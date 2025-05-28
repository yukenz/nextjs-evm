'use client'

import {useAccount, useConnect, useReadContract} from "wagmi";
import {abi as abiIDRC} from "@/abi/IDRC";

export default function Page() {

    const {connectors, connect} = useConnect()
    const {address, chain} = useAccount()

    const {data,error,status} = useReadContract({
        abi: abiIDRC,
        address: '0xb7DD997EBA164209e2753C4A70Fb3CF6b70A0f8F',
        functionName: 'balanceOf',
        args: [address as '0x{string}']
    });

    console.log("data", data)

    return (<div>
        {
            connectors.map((connector) => (
                <button
                    key={connector.uid}
                    onClick={() => connect({connector})}
                    className='border'
                >
                    {connector.name}
                </button>
            ))

        }

        <p>
            Address : {address} {chain?.name}
        </p>
        <p>
            Data: {data} {status}
        </p>
    </div>)
}
