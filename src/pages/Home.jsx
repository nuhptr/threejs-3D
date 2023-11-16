import { Canvas } from "@react-three/fiber"
import { Suspense, useState, useEffect, useRef } from "react"

import { HomeInfo, Loader } from "../components"

import Island from "../models/Island"
import Sky from "../models/Sky"
import Bird from "../models/Bird"
import Plane from "../models/Plane"

import sakura from "../assets/sakura.mp3"
import { soundoff, soundon } from "../assets/icons"

export default function Home() {
   const audioRef = useRef(new Audio(sakura))
   audioRef.current.volume = 0.4
   audioRef.current.loop = true

   const [isPlayingMusic, setIsPlayingMusic] = useState(true)
   const [isRotating, setIsRotating] = useState(false)
   const [currentStage, setCurrentStage] = useState(1)

   useEffect(() => {
      if (isPlayingMusic) audioRef.current.play()

      return () => {
         audioRef.current.pause()
      }
   }, [isPlayingMusic])

   function adjustIslandForScreenSize() {
      let screenScale = null
      let screenPosition = [0, -6.5, -43]
      let rotation = [0.1, 4.7, 0]

      if (window.innerWidth < 768) screenScale = [0.9, 0.9, 0.9]
      else screenScale = [1, 1, 1]

      return [screenScale, screenPosition, rotation]
   }

   function adjustPlaneForScreenSize() {
      let screenScale, screenPosition

      if (window.innerWidth < 768) {
         screenScale = [1.5, 1.5, 1.5]
         screenPosition = [0, -1.5, 0]
      } else {
         screenScale = [3, 3, 3]
         screenPosition = [0, -4, -4]
      }

      return [screenScale, screenPosition]
   }

   const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize()
   const [planeScale, planePosition] = adjustPlaneForScreenSize()

   return (
      <section className="relative w-full h-screen">
         <div className="absolute left-0 right-0 z-10 flex items-center justify-center top-28">
            {currentStage ? <HomeInfo currentStage={currentStage} /> : null}
         </div>

         <Canvas
            className={`w-full h-screen bg-transparent ${isRotating ? "cursor-grabbing" : "cursor-grab"}`}
            camera={{ near: 0.1, far: 1000 }}>
            <Suspense fallback={<Loader />}>
               <directionalLight position={[1, 1, 1]} intensity={2} />
               <ambientLight intensity={0.5} />
               <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1} />

               <Bird />
               <Sky isRotating={isRotating} />
               <Island
                  position={islandPosition}
                  scale={islandScale}
                  rotation={islandRotation}
                  isRotating={isRotating}
                  setIsRotating={setIsRotating}
                  setCurrentStage={setCurrentStage}
               />
               <Plane rotation={[0, 14, 0]} position={planePosition} scale={planeScale} isRotating={isRotating} />
            </Suspense>
         </Canvas>

         <div className="absolute bottom-2 right-2">
            <img
               src={isPlayingMusic ? soundon : soundoff}
               alt="sound icon"
               className="object-contain w-10 h-10 cursor-pointer"
               onClick={() => setIsPlayingMusic(!isPlayingMusic)}
            />
         </div>
      </section>
   )
}
