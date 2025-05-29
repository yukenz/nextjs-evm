declare module "@/backend/backend" {

    declare function add(a: number, b: number): number;

    declare function multiply(a: number, b: number): number;

    export {add, multiply};

}

declare module "@/backend/uptimechecker" {

    declare interface ICheckIsInstance {
        host: string,
    }

    export declare interface Instance {
        id: string
        name: string
        status: "up" | "down" | "checking"
        uptime: string
        responseTime: number
        lastCheck: string
        location: string
    }

    export declare async function checkIsInstance(props: ICheckIsInstance)
        : Promise<Instance>;

}