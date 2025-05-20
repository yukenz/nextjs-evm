'use client'

import {FormEventHandler, use, useState} from "react";
import Button from "@/component/retro/Button";
import Input from "@/component/retro/Input";
import Radio from "@/component/retro/Radio";
import {useElasticSelector, setDocumentId} from "@/state/elastic/elasticSlice";
import {useStoreDispatch} from "@/state/store";
import {buildApiNativeCurl} from "@/backend/elastictools";


export default function Page() {

    const [result, setResult] = useState<string>()

    const elasticState = useElasticSelector();
    const dispatch = useStoreDispatch();

    const onSubmitForm: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);
        const docId = formData.get('DOCID') as string;
        const indices = formData.get('IND') as string;

        const res = await buildApiNativeCurl({docId, indices});
        dispatch(setDocumentId(docId));
        setResult(res);
    };

    return <div className="flex flex-col h-full p-3.5 gap-1">
        <h1 className="mb-6 text-4xl font-black text-black">Build Native Curl API</h1>
        <p className="text-lg text-black">Curl generate based on elastic</p>
        <form
            className="flex flex-col h-full p-3.5 gap-1"
            name='signature-form'
            onSubmit={onSubmitForm}
        >

            {/* Document Id */}
            <Input
                className='mb-3.5'
                name='DOCID'
                label='Document Id'
                defaultValue={elasticState.documentId}
            />

            {/* Indices */}
            <Radio
                className='mb-3.5'
                options={[
                    {label: 'dev-api-gateway', value: 'dev-api-gateway*'},
                    {label: 'dev-openapi-gateway', value: 'dev-openapi-gateway*'}
                ]}
                name='IND'
                defaultValue="dev-api-gateway*"
                label='Indices'
            />

            {/* Submit Field */}
            <Button
                className='mb-3.5'
                type='submit'
            >Generate API Curl
            </Button>
            <p>{result}</p>

        </form>
    </div>;
}
