'use server'

// BuildApiCurl
interface IBuildApiCurl {
    docId: string,
    indices: string
}

async function buildApiCurl(data: IBuildApiCurl) {

    const esbuser = process.env.ESB_USER;
    const esbpass = process.env.ESB_PASS;

    const response = fetch('http://10.0.118.36:5555/rad/yuyun.elasticrepeater.interfaces:YuyunElasticRepeaterDesc/buildApiCurl', {
        method: 'POST',
        headers: {
            ['Accept']: 'application/json',
            ['Content-Type']: 'application/json',
            ['Authorization']: 'Basic ' + btoa(esbuser + ':' + esbpass)
        },
        body: JSON.stringify({
            "indices": data.indices,
            "idDoc": data.docId,
            "targetProtocol": "http",
            "additionalHeaders": {
                "Accept-Encoding": "none"
            },
            "removeHeaders": [
                "Authorization",
                "traceparent",
                "User-Agent",
                "Content-Length",
                "X-dynaTrace",
                "traceNumber",
                "tracestate"
            ]
        }),
        signal: AbortSignal.timeout(10000)
    });

    return await response
        .then(async (res) => {
            const body = await res.text();
            console.log(body)
            return body
        })
        .catch(e => (e as Error).message);


}


// BuildApiNativeCurl
interface IBuildApiNativeCurl {
    docId: string,
    indices: string
}

async function buildApiNativeCurl(data: IBuildApiNativeCurl) {

    const esbuser = process.env.ESB_USER;
    const esbpass = process.env.ESB_PASS;

    const response = fetch('http://10.0.118.36:5555/rad/yuyun.elasticrepeater.interfaces:YuyunElasticRepeaterDesc/buildNativeCurl', {
        method: 'POST',
        headers: {
            ['Accept']: 'application/json',
            ['Content-Type']: 'application/json',
            ['Authorization']: 'Basic ' + btoa(esbuser + ':' + esbpass)
        },
        body: JSON.stringify({
            "indices": data.indices,
            "idDoc": data.docId,
            "additionalHeaders": {
                "Accept-Encoding": "none"
            },
            "removeHeaders": [
                "Authorization",
                "traceparent",
                "User-Agent",
                "Content-Length",
                "X-dynaTrace",
                "traceNumber",
                "tracestate"
            ]
        }),
        signal: AbortSignal.timeout(10000)
    });

    return await response
        .then(async (res) => {
            const body = await res.text();
            console.log(body)
            return body
        })
        .catch(e => (e as Error).message);

}

export {buildApiCurl, buildApiNativeCurl}