import { useSession } from 'next-auth/client';
import { useMemo } from 'react';

export const useUser = () => {
  const [session] = useSession();

  const user = useMemo(() => session?.user, [session]);
  const token = useMemo(() => session?.token, [session]);

  return { user, token };
};
