const hslToHex = (h: number, s: number, l: number): string => {
  const saturation = s / 100;
  const lightness = l / 100;

  const k = (n: number) => (n + h / 30) % 12;
  const a = saturation * Math.min(lightness, 1 - lightness);
  const channel = (n: number) => {
    const value = lightness - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return Math.round(255 * value)
      .toString(16)
      .padStart(2, "0");
  };

  return `#${channel(0)}${channel(8)}${channel(4)}`;
};

export const softBadge = {
  primary: "bg-[hsla(var(--primary)/0.12)] text-primary border border-[hsla(var(--primary)/0.24)]",
  info: "bg-[hsla(var(--info)/0.12)] text-info border border-[hsla(var(--info)/0.24)]",
  success: "bg-success/15 text-success border border-success/40",
  warning: "bg-warning/15 text-warning border border-warning/40",
  danger: "bg-[hsla(var(--destructive)/0.12)] text-destructive border border-[hsla(var(--destructive)/0.3)]",
  neutral: "bg-muted text-muted-foreground border border-border",
  accent: "bg-[hsla(var(--accent)/0.18)] text-accent-foreground border border-[hsla(var(--accent)/0.35)]",
  orange: "bg-[hsla(var(--orange-500)/0.15)] text-[hsl(var(--orange-500))] border border-[hsl(var(--orange-200))]",
} as const;

export const softSurface = {
  primary: "bg-[hsla(var(--primary)/0.1)] border border-[hsla(var(--primary)/0.22)] text-primary",
  success: "bg-success/12 border border-success/35 text-success",
  warning: "bg-warning/12 border border-warning/35 text-warning",
  danger: "bg-[hsla(var(--destructive)/0.1)] border border-[hsla(var(--destructive)/0.28)] text-destructive",
  neutral: "bg-muted border border-border text-muted-foreground",
  accent: "bg-[hsla(var(--accent)/0.18)] border border-[hsla(var(--accent)/0.35)] text-accent-foreground",
  orange: "bg-[hsla(var(--orange-500)/0.15)] border border-[hsl(var(--orange-200))] text-[hsl(var(--orange-600))]",
} as const;

export const solidBadge = {
  primary: "bg-primary text-primary-foreground",
  success: "bg-success text-success-foreground",
  warning: "bg-warning text-warning-foreground",
  danger: "bg-destructive text-destructive-foreground",
  neutral: "bg-muted text-foreground",
} as const;

export const FILE_TYPE_COLOR_MAP: Record<string, { label: string; badgeClass: string; surfaceClass: string; icon: string }> = {
  pdf: { label: "PDF", badgeClass: softBadge.danger, surfaceClass: softSurface.danger, icon: "📄" },
  doc: { label: "Word", badgeClass: softBadge.primary, surfaceClass: softSurface.primary, icon: "📘" },
  docx: { label: "Word", badgeClass: softBadge.primary, surfaceClass: softSurface.primary, icon: "📘" },
  xls: { label: "Excel", badgeClass: softBadge.success, surfaceClass: softSurface.success, icon: "📊" },
  xlsx: { label: "Excel", badgeClass: softBadge.success, surfaceClass: softSurface.success, icon: "📊" },
  ppt: { label: "PowerPoint", badgeClass: softBadge.orange, surfaceClass: softSurface.orange, icon: "📑" },
  pptx: { label: "PowerPoint", badgeClass: softBadge.orange, surfaceClass: softSurface.orange, icon: "📑" },
  txt: { label: "Text", badgeClass: softBadge.neutral, surfaceClass: softSurface.neutral, icon: "📝" },
  csv: { label: "CSV", badgeClass: softBadge.success, surfaceClass: softSurface.success, icon: "📈" },
  default: { label: "ملف", badgeClass: softBadge.neutral, surfaceClass: softSurface.neutral, icon: "📁" },
};

export const REQUEST_STATUS_COLOR_MAP: Record<string, { label: string; badgeClass: string }> = {
  PENDING: { label: "قيد المراجعة", badgeClass: softBadge.warning },
  APPROVED: { label: "موافق عليه", badgeClass: softBadge.success },
  REJECTED: { label: "مرفوض", badgeClass: softBadge.danger },
  COMPLETED: { label: "مكتمل", badgeClass: softBadge.primary },
  IN_PROGRESS: { label: "قيد التنفيذ", badgeClass: softBadge.info },
  ACTIVE: { label: "نشطة", badgeClass: softBadge.success },
};

export const REQUEST_URGENCY_COLOR_MAP: Record<string, { label: string; badgeClass: string }> = {
  LOW: { label: "منخفضة", badgeClass: softBadge.success },
  MEDIUM: { label: "متوسطة", badgeClass: softBadge.warning },
  HIGH: { label: "عالية", badgeClass: softBadge.orange },
  URGENT: { label: "عاجلة", badgeClass: softBadge.danger },
};

const primary = hslToHex(210, 90, 56);
const primaryLight = hslToHex(210, 90, 65);
const primaryDark = hslToHex(210, 90, 45);
const onPrimary = hslToHex(0, 0, 100);

const background = hslToHex(0, 0, 100);
const text = hslToHex(222, 47, 11);
const mutedSurface = hslToHex(210, 40, 96);
const mutedBorder = hslToHex(214, 32, 91);
const mutedText = hslToHex(215, 16, 46);

const warningSurface = hslToHex(45, 93, 90);
const warningBorder = hslToHex(45, 93, 82);
const warningText = hslToHex(45, 93, 40);

const successSurface = hslToHex(142, 65, 90);
const successBorder = hslToHex(142, 65, 80);
const successText = hslToHex(142, 65, 25);

const danger = hslToHex(0, 72, 46);
const dangerLight = hslToHex(0, 72, 56);
const onDanger = hslToHex(0, 0, 100);

export const emailPalette = {
  fontFamily: "'Cairo', Arial, sans-serif",
  background,
  text,
  mutedText,
  surface: mutedSurface,
  surfaceBorder: mutedBorder,
  divider: mutedBorder,
  primary,
  primaryLight,
  primaryDark,
  onPrimary,
  primaryGradient: `linear-gradient(135deg, ${primaryLight} 0%, ${primaryDark} 100%)`,
  warningSurface,
  warningBorder,
  warningText,
  successSurface,
  successBorder,
  successText,
  danger,
  dangerLight,
  onDanger,
  dangerGradient: `linear-gradient(135deg, ${dangerLight} 0%, ${danger} 100%)`,
};
