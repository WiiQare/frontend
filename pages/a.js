import React, { useEffect } from 'react';
import { useSession } from "next-auth/react";
import Router from "next/router";

const A = () => {
    const {status, data} = useSession();

    useEffect(() => {
       if(status === 'unauthenticated') Router.replace('/login')
    }, [status]);

    if (status === 'authenticated') 
        return (
            <div>
                Protected
            </div>
        )

    return <>Loading...</>
}

export default A;
