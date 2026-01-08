// src/app/page.tsx

import { Suspense } from 'react';
import { HomeTemplate } from "@/modules/home/templates/home-template";
import { ActiveSectionProvider } from "@/shared/context/active-section-context"; // <-- IMPORT

// export const metadata = { title: "..." };

export default function Page() {
  return (
    // 1. Der Provider umschließt alles
    <ActiveSectionProvider>
      <Suspense fallback={<div>Lade Inhalte...</div>}>
        <HomeTemplate />
      </Suspense>
    </ActiveSectionProvider>
  );
}