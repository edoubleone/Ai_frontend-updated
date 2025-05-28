"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"

interface MapComponentProps {
  address: string
  coordinates: {
    lat: number
    lng: number
  }
}

export function MapComponent({ address, coordinates }: MapComponentProps) {
  const [showTooltip, setShowTooltip] = useState(false)

  // In a real implementation, you would use a proper map library like Google Maps, Mapbox, or Leaflet
  // This is a simplified version for demonstration purposes

  return (
    <div className="relative w-full h-full min-h-[500px] rounded-lg overflow-hidden">
      {/* Map placeholder - in a real app, replace with actual map component */}
      <div
        className="absolute inset-0 bg-gray-200"
        style={{
          backgroundImage:
            "url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/" +
            `pin-s+4361ee(${coordinates.lng},${coordinates.lat})/${coordinates.lng},${coordinates.lat},13,0/800x500@2x?access_token=pk.eyJ1IjoiZXhhbXBsZXVzZXIiLCJhIjoiY2s4YnE4N2JqMGNweTNlbWtlbTBjaXRvbCJ9.xOc_U9XY-f-XpZ_pM-gu6A')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Map marker */}
      <div
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <div className="relative">
          <MapPin className="h-8 w-8 text-blue-600 fill-blue-600" />

          {/* Address tooltip */}
          {showTooltip && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white p-2 rounded shadow-lg text-sm w-max max-w-[200px]">
              <p className="font-medium text-gray-900">{address}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
