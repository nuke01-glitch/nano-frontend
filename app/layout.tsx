import './globals.css'

export const metadata = {
  title: 'Nanotech AI Dashboard',
  description: 'Predicting material properties with CatBoost',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
