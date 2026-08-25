"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProductCalculatorRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/equipment-calculator');
  }, [router]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
        <p>Redirecting to Equipment & Product Calculator...</p>
      </div>
    </div>
  );
}
