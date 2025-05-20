
export interface CommonCryptoState {
    generateRsa: {
        publicKey?: string;
        privateKey?: string;
        resultFieldDisable: boolean;
    }
    rsaSignature: {
        privateKey?: string;
        messageSignature?: string;
        resultSignature?: string;
        resultFieldDisable: boolean;
        resultFieldColor: 'text-black' | 'text-green-500' | 'text-red-500'
    }
}


//
// export const initialState: CommonCryptoState = {
//     generateRsa: {
//         resultFieldDisable: true
//     },
//     rsaSignature: {
//         resultFieldDisable: true,
//         resultFieldColor: "text-black"
//     }
// }

// export const initialState = createServerFn({type: 'static'}).handler(() => {
//     const item = localStorage.getItem('common-crypto');
//     if (typeof item == "string") {
//         console.log('loaded state', item);
//         return JSON.stringify(item) as unknown as CommonCryptoState;
//     }
//
//     return {
//         generateRsa: {
//             resultFieldDisable: true
//         },
//         rsaSignature: {
//             resultFieldDisable: true,
//             resultFieldColor:
//                 "text-black"
//         }
//     } as CommonCryptoState
// })


export const initialState = () => {

    // const item = localStorage.getItem('common-crypto');
    // if (typeof item == "string") {
    //     console.log('loaded state', item);
    //     return JSON.stringify(item) as unknown as CommonCryptoState;
    // }

    return {
        generateRsa: {
            resultFieldDisable: true
        },
        rsaSignature: {
            resultFieldDisable: true,
            resultFieldColor:
                "text-black"
        }
    } as CommonCryptoState
}