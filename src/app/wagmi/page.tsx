'use client'

import {useAccount, useConnect, useEnsName} from "wagmi";

export default function Page() {

    const {connectors, connect} = useConnect()
    const {address} = useAccount()


    return (<div>
        {
            connectors.map((connector) => (
                <button key={connector.uid} onClick={() => connect({connector})}
                className='border'>
                    {connector.name}
                </button>
            ))

        }
        Address : {address}
    </div>)
}
