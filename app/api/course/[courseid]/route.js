import prisma from "@/util/connection";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/util/auth";


export const GET=async(req,{params})=>{
    const {searchParams}=new URL(req.url)
    const userEmail=searchParams.get('userEmail')
    const session = await getAuthSession()
        const {courseid}=params
        if(userEmail){
          console.log("FROM THE IF STAAAAAAT")
            try {
            
                const course = await prisma.course.findUnique({
                    where: {
                      id: courseid,
                    },
                    include: {
                      chapters: true,
                      progression: {
                        where: {
                          userId: userEmail,
                        },
                      },
                      user:{
                        
                        include:{
                            courses:{
                              where:{publish:true}
                                
                            }
                        }
                      },
                      couments:{
                        include:{
                          user:true
                        }
                      }
                    },
                  });

                  return new NextResponse(JSON.stringify(course),{status:200})
                
            }catch (error) {
                console.log("hi",error)
            }
        }else{
          try {
            const course = await prisma.course.findUnique({
              where: {
                id: courseid,
              },
              include: {
                chapters: {
                  include: {
                    quiz: true,
                  },
                },
              },
            })
            return new NextResponse(JSON.stringify(course),{status:200})
          } catch (error) {
            console.log("hello",error)
            return new NextResponse(JSON.stringify(error),{status:500})
          }
        }
        

}

export const PUT =async(req,{params})=>{
    const session = await getAuthSession();
    const body = await req.json();
    
    if(body.objective){
       console.log(body.id,body.objective)
        try {
          const course= await prisma.course.update({
            where: {
              id: body.id,
            },
            data: {
              objective: body.objective,
            },
          })
          console.log(course)
          return new NextResponse(JSON.stringify("objective updated"),{status:200})
        } catch (error) {
            console.log(error)
            return new NextResponse(JSON.stringify("Could't update objective"),{status:500})
        }
    }
    if(body.title){
      console.log(body.id,body.title)
      try {
        const course= await prisma.course.update({
          where: {
            id: body.id,
          },
          data: {
            title: body.title,
          },
        })
        return new NextResponse(JSON.stringify("Title updated"),{status:200})
      } catch (error) {
          console.log(error)
          return new NextResponse(JSON.stringify("Could't update title"),{status:500})
      }
    }
    if(body.catID){
       
       if(body.catID.id){
        console.log("catigory aleredy exist")
        try {
          const course= await prisma.course.update({
            where: {
              id: body.id,
            },
            data: {
              catID:body.catID.titleCatigory,
            },
          })
          console.log(course)
          return new NextResponse(JSON.stringify("catigory updated"),{status:200})
        } catch (error) {
            console.log(error)
            return new NextResponse(JSON.stringify("Could't update catigory"),{status:500})
        }
       }
       else{
            console.log("catigory not exist")
            try {
              const newCatigory= await prisma.catigory.create({
                  data:{
                      titleCatigory:body.catID.titleCatigory
                  }
              })
              console.log("Catigory created",newCatigory)
              const newCourse = await prisma.course.update({
                  where: {
                      id:body.id
                  },
                  data: {
                    catID:newCatigory.titleCatigory,
                  }
              });
              
                return new NextResponse(JSON.stringify(newCourse),{status:201})
              } catch (error) {
                console.log(error)
                return new NextResponse(JSON.stringify("Somthing Wrong !"),{status:500})
            }
       }
       
    }
    if(body.learningOptions){
       console.log(body.id,body.learningOptions)
       try {
        const course= await prisma.course.update({
          where: {
            id: body.id,
          },
          data: {
            learningOptions: body.learningOptions,
          },
        })
        console.log(course)
        return new NextResponse(JSON.stringify("learningOptions updated"),{status:200})
      } catch (error) {
          console.log(error)
          return new NextResponse(JSON.stringify("Could't update learningOptions"),{status:500})
      }
    }
    if(body.publish==false||body.publish==true){
      try {
          const updateCourse = await prisma.course.update({
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
      const course= await prisma.course.update({
        where: {
          id: body.id,
        },
        data: {
          img: body.image,
        },
      })
      return new NextResponse(JSON.stringify("Title updated"),{status:200})
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify("Could't update title"),{status:500})
    }
  }
}
export const DELETE=async(req)=>{
  const session = await getAuthSession();
  if(!session)   return new NextResponse(JSON.stringify("No Auth"),{status:500})

  const body= await req.json();
  console.log("course id deleted",body)
  try {
    const deleteCourse = await prisma.course.delete({
        where: {
          id:body.id
        }
      })
      return new NextResponse(JSON.stringify("deleted sucses"),{status:200}) 
} catch (error) {
  console.log(error)
    return new NextResponse(JSON.stringify("Somthing wrong"),{status:500}) 
}
}