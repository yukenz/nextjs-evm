'use server'

import axios from "axios";

async function checkIsInstance({host}) {

    const startTime = Date.now();

    console.log('start checking');

    try {

        const totalTime = Date.now() - startTime;

        // Fetch
        // const response = await fetch(`${host}/invoke/wm.server/ping`, {
        //     method: 'GET',
        //     headers: {
        //         ['Accept']: 'application/json',
        //         ['Content-Type']: 'application/json'
        //     },
        //     signal: AbortSignal.timeout(500)
        // });
        // const responseJson = await response.json();


        // Axios
        const response = await axios({
                        method: 'GET',
                        url: `${host}/invoke/wm.server/ping`,
                        headers: {
                            ['Accept']: 'application/json'
                        },
                        responseType: "json",
                        responseEncoding: 'utf8',
                        withCredentials: true,
                        timeout: 500
                    });
        const responseJson = await response.data;

        return {
            id: host,
            name: host,
            status: response.status === 200 ? 'up' : 'down',
            uptime: 'FULL',
            responseTime: totalTime,
            lastCheck: responseJson?.date,
            location: host
        }

    } catch (e) {

        const errorMessage = e.message;
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