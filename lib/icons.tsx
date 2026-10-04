import {
  Baby, Bone, Brain, HeartHandshake, HeartPulse, Microscope, Pill, Siren, Smile, Sparkles, Stethoscope,
} from "lucide-react";

const map: Record<string, React.ReactNode> = {
  Stethoscope: <Stethoscope className="h-5 w-5" />,
  Siren: <Siren className="h-5 w-5" />,
  Smile: <Smile className="h-5 w-5" />,
  HeartPulse: <HeartPulse className="h-5 w-5" />,
  Brain: <Brain className="h-5 w-5" />,
  Baby: <Baby className="h-5 w-5" />,
  Microscope: <Microscope className="h-5 w-5" />,
  Pill: <Pill className="h-5 w-5" />,
  Bone: <Bone className="h-5 w-5" />,
  Sparkles: <Sparkles className="h-5 w-5" />,
  HeartHandshake: <HeartHandshake className="h-5 w-5" />,
};

export function serviceIcon(name: string) {
  return map[name] ?? <Stethoscope className="h-5 w-5" />;
}

export function ServiceIcon({ name }: { name: string }) {
  return <>{serviceIcon(name)}</>;
}
