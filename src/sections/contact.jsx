import { Suspense, useState } from "react"
import { Canvas } from "@react-three/fiber"
import emailjs from "@emailjs/browser"

import { useAlert } from "../hooks/use-alert"
import Fox from "../models/foxs"

import { Alert, Loader } from "../components"

const Contact = () => {
   const [form, setForm] = useState({ name: "", email: "", message: "" })
   const [isLoading, setIsLoading] = useState(false)
   const [currentAnimation, setCurrentAnimation] = useState("Idle")

   const { alert, showAlert } = useAlert()

   function handleChange(event) {
      setForm({ ...form, [event.target.name]: event.target.value })
   }

   function handleSubmit(event) {
      event.preventDefault()
      setIsLoading(true)
      setCurrentAnimation("run")

      try {
         emailjs.send(
            import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
            {
               from_name: form.name,
               to_name: "Adi",
               from_email: form.email,
               to_email: "nugrahaadi733@gmail.com",
               message: form.message,
            },
            import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
         )

         setIsLoading(false)
         // TODO: Show success message
         showAlert({ show: true, text: "Message sent successfully!", type: "success" })

         setTimeout(() => {
            setCurrentAnimation("idle")
            setForm({ name: "", email: "", message: "" })
         }, 300)
      } catch (error) {
         setIsLoading(false)
         setCurrentAnimation("idle")
         console.log(error)
         // TODO: show error message
         showAlert({ show: true, text: "I didn't receive your message", type: "danger" })
      }
   }

   function handleFocus() {
      setCurrentAnimation("walk")
   }

   function handleBlur() {
      setCurrentAnimation("idle")
   }

   return (
      <section className="relative flex flex-col lg:flex-row max-container">
         {alert.show && <Alert {...alert} />}

         <div className="flex-1 min-w-[50%] flex flex-col">
            <h1 className="head-text">Get in Touch</h1>

            <form className="flex flex-col w-full gap-7 mt-14" onSubmit={handleSubmit}>
               <label className="font-semibold text-black-500">
                  Name{" "}
                  <input
                     type="text"
                     name="name"
                     className="input"
                     placeholder="John"
                     required
                     value={form.name}
                     onChange={handleChange}
                     onFocus={handleFocus}
                     onBlur={handleBlur}
                  />
               </label>
               <label className="font-semibold text-black-500">
                  Email{" "}
                  <input
                     type="email"
                     name="email"
                     className="input"
                     placeholder="jhon@gmail.com"
                     required
                     value={form.email}
                     onChange={handleChange}
                     onFocus={handleFocus}
                     onBlur={handleBlur}
                  />
               </label>
               <label className="font-semibold text-black-500">
                  Your Message{" "}
                  <textarea
                     name="message"
                     rows={4}
                     className="textarea"
                     placeholder="Let me know how I can help you!"
                     required
                     value={form.message}
                     onChange={handleChange}
                     onFocus={handleFocus}
                     onBlur={handleBlur}
                  />
               </label>
               <button
                  type="submit"
                  className="btn"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send Message"}
               </button>
            </form>
         </div>

         <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]">
            <Canvas camera={{ position: [0, 0, 5], fov: 75, near: 0.1, far: 1000 }}>
               <directionalLight position={[0, 0, 1]} intensity={2.5} />

               <ambientLight intensity={1} />

               <pointLight position={[5, 10, 0]} intensity={2} />

               <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />

               <Suspense fallback={<Loader />}>
                  <Fox
                     currentAnimation={currentAnimation}
                     position={[0.5, 0.35, 0]}
                     rotation={[12.629, -0.6, 0]}
                     scale={[0.5, 0.5, 0.5]}
                  />
               </Suspense>
            </Canvas>
         </div>
      </section>
   )
}

export default Contact
