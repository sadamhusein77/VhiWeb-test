import './globals.scss'
import type { Metadata } from 'next'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Providers } from '@/redux/provider';
import ToastProvider from './toast.provider';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'VhiWEB',
  description: 'VhiWEB Test',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body>
        <ToastProvider>
          <Providers>{children}</Providers>
        </ToastProvider>
      </body>
    </html>
  )
}
