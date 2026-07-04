export function IconCoin() {
  return (
    <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="30" fill="url(#coinGrad)" stroke="#B8860B" strokeWidth="1.5" />
      <circle cx="32" cy="32" r="24" fill="none" stroke="#FFD700" strokeWidth="0.8" opacity="0.5" />
      <text x="32" y="38" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0A0A0A" fontFamily="Cinzel,serif">W</text>
      <defs>
        <radialGradient id="coinGrad" cx="35%" cy="35%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="60%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#8B6914" />
        </radialGradient>
      </defs>
    </svg>
  );
}