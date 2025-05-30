import React from 'react'

export function TestFont() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="space-y-8 p-8">
        <h1 className="text-3xl font-semibold mb-8">Font Test Page</h1>
        <div className="space-y-4">
          <p className="font-light text-xl">This is Light (300) - Avenir LT Std 35 Light</p>
          <p className="font-normal text-xl">This is Book (400) - Avenir LT Std 45 Book</p>
          <p className="font-medium text-xl">This is Roman (500) - Avenir LT Std 55 Roman</p>
          <p className="font-semibold text-xl">This is Medium (600) - Avenir LT Std 65 Medium</p>
        </div>
      </div>
    </div>
  )
}