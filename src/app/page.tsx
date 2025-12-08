// src/app/page.tsx

import { Suspense } from 'react'; // <-- NEU: Importiere Suspense
import { HomeTemplate } from "@/modules/home/templates/home-template";

// Hier würden deine Metadata-Exporte stehen (für SEO)
// export const metadata = { title: "..." };

export default function Page() {
  return (
    // <-- NEU: Wickle die HomeTemplate in ein Suspense Boundary
    <Suspense fallback={<div>Lade Inhalte...</div>}>
      <HomeTemplate />
    </Suspense>
  );
}