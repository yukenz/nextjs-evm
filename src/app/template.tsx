'use client'

import Navbar from "@/component/retro/Navbar";
import React from "react";
import {ToastBar, Toaster} from "react-hot-toast";
import {Provider} from "react-redux";
import {store} from "@/state/store";

export default function Template({children}: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <Navbar/>
            <Toaster
                position='bottom-center'
            >
                {(t) => (
                    <ToastBar
                        toast={t}
                        style={{
                            ...t.style,
                            animation: t.visible
                                ? 'custom-enter 1s ease'
                                : 'custom-exit 1s ease forwards',
                            border: 'black solid 2px'
                        }}
                    />
                )}
            </Toaster>
            {children}
        </Provider>
    )
}