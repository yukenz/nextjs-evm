import {NextRequest, NextResponse} from 'next/server';


export async function GET(req: NextRequest, res: NextResponse) {

    const startTime = Date.now();
    const host = "http://10.0.118.39:5555"

    console.log('start checking');

    const headers = {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
    };


    let responseString: string;

    try {
        const response = await fetch(`${host}/invoke/wm.server/ping`, {
            method: 'GET',
            headers: {
                ['Accept']: 'application/json',
                ['Content-Type']: 'application/json'
            },
            credentials: 'same-origin',
            keepalive: true,
            cache: 'no-cache',
            redirect: 'follow',
            priority: 'high',
            signal: AbortSignal.timeout(1000)
        });
        const totalTime = Date.now() - startTime;

        const responseJson = await response.json();

        responseString = JSON.stringify({
                id: host,
                name: host,
                status: response.status === 200 ? 'up' : 'down',
                uptime: 'FULL',
                responseTime: totalTime,
                lastCheck: responseJson?.date,
                location: host
            }
        );


    } catch (e) {

        // @ts-ignore
        const errorMessage = e.message;

        const totalTime = Date.now() - startTime;
        responseString = JSON.stringify({
                id: host,
                name: host,
                status: "down",
                uptime: errorMessage,
                responseTime: totalTime,
                lastCheck: 'now',
                location: host
            }
        );
    }


    console.log(responseString)

    return new Response(responseString, {
        headers
    });
}
