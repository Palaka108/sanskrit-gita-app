export default function LotusWatermark() {
  return (
    <svg className="lotus-watermark" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Center petal */}
      <ellipse cx="100" cy="85" rx="12" ry="35" fill="currentColor" opacity="0.06" transform="rotate(0 100 100)"/>
      {/* Left petals */}
      <ellipse cx="100" cy="85" rx="12" ry="35" fill="currentColor" opacity="0.05" transform="rotate(-30 100 100)"/>
      <ellipse cx="100" cy="85" rx="12" ry="35" fill="currentColor" opacity="0.04" transform="rotate(-60 100 100)"/>
      {/* Right petals */}
      <ellipse cx="100" cy="85" rx="12" ry="35" fill="currentColor" opacity="0.05" transform="rotate(30 100 100)"/>
      <ellipse cx="100" cy="85" rx="12" ry="35" fill="currentColor" opacity="0.04" transform="rotate(60 100 100)"/>
      {/* Outer petals */}
      <ellipse cx="100" cy="80" rx="10" ry="40" fill="currentColor" opacity="0.03" transform="rotate(-15 100 100)"/>
      <ellipse cx="100" cy="80" rx="10" ry="40" fill="currentColor" opacity="0.03" transform="rotate(15 100 100)"/>
      <ellipse cx="100" cy="80" rx="10" ry="40" fill="currentColor" opacity="0.025" transform="rotate(-45 100 100)"/>
      <ellipse cx="100" cy="80" rx="10" ry="40" fill="currentColor" opacity="0.025" transform="rotate(45 100 100)"/>
      {/* Center circle */}
      <circle cx="100" cy="100" r="8" fill="currentColor" opacity="0.05"/>
    </svg>
  )
}
