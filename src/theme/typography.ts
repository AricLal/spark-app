// Font family names registered in App.tsx via useFonts().
// Bricolage Grotesque = display/heading font (wordmark, headings, buttons).
// Inter = body/UI font — matches the prototype's font-family declarations.
export const fonts = {
  displayBold: 'BricolageGrotesque_700Bold',
  displayExtraBold: 'BricolageGrotesque_800ExtraBold',
  bodyRegular: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemiBold: 'Inter_600SemiBold',
  bodyBold: 'Inter_700Bold',
} as const;
