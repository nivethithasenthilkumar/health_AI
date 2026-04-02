"use client"

export function DoctorCartoon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Head */}
      <circle cx="100" cy="60" r="45" fill="#FFD5B5" />
      {/* Hair */}
      <path d="M55 50 Q60 20 100 15 Q140 20 145 50 Q145 35 130 30 Q100 25 70 30 Q55 35 55 50Z" fill="#4A3728" />
      {/* Eyes */}
      <ellipse cx="80" cy="55" rx="8" ry="10" fill="white" />
      <ellipse cx="120" cy="55" rx="8" ry="10" fill="white" />
      <circle cx="82" cy="57" r="5" fill="#3B82F6" />
      <circle cx="122" cy="57" r="5" fill="#3B82F6" />
      <circle cx="84" cy="55" r="2" fill="white" />
      <circle cx="124" cy="55" r="2" fill="white" />
      {/* Smile */}
      <path d="M80 80 Q100 95 120 80" stroke="#E57373" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Cheeks */}
      <circle cx="65" cy="70" r="8" fill="#FFB6C1" opacity="0.5" />
      <circle cx="135" cy="70" r="8" fill="#FFB6C1" opacity="0.5" />
      {/* Body - White Coat */}
      <path d="M50 105 Q50 120 55 140 L55 250 Q55 260 65 260 L135 260 Q145 260 145 250 L145 140 Q150 120 150 105 Q150 95 100 95 Q50 95 50 105Z" fill="white" stroke="#E5E7EB" strokeWidth="2" />
      {/* Coat Details */}
      <rect x="75" y="120" width="50" height="20" rx="5" fill="#F3F4F6" />
      {/* Stethoscope */}
      <path d="M85 105 Q70 130 75 160" stroke="#374151" strokeWidth="4" strokeLinecap="round" />
      <circle cx="75" cy="165" r="12" fill="#374151" />
      <circle cx="75" cy="165" r="8" fill="#6B7280" />
      {/* Arms */}
      <path d="M50 120 Q30 140 40 180" stroke="#FFD5B5" strokeWidth="20" strokeLinecap="round" />
      <path d="M150 120 Q170 140 160 180" stroke="#FFD5B5" strokeWidth="20" strokeLinecap="round" />
      {/* Hands */}
      <circle cx="40" cy="185" r="15" fill="#FFD5B5" />
      <circle cx="160" cy="185" r="15" fill="#FFD5B5" />
      {/* Clipboard */}
      <rect x="145" y="170" width="35" height="45" rx="3" fill="#D4A574" />
      <rect x="150" y="180" width="25" height="3" fill="white" />
      <rect x="150" y="188" width="25" height="3" fill="white" />
      <rect x="150" y="196" width="15" height="3" fill="white" />
      {/* Name Tag */}
      <rect x="115" y="130" width="25" height="15" rx="2" fill="#3B82F6" />
    </svg>
  )
}

export function NurseCartoon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Head */}
      <circle cx="100" cy="60" r="45" fill="#FFD5B5" />
      {/* Hair */}
      <path d="M50 55 Q50 20 100 15 Q150 20 150 55 Q145 45 100 40 Q55 45 50 55Z" fill="#8B4513" />
      <path d="M50 55 Q45 80 55 100" stroke="#8B4513" strokeWidth="8" strokeLinecap="round" />
      <path d="M150 55 Q155 80 145 100" stroke="#8B4513" strokeWidth="8" strokeLinecap="round" />
      {/* Nurse Cap */}
      <path d="M70 25 Q100 15 130 25 L125 40 Q100 35 75 40 Z" fill="white" stroke="#EC4899" strokeWidth="1" />
      <path d="M95 25 L105 25 L105 35 L95 35 Z" fill="#EC4899" />
      <path d="M97 27 L103 27 L103 33 L97 33 Z" fill="white" />
      {/* Eyes */}
      <ellipse cx="80" cy="55" rx="8" ry="10" fill="white" />
      <ellipse cx="120" cy="55" rx="8" ry="10" fill="white" />
      <circle cx="82" cy="57" r="5" fill="#EC4899" />
      <circle cx="122" cy="57" r="5" fill="#EC4899" />
      <circle cx="84" cy="55" r="2" fill="white" />
      <circle cx="124" cy="55" r="2" fill="white" />
      {/* Eyelashes */}
      <path d="M72 48 L74 45 M76 47 L77 44 M80 46 L80 43" stroke="#8B4513" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M128 48 L126 45 M124 47 L123 44 M120 46 L120 43" stroke="#8B4513" strokeWidth="1.5" strokeLinecap="round" />
      {/* Smile */}
      <path d="M85 80 Q100 92 115 80" stroke="#E57373" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Cheeks */}
      <circle cx="65" cy="70" r="10" fill="#FFB6C1" opacity="0.6" />
      <circle cx="135" cy="70" r="10" fill="#FFB6C1" opacity="0.6" />
      {/* Body - Pink Scrubs */}
      <path d="M50 105 Q50 115 55 130 L55 250 Q55 260 65 260 L135 260 Q145 260 145 250 L145 130 Q150 115 150 105 Q150 95 100 95 Q50 95 50 105Z" fill="#FBE4EC" stroke="#FBCFE8" strokeWidth="2" />
      {/* V-Neck */}
      <path d="M80 105 L100 130 L120 105" stroke="#FBCFE8" strokeWidth="2" fill="none" />
      {/* Heart Badge */}
      <path d="M120 130 Q123 125 127 130 Q130 125 133 130 Q133 138 127 145 Q120 138 120 130Z" fill="#EC4899" />
      {/* Arms */}
      <path d="M50 120 Q25 140 35 180" stroke="#FFD5B5" strokeWidth="20" strokeLinecap="round" />
      <path d="M150 120 Q175 140 165 180" stroke="#FFD5B5" strokeWidth="20" strokeLinecap="round" />
      {/* Hands */}
      <circle cx="35" cy="185" r="15" fill="#FFD5B5" />
      <circle cx="165" cy="185" r="15" fill="#FFD5B5" />
      {/* Syringe */}
      <rect x="20" y="175" width="35" height="8" rx="2" fill="#E5E7EB" />
      <rect x="50" y="177" width="8" height="4" fill="#3B82F6" />
    </svg>
  )
}

