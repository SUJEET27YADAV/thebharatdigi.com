import React from "react";
import * as Icons from "lucide-react";

interface LucideIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const LucideIcon = ({ name, className, size = 24 }: LucideIconProps) => {
  const IconComponent = Icons[
    name as keyof typeof Icons
  ] as React.ComponentType<{ className?: string; size?: number }>;

  // Fallback icon in case the database string contains a typo or an icon that doesn't exist
  if (!IconComponent) {
    return <Icons.HelpCircle className={className} size={size} />;
  }

  return <IconComponent className={className} size={size} />;
};
