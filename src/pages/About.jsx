import React from "react"
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component"
import "react-vertical-timeline-component/style.min.css"

import { skills, experiences } from "../constants"
import { CallToAction } from "../components"

export default function About() {
   return (
      <section className="max-container">
         <h1 className="head-text">
            Hello, I'm <span className="font-semibold blue-gradient_text drop-shadow">Adi</span>
         </h1>

         <div className="flex flex-col gap-3 mt-5 text-slate-500">
            <p className="">
               Software Engineer based in Indonesia, specializing in technical education throughs hands-on learning and
               building application
            </p>
         </div>

         <div className="flex flex-col py-10">
            <h3 className="subhead-text">My Skills</h3>
            <div className="flex flex-wrap gap-12 mt-16">
               {skills.map((skill) => (
                  <div className="w-20 h-20 block-container" key={skill.type}>
                     <div className="btn-back rounded-xl" />
                     <div className="flex items-center justify-center btn-front rounded-xl">
                        <img src={skill.imageUrl} alt={skill.name} className="object-contain w-1/2 h-1/2" />
                     </div>
                  </div>
               ))}
            </div>
         </div>

         <div className="py-16">
            <h3 className="subhead-text">Work Experience</h3>
            <div className="flex flex-col gap-3 mt-5 text-slate-500">
               <p className="">
                  I've worked with all sorts of companies, leveling up my skills and teaming up with smart people.
                  Here's the rundown:
               </p>
            </div>

            <div className="flex mt-12">
               <VerticalTimeline className="">
                  {experiences.map((experience) => (
                     <VerticalTimelineElement
                        className=""
                        key={experience.title}
                        date={experience.date}
                        icon={
                           <div className="flex items-center justify-center w-full h-full">
                              <img
                                 src={experience.icon}
                                 alt={experience.company_name}
                                 className="w-[60%] h-[60%] object-contain"
                              />
                           </div>
                        }
                        iconStyle={{ background: experience.iconBg }}
                        contentStyle={{
                           borderBottom: "8px",
                           borderStyle: "solid",
                           borderBottomColor: experience.iconBg,
                           boxShadow: "none",
                        }}>
                        <div className="">
                           <h3 className="text-xl font-semibold text-black font-poppins">{experience.title}</h3>
                           <p className="font-medium text-black-500 font-base" style={{ margin: 0 }}>
                              {experience.company_name}
                           </p>
                        </div>

                        <ul className="my-5 ml-5 space-y-2 list-disc">
                           {experience.points.map((point, index) => (
                              <li
                                 className="pl-1 text-sm font-normal text-black-500/50"
                                 key={`experience-point-${index}`}>
                                 {point}
                              </li>
                           ))}
                        </ul>
                     </VerticalTimelineElement>
                  ))}
               </VerticalTimeline>
            </div>
         </div>

         <hr className="border-slate-200" />

         <CallToAction />
      </section>
   )
}
