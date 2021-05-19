import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <footer className="border-gray-600 border-opacity-20 border-t flex items-center justify-end p-4">
      <Link href="/graphql">
        <a className="flex items-center text-sm">GraphQL Playground</a>
      </Link>
    </footer>
  );
}
