interface FiligreeBorderProps {
  children: React.ReactNode
}

export default function FiligreeBorder({ children }: FiligreeBorderProps) {
  return (
    <div className="filigree-frame">
      <svg className="filigree-corner filigree-tl" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 78 C2 40 10 20 40 10 C50 8 60 4 78 2" stroke="url(#gold-grad)" strokeWidth="1.5" fill="none"/>
        <path d="M2 60 C8 35 20 20 45 15" stroke="url(#gold-grad)" strokeWidth="1" fill="none" opacity="0.6"/>
        <circle cx="40" cy="10" r="2" fill="url(#gold-grad)" opacity="0.5"/>
        <circle cx="10" cy="40" r="1.5" fill="url(#gold-grad)" opacity="0.4"/>
        <defs>
          <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c9a96e"/>
            <stop offset="50%" stopColor="#b8945a"/>
            <stop offset="100%" stopColor="#a07d4a"/>
          </linearGradient>
        </defs>
      </svg>
      <svg className="filigree-corner filigree-tr" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M78 78 C78 40 70 20 40 10 C30 8 20 4 2 2" stroke="url(#gold-grad-r)" strokeWidth="1.5" fill="none"/>
        <path d="M78 60 C72 35 60 20 35 15" stroke="url(#gold-grad-r)" strokeWidth="1" fill="none" opacity="0.6"/>
        <circle cx="40" cy="10" r="2" fill="url(#gold-grad-r)" opacity="0.5"/>
        <circle cx="70" cy="40" r="1.5" fill="url(#gold-grad-r)" opacity="0.4"/>
        <defs>
          <linearGradient id="gold-grad-r" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#c9a96e"/>
            <stop offset="50%" stopColor="#b8945a"/>
            <stop offset="100%" stopColor="#a07d4a"/>
          </linearGradient>
        </defs>
      </svg>
      <svg className="filigree-corner filigree-bl" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 2 C2 40 10 60 40 70 C50 72 60 76 78 78" stroke="url(#gold-grad-b)" strokeWidth="1.5" fill="none"/>
        <path d="M2 20 C8 45 20 60 45 65" stroke="url(#gold-grad-b)" strokeWidth="1" fill="none" opacity="0.6"/>
        <circle cx="40" cy="70" r="2" fill="url(#gold-grad-b)" opacity="0.5"/>
        <defs>
          <linearGradient id="gold-grad-b" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c9a96e"/>
            <stop offset="50%" stopColor="#b8945a"/>
            <stop offset="100%" stopColor="#a07d4a"/>
          </linearGradient>
        </defs>
      </svg>
      <svg className="filigree-corner filigree-br" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M78 2 C78 40 70 60 40 70 C30 72 20 76 2 78" stroke="url(#gold-grad-br)" strokeWidth="1.5" fill="none"/>
        <path d="M78 20 C72 45 60 60 35 65" stroke="url(#gold-grad-br)" strokeWidth="1" fill="none" opacity="0.6"/>
        <circle cx="40" cy="70" r="2" fill="url(#gold-grad-br)" opacity="0.5"/>
        <defs>
          <linearGradient id="gold-grad-br" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#c9a96e"/>
            <stop offset="50%" stopColor="#b8945a"/>
            <stop offset="100%" stopColor="#a07d4a"/>
          </linearGradient>
        </defs>
      </svg>
      <div className="filigree-inner">
        {children}
      </div>
    </div>
  )
}
