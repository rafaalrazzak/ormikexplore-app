"use client";

import { useEffect } from 'react';

const FontPreloader = () => {
     useEffect(() => {
          // Preload Google Fonts (Poppins)
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'style';
          link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap';
          document.head.appendChild(link);

          // Also create the actual font link
          const fontLink = document.createElement('link');
          fontLink.rel = 'stylesheet';
          fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap';
          document.head.appendChild(fontLink);

          return () => {
               // Cleanup if needed
               if (document.head.contains(link)) {
                    document.head.removeChild(link);
               }
          };
     }, []);

     return null;
};

export default FontPreloader;
