import React from 'react';
import { useTheme } from '../theme/index.js';

export default function Loader() {
  const { theme } = useTheme();

  return (
    <ReactLoading
      type="spokes"
      color={theme === 'dark' ? 'white' : 'black'}
      height={64}
      width={64}
    />
  );
}
