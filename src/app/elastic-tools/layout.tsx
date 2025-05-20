'use client'

import React, {useState} from "react";
import Button from "@/component/retro/Button";


export default function Layout({
                                   children,
                                   buildApiCurl,
                                   buildApiNativeCurl
                               }: {
                                   children: React.ReactNode,
                                   buildApiCurl: React.ReactNode,
                                   buildApiNativeCurl: React.ReactNode,

                               }
) {

    const [tabs, setTabs] = useState<'buildApiCurl' | 'buildApiNativeCurl' | undefined>()

    return (
        <main className="container mx-auto px-4 py-12">
            <div className="flex justify-start items-start gap-3">
                <Button
                    className='mb-3.5 w-auto'
                    onClick={() => {
                        setTabs('buildApiCurl')
                    }}
                >Build API Curl
                </Button>
                <Button
                    className='mb-3.5 w-auto'
                    onClick={() => {
                        setTabs('buildApiNativeCurl')
                    }}
                >Build API Native Curl
                </Button>
            </div>
            <div className="rounded-lg border-4 border-orange-100 bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                {tabs == undefined && children}
                {tabs == 'buildApiCurl' && buildApiCurl}
                {tabs == 'buildApiNativeCurl' && buildApiNativeCurl}
            </div>
        </main>
    )
}