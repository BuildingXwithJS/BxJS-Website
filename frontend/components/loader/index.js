import React from 'react';
import ReactLoading from 'react-loading';
import { useTheme } from '../theme/index.js';

export default function Loader() {
  const { theme } = useTheme();

  return (
    <ReactLoading
      type="spokes"
      color={theme === 'dark' ? 'white' : 'black'}
      height={32}
      width={32}
    />
  );
}
