import prisma from "@/util/connection";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/util/auth";

export const GET=async(req,{params})=>{

    const {email}=params
    try {
        const user=await prisma.user.findUnique({
            where:{
                email
            },
            include:{
                courses:{include:{chapters:true}}
            }
        }
        )
        return new NextResponse(JSON.stringify(user),{status:200})
    
    } catch (error) {
        return new NextResponse(JSON.stringify(error),{status:500})
    }
    

}