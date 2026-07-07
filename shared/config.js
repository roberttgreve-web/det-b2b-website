/* DEIN ERSTER TAG – zentrale Tailwind-Konfiguration (Design-Tokens).
   Wird auf jeder Seite direkt nach dem Tailwind-CDN-Script eingebunden. */
tailwind.config = {
  theme: {
    extend: {
      fontFamily: { sans: ['Roboto', 'sans-serif'] },
      colors: {
        brand: '#00afd6',   // DET Blau – CTAs, Links, Overlines, Footer
        yellow: '#ffec5c',  // DET Gelb – CTA-Karten, Award-Badge
        dark: '#181818',    // Text, Headlines
        light: '#fafafa',   // Seitenhintergrund
        paper: '#f4f4f2',   // alternierender Sektionshintergrund, Karten
        mist: '#f0f0f0',    // Icon-Boxen, Chips
        line: '#e3e3e3',    // alle Trennlinien & Rahmen
        muted: '#a9a9a9',   // sekundärer/abgedunkelter Text
        night: '#002e38',   // dunkler Hero-Hintergrund
        station: {
          blue: '#33b9da',
          dark: '#2c2d3e',
          yellow: '#f7cb28',
          orange: '#f27c50',
        },
      },
      letterSpacing: { tight2: '-0.03em' },
      fontSize: {
        // Display-Skala für H1/H2: text-display-xs sm:text-display-sm lg:text-display
        'display': ['42px', { lineHeight: '53px', letterSpacing: '-0.03em' }],
        'display-sm': ['34px', { lineHeight: '1.15', letterSpacing: '-0.03em' }],
        'display-xs': ['28px', { lineHeight: '1.2', letterSpacing: '-0.03em' }],
      },
    }
  }
}
