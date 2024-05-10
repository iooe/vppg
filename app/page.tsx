"use client";

import Image from "next/image";
import React, { useState, useEffect } from 'react';
import {Canvas} from "@/app/View/canvas";
import {Button} from "@/components/ui/button";
import {Commands} from "@/app/View/Commands/commads-viewer";
import Menu from "@/app/View/Menu/menu";
import {Example} from "@/app/View/Draggable/example";

export default function Home() {


  useEffect(() => {

  });


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
