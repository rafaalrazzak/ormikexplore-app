"use client";

import MaintenancePage from '@/components/pages/MaintenancePage';
import { Suspense } from 'react';

export default function Maintenance() {
     return (
          <Suspense fallback={null}>
               <MaintenancePage />
          </Suspense>
     );
}
