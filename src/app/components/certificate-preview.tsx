import { Logo } from './logo';

interface CertificatePreviewProps {
  name?: string;
  course?: string;
  date?: string;
  verifyId?: string;
}

export function CertificatePreview({ name = 'შენი სახელი', course = 'კურსის დასახელება', date = 'აპრილი 05, 2026', verifyId = 'BB04821' }: CertificatePreviewProps) {
  return (
    <div className="relative bg-white shadow-2xl rounded-sm overflow-hidden aspect-[1.414/1]">
      {/* Ornament border */}
      <div className="absolute inset-0 pointer-events-none" style={{
        borderImage: 'repeating-linear-gradient(45deg, #004aad18, #004aad18 2px, transparent 2px, transparent 8px) 14',
        borderWidth: '14px',
        borderStyle: 'solid',
      }} />

      <div className="relative p-6 md:p-8 h-full flex flex-col">
        {/* Ribbon */}
        <div className="absolute -top-[14px] right-5 z-10" style={{ filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.2))' }}>
          <div className="w-[100px] flex flex-col items-center" style={{ height: '260px', background: 'linear-gradient(180deg, #f8f8f8 0%, #efefef 40%, #e0e0e0 80%, #cccccc 100%)', clipPath: 'polygon(0 0, 100% 0, 100% 92%, 50% 100%, 0 92%)', borderLeft: '1px solid rgba(0,0,0,0.06)', borderRight: '1px solid rgba(0,0,0,0.06)' }}>
            <div className="pt-7 mb-6">
              <p className="text-[9px] uppercase tracking-[0.25em] text-gray-600 font-bold leading-relaxed text-center">Course<br />Certificate</p>
            </div>
            <div className="flex-1" />
            {/* Seal */}
            <div className="relative w-[72px] h-[72px] mb-7">
              <div className="absolute inset-0 rounded-full border-[2px] border-[#004aad]" />
              <div className="absolute inset-[4px] rounded-full border border-[#004aad]/30" />
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 80 80">
                <defs>
                  <path id="certTopArc" d="M 12,40 a 28,28 0 1,1 56,0" />
                  <path id="certBottomArc" d="M 68,40 a 28,28 0 1,1 -56,0" />
                </defs>
                <text className="fill-[#004aad]" style={{ fontSize: '6px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
                  <textPath href="#certTopArc" startOffset="50%" textAnchor="middle">EDUCATION FOR EVERYONE</textPath>
                </text>
                <text className="fill-[#004aad]" style={{ fontSize: '6px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                  <textPath href="#certBottomArc" startOffset="50%" textAnchor="middle">COURSE CERTIFICATE</textPath>
                </text>
              </svg>
              <div className="absolute inset-[10px] rounded-full bg-white flex items-center justify-center overflow-hidden">
                <Logo variant="academy" className="h-10 w-auto" />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mb-4 h-12" />

        <p className="text-[11px] text-gray-400 italic mb-3" style={{ fontFamily: 'Georgia, serif' }}>{date}</p>
        <p className="text-xl md:text-2xl text-gray-900 leading-tight mb-0.5" style={{ fontFamily: 'Georgia, serif' }}>{name}</p>
        <p className="text-[11px] text-gray-400 italic mb-2" style={{ fontFamily: 'Georgia, serif' }}>წარმატებით დაასრულა</p>
        <p className="text-sm md:text-base font-bold text-gray-900 italic mb-auto" style={{ fontFamily: 'Georgia, serif' }}>{course}</p>

        {/* Bottom */}
        <div className="flex items-end justify-between mt-4">
          <div>
            <svg viewBox="0 0 200 50" className="w-28 h-7 text-gray-700">
              <text x="5" y="38" style={{ fontFamily: 'Brush Script MT, Dancing Script, cursive', fontSize: '32px', fill: 'currentColor' }}>T. Shakeladze</text>
            </svg>
            <div className="w-28 border-b border-gray-300 mb-1" />
            <p className="text-[9px] text-gray-500 font-medium">Founder & CEO</p>
            <p className="text-[8px] text-gray-400">Blueberry Academy</p>
          </div>
          <p className="text-[7px] text-gray-300">blueberry.academy/verify/<span className="font-mono">{verifyId}</span></p>
        </div>
      </div>
    </div>
  );
}
