import {Server, Wifi, WifiOff, Zap} from "lucide-react";
import React, {useEffect, useState} from "react";
import {checkIsInstance} from "@/backend/uptimechecker";

interface Instance {
    id: string
    name: string
    status: "up" | "down" | "checking"
    uptime: string
    responseTime: number
    lastCheck: string
    location: string
}


export default function MonitorBox({
                                       host,
                                       reloadState,
                                       callbackFn
                                   }: {
    host: string;
    reloadState: boolean;
    callbackFn: (isActive: boolean) => void
}) {


    const initialState: Instance = {
        id: host,
        name: host,
        status: "checking",
        uptime: "NOT AVAILABLE",
        responseTime: -1,
        lastCheck: "now",
        location: host,
    };

    const [instance, setInstance] = useState<Instance>(initialState);


    useEffect(() => {

        (async () => {
            setInstance(initialState);
            const newInstance = await checkIsInstance({host}) as Instance;
            setInstance(newInstance);

            newInstance.status === "up" ? callbackFn(true) : callbackFn(false);
        })()

    }, [reloadState]);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "up":
                return <Wifi className="w-4 h-4"/>
            case "down":
                return <WifiOff className="w-4 h-4"/>
            case "checking":
                return <Zap className="w-4 h-4"/>
            default:
                return <Server className="w-4 h-4"/>
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "up":
                return "text-green-400"
            case "down":
                return "text-red-400"
            case "checking":
                return "text-yellow-400"
            default:
                return "text-gray-400"
        }
    }


    return (
        <div
            key={instance.id}
            className="border border-green-400 bg-black/50 p-4 hover:bg-green-400/5 transition-colors"
        >
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    {getStatusIcon(instance.status)}
                    <span className="font-bold text-sm tracking-wider">{instance.name}</span>
                </div>
                <div
                    className={`text-xs font-bold px-2 py-1 border ${getStatusColor(instance.status)} border-current`}>
                    {instance.status.toUpperCase()}
                </div>
            </div>

            <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                    <span className="opacity-80">LOCATION:</span>
                    <span className="text-cyan-400">{instance.location}</span>
                </div>

                <div className="flex justify-between">
                    <span className="opacity-80">UPTIME:</span>
                    <span className={instance.status === "up" ? "text-green-400" : "text-red-400"}>
                    {instance.uptime}
                  </span>
                </div>

                <div className="flex justify-between">
                    <span className="opacity-80">RESPONSE:</span>
                    <span
                        className={
                            instance.responseTime === 0
                                ? "text-red-400"
                                : instance.responseTime < 50
                                    ? "text-green-400"
                                    : instance.responseTime < 100
                                        ? "text-yellow-400"
                                        : "text-red-400"
                        }
                    >
                    {instance.responseTime === 0 ? "TIMEOUT" : `${instance.responseTime}ms`}
                  </span>
                </div>

                <div className="flex justify-between">
                    <span className="opacity-80">LAST CHECK:</span>
                    <span className="text-gray-400">{instance.lastCheck}</span>
                </div>
            </div>

            {/* Status indicator bar */}
            <div className="mt-3 h-1 bg-gray-800 relative overflow-hidden">
                <div
                    className={`h-full transition-all duration-1000 ${
                        instance.status === "up"
                            ? "bg-green-400"
                            : instance.status === "checking"
                                ? "bg-yellow-400"
                                : "bg-red-400"
                    }`}
                    style={{
                        width: instance.status === "checking" ? "0%" : "100%",
                    }}
                />
                {instance.status === "up" &&
                    <div className="absolute inset-0 bg-green-400 opacity-50 animate-pulse"/>}
            </div>
        </div>
    )
};
