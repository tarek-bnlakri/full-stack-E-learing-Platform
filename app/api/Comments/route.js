import { NextResponse } from "next/server";
import { getAuthSession } from "@/util/auth";
import prisma from "@/util/connection";

export const GET=async(req)=>{
    const session = await getAuthSession();
    if(!session)
        return new NextResponse(JSON.stringify("Authentication is required"),{status: 401})

    const {searchParams}=new URL(req.url)
    const courseId=searchParams.get('courseId')
    console.log(courseId)
    try {
        const userComment = await prisma.Comment.findFirst({
            where:{
                userEmail:session.user.email,
                courseId
            }
            
        })
     
        return new NextResponse(JSON.stringify(userComment),{status: 200})
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify(error),{status:500})
    }
}

export const POST =async(req)=>{
    const session = await getAuthSession();
    const body=await req.json()
    
    const {userText,rating,courseId}=body
    if(!session)
        return new NextResponse(JSON.stringify("Authentication is required"),{status: 401})
    
    try {
        const comment =await prisma.comment.create({
            data:{
                userText,
                userEmail:session.user.email,
                rating,
                courseId
            }
        })
        return new NextResponse(JSON.stringify("Comment Aded"),{status: 200})
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify(error),{status: 500})
           
    }
}

export const PUT=async(req)=>{
    const session = await getAuthSession();
    const body=await req.json()

    const {id,userText,rating}=body
    if(!session)
        return new NextResponse(JSON.stringify("Authentication is required"),{status: 401})
    
    try {
        const comment =await prisma.comment.update({
            where: {
                id
              },
              data: {
                userText,
                rating
              },
        })
        return new NextResponse(JSON.stringify("Comment updated"),{status: 200})
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify(error),{status: 500})
           
    }
}