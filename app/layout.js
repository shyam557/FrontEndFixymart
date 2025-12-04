
import React from 'react';
import './globals.css';
import ClientNavFooterWrapper from './ClientNavFooterWrapper.jsx';
import ReduxProvider from '../src/store/providers/ReduxProvider.jsx';
import LocationProvider from './components/location/LocationContext.js';

export const metadata = {
  title: 'Fixymart',
  description: 'Quick Service for Home Needs',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="overflow-x-hidden w-full h-full">
      <body className="overflow-x-hidden w-full min-h-screen flex flex-col">
        <ReduxProvider>
          <LocationProvider>
            <ClientNavFooterWrapper>
              <main className="flex-1 md:pt-20 pt-20">{children}</main>
            </ClientNavFooterWrapper>
          </LocationProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
