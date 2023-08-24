import React from 'react';
import Link from 'next/link';

function Logo() {
  return (
    <div className="website-logo">
      <Link href="/">
        <div className="logo" style={{ width: 150, height: 50 }}></div>
      </Link>
    </div>
  );
}

export default Logo;
