"use client";

import React from 'react';
import {Canvas} from "@/components/MyComponents/canvas";
import LocalStorage from "@/app/Services/Core/LocalStorage";

export default function Home() {



    return (
        <main className=" min-h-screen flex-col items-center justify-between ">
            {/*<Menu/>*/}

            {/*<Example/>*/}
            <div className="">

                <Canvas/>


            </div>

        </main>
    );
}
