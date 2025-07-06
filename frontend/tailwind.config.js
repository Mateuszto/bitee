/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Taiga UI compatible color variables
        'tui-base-01': 'var(--tui-base-01, #ffffff)',
        'tui-base-02': 'var(--tui-base-02, #f8fafc)',
        'tui-text-01': 'var(--tui-text-01, #0f172a)',
        'tui-text-02': 'var(--tui-text-02, #475569)',
        'tui-primary': 'var(--tui-primary, #3b82f6)',
        'tui-primary-hover': 'var(--tui-primary-hover, #2563eb)',
        'tui-primary-bg': 'var(--tui-primary-bg, #dbeafe)',
        'tui-primary-bg-hover': 'var(--tui-primary-bg-hover, #bfdbfe)',
        'tui-secondary-bg': 'var(--tui-secondary-bg, #e0e7ff)',
        'tui-accent-bg': 'var(--tui-accent-bg, #c7d2fe)',
        'tui-info-bg': 'var(--tui-info-bg, #ecfccb)',
        'tui-info-bg-hover': 'var(--tui-info-bg-hover, #d9f99d)',
        'tui-neutral-bg': 'var(--tui-neutral-bg, #f1f5f9)',
        'tui-neutral-bg-hover': 'var(--tui-neutral-bg-hover, #e2e8f0)',
        'tui-positive-bg': 'var(--tui-positive-bg, #dbeafe)',
        'tui-positive-bg-hover': 'var(--tui-positive-bg-hover, #bfdbfe)',
      }
    },
  },
  plugins: [],
}
