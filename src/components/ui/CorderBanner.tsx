import React from 'react';
import { twJoin } from 'tailwind-merge';

const CornerBanner = () => {
  return (
    <div className="fixed right-0 top-0">
      <div
        className={twJoin(
          'absolute -right-10 -top-[-7rem] origin-top-right rotate-45 whitespace-nowrap bg-green-600 px-16 py-2',
          'text-sm font-bold text-white shadow-lg transition-colors hover:bg-green-700'
        )}
        style={{ transformOrigin: 'top right' }}
      >
        🔥Open to work
      </div>
    </div>
  );
};

export default CornerBanner;
