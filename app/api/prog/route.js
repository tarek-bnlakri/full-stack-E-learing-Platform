import prisma from "@/util/connection";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/util/auth";


export const GET=async(req) => {
     const {searchParams}=new URL(req.url)
     const userEmail=searchParams.get('userEmail')
    
     if(!userEmail){
      return new NextResponse(JSON.stringify("Auth is required"),{status:400})
     }
 
      try {
            
        const courseIDs = await prisma.Progression.findMany({
          where: {
            userId: userEmail
          },
          select: {
            courseId: true
          }
        });
        
        const courseIdsArray = courseIDs.map(course => course.courseId); 
        
        const userCourses = await prisma.Course.findMany({
          where: {
            id: {
              in: courseIdsArray 
            }
          },
          include:{
            chapters:true,
            progression:{
              where:{
                userId:userEmail
              }
            },
            user:true,
            couments:{
              where:{
                userEmail
              }

            }

          }
        });
        
    
        if (userCourses.length > 0) {
          console.log(userCourses)
          return new NextResponse(JSON.stringify(userCourses), { status: 200 });
        } else {
          return new NextResponse(JSON.stringify("No Courses Found"), { status: 404 });
        }
      } catch (error) {
        console.error("Error fetching user courses:", error);
        return new NextResponse(JSON.stringify("Internal Server Error"), { status: 500 });
      }
    
  };

export const POST=async(req)=>{
    const session = await getAuthSession();
    console.log('from post methode',session);
    const body = await req.json()
        const {chapterName,courseId} =body
        console.log("from progres route",chapterName,courseId)
        try {
            const progres= await prisma.Progression.create({
                data:{
                    ...{courseId,chapterNameRef:chapterName,isCompleted:true},userId:session.user.email
                }
            })
            return new NextResponse(JSON.stringify(progres,{status:200}))
        } catch (error) {
            console.log(error)
            return new NextResponse(JSON.stringify(error),{status:500})
        }
}


  