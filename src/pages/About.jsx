import React from "react"

import { skills } from "../constants"

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
                  <div className="w-20 h-20 block-container">
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
               <p>
                  I've worked with all sorts of companies, leveling up my skills and teaming up with smart people.
                  Here's the rundown:
               </p>
            </div>
         </div>
      </section>
   )
}
