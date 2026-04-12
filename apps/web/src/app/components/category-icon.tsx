import { 
  Layers, 
  Utensils, 
  Palette, 
  Music, 
  PenTool, 
  Trophy, 
  Layout, 
  Briefcase, 
  Cpu, 
  Home 
} from 'lucide-react';

interface CategoryIconProps {
  iconName: string;
  className?: string;
}

export function CategoryIcon({ iconName, className = "w-5 h-5" }: CategoryIconProps) {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    'layers': Layers,
    'utensils': Utensils,
    'palette': Palette,
    'music': Music,
    'pen-tool': PenTool,
    'trophy': Trophy,
    'layout': Layout,
    'briefcase': Briefcase,
    'cpu': Cpu,
    'home': Home,
  };

  const Icon = iconMap[iconName] || Layers;
  return <Icon className={className} />;
}
