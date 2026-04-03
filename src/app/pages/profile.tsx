import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Save, User, Mail, Globe } from 'lucide-react';
import { useAuth } from '../context/auth-context';

export function Profile() {
  const navigate = useNavigate();
  const { user, language, setLanguage } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // TODO: API call to update profile
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-4 md:px-12">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <button onClick={() => navigate(-1)}
            className="w-9 h-9 rounded flex items-center justify-center bg-white/[0.06] hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-4 h-4 text-white" />
          </button>
          <h1 className="text-2xl font-black text-white">პროფილი</h1>
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 rounded-full bg-[#1a4fd8] flex items-center justify-center mb-3">
            <span className="text-white text-3xl font-black">{user?.name?.charAt(0)?.toUpperCase() || 'U'}</span>
          </div>
          <p className="text-white font-bold">{user?.name}</p>
          <p className="text-white/40 text-xs">{user?.email}</p>
          <span className={`mt-2 px-3 py-1 rounded text-[10px] font-medium ${
            user?.role === 'INSTRUCTOR' ? 'bg-[#1a4fd8]/10 text-[#1a4fd8] border border-[#1a4fd8]/20' : 'bg-white/[0.06] text-white/50'
          }`}>
            {user?.role === 'INSTRUCTOR' ? 'ინსტრუქტორი' : 'სტუდენტი'}
          </span>
        </div>

        {/* Form */}
        <div className="space-y-5">
          <div>
            <label className="flex items-center gap-2 text-xs text-white/40 mb-2">
              <User className="w-3.5 h-3.5" />სახელი
            </label>
            <input type="text" value={name} onChange={e => setName(e.target.value)}
              className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded text-white text-sm focus:outline-none focus:border-[#1a4fd8] transition-colors" />
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs text-white/40 mb-2">
              <Mail className="w-3.5 h-3.5" />ელ-ფოსტა
            </label>
            <input type="email" value={user?.email || ''} disabled
              className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.06] rounded text-white/40 text-sm cursor-not-allowed" />
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs text-white/40 mb-2">
              <Globe className="w-3.5 h-3.5" />ენა
            </label>
            <div className="flex gap-2">
              {['ქართული', 'English', 'Русский'].map(lang => (
                <button key={lang} onClick={() => setLanguage(lang)}
                  className={`px-4 py-2 rounded text-sm transition-colors ${
                    language === lang ? 'bg-[#1a4fd8] text-white' : 'bg-white/[0.04] border border-white/10 text-white/50 hover:border-white/20'
                  }`}>
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button onClick={handleSave}
            className="flex items-center gap-2 px-8 py-3 bg-[#1a4fd8] text-white rounded-full text-sm font-bold hover:bg-[#1540b0] transition-colors active:scale-95">
            <Save className="w-4 h-4" />
            {saved ? 'შენახულია!' : 'შენახვა'}
          </button>
        </div>
      </div>
    </div>
  );
}
