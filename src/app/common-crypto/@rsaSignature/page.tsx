'use client'

import TextArea from "@/component/retro/TextArea";
import {FormEventHandler, useEffect} from "react";
import Radio from "@/component/retro/Radio";
import Button from "@/component/retro/Button";
import {
    loadGenerateRsaState, loadRsaSignatureState,
    saveGenerateRsaState, saveRsaSignatureState,
    setGenerateRsaKey, setRsaSignature, setRsaSignatureError,
    useCommonCryptoSelector
} from "@/state/common-crypto/commonCryptoSlice";
import {useStoreDispatch} from "@/state/store";

import Input from "@/component/retro/Input";
import cn from "classnames";
import toast from "react-hot-toast";
import {doRsaSignature} from "@/backend/cryptography";


export default function Page() {

    const commonCryptoState = useCommonCryptoSelector();
    const dispatch = useStoreDispatch();

    const onSubmitForm: FormEventHandler<HTMLFormElement> = async (event) => {

        event.preventDefault()
        const formData = new FormData(event.currentTarget);

        const privateKey = formData.get('PK') as string;
        const message = formData.get('MSG') as string;
        const algorithm = formData.get('ALG') as string;

        try {
            const signature = await doRsaSignature({privateKey, message, algorithm});
            dispatch(setRsaSignature({
                privateKey: privateKey,
                messageSignature: message,
                resultSignature: signature,
                resultFieldDisable: false,
                resultFieldColor: 'text-green-500'
            }))
            dispatch(saveRsaSignatureState())
        } catch (e) {
            dispatch(setRsaSignatureError((e as Error).message))
        }
    };

    useEffect(() => {
        dispatch(loadRsaSignatureState())
    }, []);


    return <>

        <h1 className="mb-6 text-4xl font-black text-black">RSA Signature Generator</h1>
        <p className="text-lg text-black">This is a retro-styled website with a nostalgic navbar.</p>

        {/* Form Area */}
        <form
            className="flex flex-col h-full p-3.5 gap-1"
            name='signature-form'
            onSubmit={onSubmitForm}
        >
            {/* Private Key Field */}
            <TextArea
                label="Enter Private Key"
                placeholder="Private Key"
                className='h-[200px]'
                name='PK'
                defaultValue={commonCryptoState.rsaSignature?.privateKey}
            />
            {/* Message Field */}
            <TextArea
                label="Enter Message"
                placeholder="Signature Message"
                className='h-[200px] mb-3.5'
                name='MSG'
                defaultValue={commonCryptoState.rsaSignature?.messageSignature}
            />
            {/* Algorithm Field */}
            <Radio
                className='mb-3.5'
                options={[
                    {label: 'SHA256', value: 'SHA256withRSA'},
                    {label: 'SHA512', value: 'SHA512withRSA'},
                ]}
                name='ALG'
                defaultValue="SHA256withRSA"
                label='Algorithm'
            />
            {/* Submit Field */}
            <Button
                className='mb-3.5'
                type='submit'
            >Generate Signature
            </Button>
        </form>

        {/* Result Field */}
        <Input
            disabled={commonCryptoState.rsaSignature.resultFieldDisable}
            defaultValue="Signature Result Here"
            value={commonCryptoState.rsaSignature?.resultSignature}
            className={cn('text-center',
                commonCryptoState.rsaSignature.resultFieldColor
            )}
            onClick={event => {
                const target = event.currentTarget;
                navigator.clipboard.writeText(target.value)
                    .then(value => toast("Signature copied to clipboard", {duration: 1000}))
            }}
        />
    </>
}

