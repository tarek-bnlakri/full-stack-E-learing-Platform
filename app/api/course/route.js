import prisma from "@/util/connection";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/util/auth";
export const GET=async(req)=>{
    // const session= await getAuthSession()
    // if(!session){
    //     return new NextResponse(JSON.stringify("Auth is required"),{status:400})
    // }
    const {searchParams}=new URL(req.url)
    const catid= searchParams.get('catid')
    const userId= searchParams.get('userEmail')
    
    const query={
        where:{...(catid && {catID:catid}),publish:true},
        include:{
                    chapters: true,
                   
                
                    user:true
                }
    }
    try {
            const courses= await prisma.Course.findMany(query)
              
            return new NextResponse(JSON.stringify(courses),{status:200})
    } catch (error) {
        console.log(error)
    }
}

export const POST=async(req)=>{
    const session = await getAuthSession()
    if(!session){
        return new NextResponse(JSON.stringify("Authentication Failed"),{status:401})
    }
    const body= await req.json()
    if(!body.title && !body.catigory){
        return new NextResponse(JSON.stringify("title required and Catigory are required"),{status:401})
    }
    console.log("body",body)
    const {catigory}=body
    if(!catigory.id){
        
        try {
            const newCatigory= await prisma.catigory.create({
                data:{
                    titleCatigory:catigory.titleCatigory
                }
            })
            console.log("Catigory created",newCatigory)
            const newCourse = await prisma.course.create({
                data: {
                    title: body.title,
                    user: {
                        connect: {
                            email: session.user.email
                        }
                    },
                    cat: {
                        connect: {
                            titleCatigory: newCatigory.titleCatigory
                        }
                    },
                }
            });
            
                return new NextResponse(JSON.stringify(newCourse),{status:201})
        } catch (error) {
            console.log(error)
            return new NextResponse(JSON.stringify("Somthing Wrong !"),{status:500})
        }
        
    }

    try {
        const newCourse = await prisma.course.create({
            data: {
                title: body.title,
                user: {
                    connect: {
                        email: session.user.email
                    }
                },
                cat: {
                    connect: {
                        titleCatigory: catigory.titleCatigory
                    }
                },
            }
        });
        
            return new NextResponse(JSON.stringify(newCourse),{status:201})
    } catch (error) {
            console.log(error);
            return new NextResponse(JSON.stringify("Somthing Wrong"),{status:501})
    }
    

}