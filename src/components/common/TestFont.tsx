
export function TestFont() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="p-8 space-y-8">
        <h1 className="mb-8 text-3xl font-semibold">Font Test Page</h1>
        <div className="space-y-4">
          <p className="text-xl font-light">This is Light (300) - Avenir LT Std 35 Light</p>
          <p className="text-xl font-normal">This is Book (400) - Avenir LT Std 45 Book</p>
          <p className="text-xl font-medium">This is Roman (500) - Avenir LT Std 55 Roman</p>
          <p className="text-xl font-semibold">This is Medium (600) - Avenir LT Std 65 Medium</p>
        </div>
      </div>
    </div>
  )
}