export function PatientCartoon({ gender = "neutral", className = "" }: { gender?: "male" | "female" | "neutral"; className?: string }) {
  const hairColor = gender === "female" ? "#8B4513" : "#4A3728"
  const clothesColor = gender === "female" ? "#F9A8D4" : gender === "male" ? "#60A5FA" : "#34D399"
  
  return (
    <svg className={className} viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Head */}
      <circle cx="100" cy="60" r="45" fill="#FFD5B5" />
      {/* Hair */}
      {gender === "female" ? (
        <>
          <path d="M50 50 Q50 15 100 10 Q150 15 150 50 Q145 35 100 30 Q55 35 50 50Z" fill={hairColor} />
          <path d="M50 50 Q40 80 50 120" stroke={hairColor} strokeWidth="12" strokeLinecap="round" />
          <path d="M150 50 Q160 80 150 120" stroke={hairColor} strokeWidth="12" strokeLinecap="round" />
        </>
      ) : (
        <path d="M55 45 Q60 15 100 10 Q140 15 145 45 Q145 30 130 25 Q100 20 70 25 Q55 30 55 45Z" fill={hairColor} />
      )}
      {/* Eyes */}
      <ellipse cx="80" cy="55" rx="7" ry="9" fill="white" />
      <ellipse cx="120" cy="55" rx="7" ry="9" fill="white" />
      <circle cx="81" cy="57" r="4" fill="#374151" />
      <circle cx="121" cy="57" r="4" fill="#374151" />
      <circle cx="83" cy="55" r="1.5" fill="white" />
      <circle cx="123" cy="55" r="1.5" fill="white" />
      {/* Smile */}
      <path d="M85 78 Q100 88 115 78" stroke="#E57373" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Cheeks */}
      <circle cx="65" cy="68" r="8" fill="#FFB6C1" opacity="0.5" />
      <circle cx="135" cy="68" r="8" fill="#FFB6C1" opacity="0.5" />
      {/* Body - T-Shirt */}
      <path d="M55 105 Q55 115 58 130 L58 250 Q58 260 68 260 L132 260 Q142 260 142 250 L142 130 Q145 115 145 105 Q145 95 100 95 Q55 95 55 105Z" fill={clothesColor} />
      {/* Collar */}
      <path d="M80 100 Q100 115 120 100" stroke={clothesColor} strokeWidth="3" fill="none" style={{ filter: "brightness(0.9)" }} />
      {/* Arms */}
      <path d="M55 115 Q35 135 40 175" stroke="#FFD5B5" strokeWidth="18" strokeLinecap="round" />
      <path d="M145 115 Q165 135 160 175" stroke="#FFD5B5" strokeWidth="18" strokeLinecap="round" />
      {/* Hands */}
      <circle cx="40" cy="180" r="14" fill="#FFD5B5" />
      <circle cx="160" cy="180" r="14" fill="#FFD5B5" />
      {/* Health Icon */}
      <circle cx="100" cy="160" r="20" fill="white" opacity="0.9" />
      <path d="M95 150 L105 150 L105 155 L110 155 L110 165 L105 165 L105 170 L95 170 L95 165 L90 165 L90 155 L95 155 Z" fill="#EF4444" />
    </svg>
  )
}

export function HeartbeatAnimation({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        className="animate-heartbeat-line"
        d="M0 50 L80 50 L100 50 L120 20 L140 80 L160 30 L180 70 L200 50 L220 50 L400 50"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

export function RunningPerson({ className = "" }: { className?: string }) {
  return (
    <svg className={`animate-run ${className}`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Head */}
      <circle cx="50" cy="20" r="12" fill="#FFD5B5" />
      {/* Body */}
      <path d="M50 32 L50 55" stroke="#3B82F6" strokeWidth="8" strokeLinecap="round" />
      {/* Arms */}
      <path d="M50 40 L30 55" stroke="#FFD5B5" strokeWidth="6" strokeLinecap="round" className="animate-arm-swing" />
      <path d="M50 40 L70 30" stroke="#FFD5B5" strokeWidth="6" strokeLinecap="round" className="animate-arm-swing-reverse" />
      {/* Legs */}
      <path d="M50 55 L35 80" stroke="#374151" strokeWidth="6" strokeLinecap="round" className="animate-leg-swing" />
      <path d="M50 55 L65 80" stroke="#374151" strokeWidth="6" strokeLinecap="round" className="animate-leg-swing-reverse" />
    </svg>
  )
}
