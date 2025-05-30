"use client"



export function MapComponent() {
 

  return (
    <div className="relative w-full h-full min-h-[500px] rounded-lg overflow-hidden">
      {/* Map image */}
      <div
        className="absolute inset-0 bg-gray-200"
        style={{
          backgroundImage: "url('/images/demo.png')", // Add your map image to public/images folder
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

   
  
    </div>
  )
}