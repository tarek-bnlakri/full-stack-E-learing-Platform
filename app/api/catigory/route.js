import prisma from "@/util/connection";

import { NextResponse } from "next/server";

export const GET= async()=>{

    try {
        const catigorys= await prisma.catigory.findMany()
        return new NextResponse(JSON.stringify(catigorys),{status:200})
    } catch (error) {
        return new NextResponse(JSON.stringify("somthing wrong"),{status:500})
    }

}