'use client'

import React, {useEffect, useState} from "react"
import {Activity, Clock, Server, Wifi, WifiOff, Zap} from "lucide-react"
import MonitorBox from "@/app/monitoring/MonitorBox";

interface Instance {
    id: string
    name: string
    status: "up" | "down" | "warning"
    uptime: string
    responseTime: number
    lastCheck: string
    location: string
}

const mockInstances1: Instance[] = [
    {
        id: "web-01",
        name: "WEB-SERVER-01",
        status: "up",
        uptime: "99.9%",
        responseTime: 45,
        lastCheck: "2 min ago",
        location: "US-EAST",
    },
    {
        id: "db-01",
        name: "DATABASE-01",
        status: "up",
        uptime: "99.8%",
        responseTime: 12,
        lastCheck: "1 min ago",
        location: "US-WEST",
    },
    {
        id: "api-01",
        name: "API-GATEWAY-01",
        status: "down",
        uptime: "98.2%",
        responseTime: 0,
        lastCheck: "5 min ago",
        location: "EU-CENTRAL",
    },
    {
        id: "cache-01",
        name: "REDIS-CACHE-01",
        status: "warning",
        uptime: "99.1%",
        responseTime: 89,
        lastCheck: "3 min ago",
        location: "ASIA-PACIFIC",
    },
    {
        id: "cdn-01",
        name: "CDN-EDGE-01",
        status: "up",
        uptime: "99.9%",
        responseTime: 23,
        lastCheck: "1 min ago",
        location: "GLOBAL",
    },
    {
        id: "worker-01",
        name: "WORKER-NODE-01",
        status: "up",
        uptime: "97.8%",
        responseTime: 156,
        lastCheck: "4 min ago",
        location: "US-CENTRAL",
    },
]

const instances = [
    "http://10.0.118.39:5555",
    "http://10.0.118.39:5442",
    "http://10.0.118.36:5555",
    "http://10.0.118.36:8888",
    "http://10.0.118.110:5555",
    "http://10.0.118.110:8888",
    "http://10.0.118.108:5555",
    "http://10.0.118.108:8888",
]


export default function Page() {
    const [currentTime, setCurrentTime] = useState(new Date())
    const [refreshRate, setRefreshRate] = useState('10s')
    const [triggerRender, setTriggerRender] = useState(false)


    useEffect(() => {

        /* Scheduler currentTime */
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)

        /* Timer clear when umount */
        return () => {
            clearInterval(timer)
        }

    }, [triggerRender])

    const getStatusColor = (status: string) => {
        switch (status) {
            case "up":
                return "text-green-400"
            case "down":
                return "text-red-400"
            case "warning":
                return "text-yellow-400"
            default:
                return "text-gray-400"
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "up":
                return <Wifi className="w-4 h-4"/>
            case "down":
                return <WifiOff className="w-4 h-4"/>
            case "warning":
                return <Zap className="w-4 h-4"/>
            default:
                return <Server className="w-4 h-4"/>
        }
    }

    const upInstances = mockInstances1.filter((i) => i.status === "up").length
    const downInstances = mockInstances1.filter((i) => i.status === "down").length
    const warningInstances = mockInstances1.filter((i) => i.status === "warning").length


    function Header() {
        return (
            <div className="border border-green-400 p-4 mb-6 bg-black/50">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-4">
                        <div className="text-2xl font-bold tracking-wider">╔═══ SYSTEM MONITOR v2.1 ═══╗</div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm opacity-80">CURRENT TIME</div>
                        <div className="text-lg font-bold tracking-wider" suppressHydrationWarning={true}>{currentTime.toLocaleTimeString()}</div>
                    </div>
                </div>

                <div className="flex items-center gap-8 text-sm">
                    <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4"/>
                        <span>MONITORING ACTIVE</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <span className="text-green-400">● ONLINE: {upInstances}</span>
                        <span className="text-red-400">● OFFLINE: {downInstances}</span>
                        <span className="text-yellow-400">● WARNING: {warningInstances}</span>
                    </div>
                </div>
            </div>
        )
    }


    function MonitorBoxBackup({
                                  children,
                                  instance
                              }: {
        children?: React.ReactNode;
        instance: Instance;
    }) {


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
                                : instance.status === "warning"
                                    ? "bg-yellow-400"
                                    : "bg-red-400"
                        }`}
                        style={{
                            width: instance.status === "up" ? "100%" : instance.status === "warning" ? "60%" : "0%",
                        }}
                    />
                    {instance.status === "up" &&
                        <div className="absolute inset-0 bg-green-400 opacity-50 animate-pulse"/>}
                </div>
            </div>
        )
    }

    function Footer() {
        return (
            <div className="mt-8 border border-green-400 p-4 bg-black/50">
                <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-4">
                        <span className="opacity-80">REFRESH RATE: {refreshRate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3"/>
                        <span className="opacity-80" suppressHydrationWarning={true}>LAST UPDATE: {currentTime.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        )
    }

    function FooterTerminal() {
        return (
            <div className="mt-4 text-xs opacity-60">
                <span className="text-cyan-400">$ click r button for manual refresh</span>
                <span className="animate-pulse">_</span>
            </div>
        )
    }


    return (
        <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
            <div className="relative z-10 p-6">

                {/* Header */}
                <Header/>

                {/* Body */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        instances
                            .map((instance) => <MonitorBox key={instance} reloadState={triggerRender} host={instance}/>)
                    }
                </div>

                {/* Footer */}
                <Footer/>
                <FooterTerminal/>
                <button onClick={() => {
                    setTriggerRender(!triggerRender);
                }}>Re Render
                </button>

            </div>
        </div>
    )
}
