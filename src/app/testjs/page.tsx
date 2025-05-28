'use client'


import {useState} from "react";

export default function Page() {

    const dateNew = new Date();
    const {
        getTime,
        getTimezoneOffset,
        getUTCDate,
        getUTCMilliseconds,
        getUTCSeconds,
        getUTCMinutes,
        getUTCHours,
        getUTCDay,
        getUTCMonth,
        getUTCFullYear,
        getDate,
        getMilliseconds,
        getSeconds,
        getMinutes,
        getHours,
        getDay,
        getMonth,
        getFullYear,
    } = dateNew;


    // const month = (getMonth() + 1).toString().padStart(2, '0');
    // const day = getDate().toString().padStart(2, '0');
    // const hour = getHours().toString().padStart(2, '0');
    // const minute = getMinutes().toString().padStart(2, '0');
    // const year = getFullYear();
    // const second = getSeconds().toString().padStart(2, '0');

    // return `${year}-${month}-${day} ${hour}:${minute}:${second}`;


    const [date, setDate] = useState(dateNew.getDate())

    return (
        <p>Hello {date}</p>
    );
}
