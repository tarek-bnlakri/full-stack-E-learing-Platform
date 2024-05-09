import prisma from "@/util/connection";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/util/auth";

export const GET=async(req)=>{

    const {searchParams}=new URL(req.url)
    const chapterName= searchParams.get('chapterName')
    const userId= searchParams.get('userEmail')
    try {
        const chapter= await prisma.Chapter.findUnique({
            where:{
                 id:chapterName,
                  
                  
            },
            include:{
                progressions:{where:{
                    userId
                },

            },
            quiz:true
            }
           
        })
        return new NextResponse(JSON.stringify(chapter),{status:200})
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify(error),{status:501})
    }


}
export const POST = async(req, res) => {
    const session=await getAuthSession()
    if(!session){
        console.log("No auth session")
        return new NextResponse(JSON.stringify("Authentication is required"),{status:500})
    }
    const body = await req.json()
    if(!body.chapterName || !body.courseID){
        console.log("chapterNmae and courseId",body.chapterName,body.courseID)
        return new NextResponse(JSON.stringify("chapter Name is required and course id"),{status:500})
    }
    console.log(body)
    try {
        const newChapter = await prisma.chapter.create({
            data: {
                chapterName: body.chapterName,
                courseID: body.courseID
            }
        });
        console.log("New chapter created:", newChapter);
        return new NextResponse(JSON.stringify(newChapter),{status:200})
    } catch (error) {
        console.log("Error creating chapter:", error);
        return new NextResponse(JSON.stringify(error),{status:500})
    
    }
}

export const DELETE=async(req)=>{
    const session= await getAuthSession();
    if(!session){
        return new NextResponse(JSON.stringify("Auth failed"),{status:500})
    }
    const {searchParams}= new URL(req.url)
    
    const id=searchParams.get("id")
    console.log("chapter id",id)
    try {
        const deleteUser = await prisma.chapter.delete({
            where: {
              id
            }
          })
          return new NextResponse(JSON.stringify("deleted sucses"),{status:200}) 
    } catch (error) {
        return new NextResponse(JSON.stringify("Somthing wrong"),{status:500}) 
    }

}
export const PUT=async(req)=>{
    const session = await getAuthSession()
    if(!session) return new NextResponse(JSON.stringify("Authntication failed"),{status:500}) 
    const body=await req.json()
    console.log(body)
    if(body.chapterName){
        try {
            const updateChapter = await prisma.chapter.update({
                where: {
                  id: body.id,
                },
                data: {
                    chapterName: body.chapterName,
                },
              })
              return new NextResponse(JSON.stringify("updated sucses"),{status:200}) 
        } catch (error) {
            console.log(error)
            return new NextResponse(JSON.stringify("Somthing wrong"),{status:500}) 
        }
    }
    if(body.content){
        try {
            const updateChapter = await prisma.chapter.update({
                where: {
                  id: body.id,
                },
                data: {
                    content:body.content,
                },
              })
              return new NextResponse(JSON.stringify("updated sucses"),{status:200}) 
        } catch (error) {
            console.log(error)
            return new NextResponse(JSON.stringify("Somthing wrong"),{status:500}) 
        }
    }
    if(body.publish==false||body.publish==true){
        try {
            const updateChapter = await prisma.chapter.update({
                where: {
                  id: body.id,
                },
                data: {
                    publish: body.publish,
                },
              })
              return new NextResponse(JSON.stringify("updated sucses"),{status:200}) 
        } catch (error) {
            console.log(error)
            return new NextResponse(JSON.stringify("Somthing wrong"),{status:500}) 
        }
    }
    if(body.image){
        try {
            const updateChapter = await prisma.chapter.update({
                where: {
                  id: body.id,
                },
                data: {
                    image:body.image,
                },
              })
              return new NextResponse(JSON.stringify("updated sucses"),{status:200}) 
        } catch (error) {
            console.log(error)
            return new NextResponse(JSON.stringify("Somthing wrong"),{status:400}) 
        }
    }

}