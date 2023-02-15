import React from 'react';
import { useQRCode } from 'next-qrcode';
import Debit from '.';


const WithQR = () => {
	const { Canvas } = useQRCode();
    return (
        <>
            <div className='w-full md:w-3/4'>
                <Debit />
            </div>
            <div className='hidden md:flex flex-col items-center gap-8 bg-[#D6F0FB] rounded-2xl py-6 px-4'>
                <Canvas
                    text={'https://github.com/frdrcpeter007'}
                    options={{
                        level: 'M',
                        margin: 2,
                        scale: 4,
                        color: {
                            dark: '#010599FF',
                            light: '#FFF',
                        },
                    }}
                />
                <span className='-rotate-90 font-extralight'>Scan me</span>
            </div>
        </>
    );
}

export default WithQR;
