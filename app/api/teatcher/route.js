import prisma from "@/util/connection";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/util/auth";

export const GET=async(req)=>{
    const session = await getAuthSession();
    if(!session)return new NextResponse(JSON.stringify("Auth required"),{status:400})
    
    
    try {
        const teatcherCourses=await prisma.course.findMany({
            where:{
                userEmail:session.user.email
            },
            select:{
                id:true,
                title:true,
                createdAt:true,
                catID:true,
                publish:true
            }
        }
        )
       console.log(teatcherCourses)
        return new NextResponse(JSON.stringify(teatcherCourses),{status:200})
    
    } catch (error) {
        return new NextResponse(JSON.stringify(error),{status:500})
    }
    

}