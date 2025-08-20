"use client";

import { useState } from 'react';
import LoadingScreen from '@/components/ui/LoadingScreen';

interface AssetLoaderProps {
     children: React.ReactNode;
}

const AssetLoader = ({ children }: AssetLoaderProps) => {
     const [isLoading, setIsLoading] = useState(true);
     const [showContent, setShowContent] = useState(false);

     const handleLoadingComplete = () => {
          setIsLoading(false);
          // Small delay to ensure smooth transition
          setTimeout(() => {
               setShowContent(true);
          }, 100);
     };

     return (
          <>
               {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
               {showContent && children}
          </>
     );
};

export default AssetLoader;
