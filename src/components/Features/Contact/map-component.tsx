interface MapComponentProps {
  coordinates: {
    lat: number;
    lng: number;
  };
}

export function MapComponent({ coordinates }: MapComponentProps) {
  const mapUrl = `https://maps.google.com/maps?q=${coordinates.lat},${coordinates.lng}&t=m&z=15&output=embed`;

  return (
    <div className="relative w-full h-[250px] lg:min-h-[780px] rounded-lg overflow-hidden">
      <iframe src={mapUrl} className="w-full h-full" allowFullScreen />
    </div>
  );
}
