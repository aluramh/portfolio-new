"use client"

interface PortraitProps {
  /** Container width in px. Height scales by sprite aspect ratio. */
  size?: number
  className?: string
}

export function Portrait({ size = 120, className = "" }: PortraitProps) {
  return (
    <div
      className={`relative inline-block ${className}`}
      style={{
        width: size,
        height: Math.round(size * (160 / 120)),
        imageRendering: "pixelated",
      }}
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/portrait/pixel_me_body.png"
        alt=""
        className="absolute inset-0 w-full h-full"
        style={{ imageRendering: "pixelated" }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/portrait/pixel_me_arm.png"
        alt=""
        className="portrait-arm absolute inset-0 w-full h-full"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  )
}
