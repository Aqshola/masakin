"use client"

import Layout from "@/components/wrapper/layout/Layout";
import { animatePageIn } from "@/libs/animation";
import { useEffect } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
    useEffect(()=>{
        animatePageIn()
    },[])
    return <Layout>{children}</Layout>
}