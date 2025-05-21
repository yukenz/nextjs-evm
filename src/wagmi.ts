import {http, createConfig, injected} from 'wagmi'
import {mainnet, sepolia, localhost} from 'wagmi/chains'
import {metaMask} from "@wagmi/connectors";


export const wagmi = createConfig({
    chains: [localhost, mainnet, sepolia],
    transports: {
        [localhost.id]: http('http://localhost:7545'),
        [mainnet.id]: http(),
        [sepolia.id]: http(),
    },
    connectors: [
        injected(),
        metaMask(),
    ],
})

declare module 'wagmi' {
    interface Register {
        config: typeof wagmi
    }
}