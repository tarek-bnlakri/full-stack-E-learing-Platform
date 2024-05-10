import prisma from "@/util/connection";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/util/auth";


export const POST = async(req, res) => {
    const session=await getAuthSession()
    if(!session){
        console.log("No auth session")
        return new NextResponse(JSON.stringify("Authentication is required"),{status:500})
    }
    const body = await req.json()
    console.log(body)
    const {id,question,options,answer}=body.value
    const answerNumber = parseInt(answer);
    const newOptions=options.split(/[,]/)
    console.log(id,question,newOptions,answerNumber)
    
    if(!body)
     return new NextResponse(JSON.stringify("All fields are required"),{status:500})
 
    try {
        const newQuize = await prisma.quiz.create({
            data: {
                chapter:id,
                question:question,
                options: newOptions,
                answer:answerNumber
            }
        });
        console.log("New quiz created:", newQuize);
        return new NextResponse(JSON.stringify(newQuize),{status:200})
    } catch (error) {
        console.log("Error creating quiz:", error);
        return new NextResponse(JSON.stringify(error),{status:500})
    
    }
}
export const PUT=async(req)=>{
    const session = await getAuthSession()
    if(!session) return new NextResponse(JSON.stringify("Authntication failed"),{status:500}) 
    const body=await req.json()
    if(!body)
        return new NextResponse(JSON.stringify("all field required"),{status:400}) 
    const{id,question,options,answer}=body.value
    const newOptions=options.split(/[,]/)
    console.log(body)
    
        try {
            const updateQuiz = await prisma.quiz.update({
                where: {
                  id
                },
                data: {
                    question,
                    options:newOptions,
                    answer:parseInt(answer),
                },
              })
              return new NextResponse(JSON.stringify("updated sucses"),{status:200}) 
        } catch (error) {
            console.log(error)
            return new NextResponse(JSON.stringify("Somthing wrong"),{status:500}) 
        }
    
  

}
export const DELETE=async(req)=>{
    const session= await getAuthSession();
    if(!session){
        return new NextResponse(JSON.stringify("Auth failed"),{status:500})
    }
    const {searchParams}= new URL(req.url)
    
    const id=searchParams.get("id")
    console.log("question id",id)
    try {
        const deleteUser = await prisma.quiz.delete({
            where: {
              id
            }
          })
          return new NextResponse(JSON.stringify("deleted sucses"),{status:200}) 
    } catch (error) {
        return new NextResponse(JSON.stringify("Somthing wrong"),{status:500}) 
    }

}
