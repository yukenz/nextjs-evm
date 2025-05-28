'use server'


// CheckIsInstance
interface ICheckIsInstance {
    host: string,
}

interface CheckIsInstanceResponse {
    id: string
    name: string
    status: "up" | "down" | "checking"
    uptime: string
    responseTime: number
    lastCheck: string
    location: string
}


async function checkIsInstance({host}: ICheckIsInstance): Promise<CheckIsInstanceResponse> {

    const startTime = Date.now();

    try {
        const response = await fetch(`${host}/invoke/wm.server/ping`, {
            method: 'GET',
            headers: {
                ['Accept']: 'application/json',
                ['Content-Type']: 'application/json'
            },
            signal: AbortSignal.timeout(10000)
        });
        const totalTime = Date.now() - startTime;

        const responseJson = await response.json();

        return {
            id: host,
            name: host,
            status: response.status == 200 ? 'up' : 'down',
            uptime: 'FULL',
            responseTime: totalTime,
            lastCheck: responseJson?.date,
            location: host
        }

    } catch (e) {

        const errorMessage = (e as Error).message as string;
        const totalTime = Date.now() - startTime;

        return {
            id: host,
            name: host,
            status: "down",
            uptime: errorMessage,
            responseTime: totalTime,
            lastCheck: 'now',
            location: host
        }
    }

}

export {checkIsInstance}