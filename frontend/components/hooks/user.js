import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

export const useUser = () => {
  const { data: session } = useSession();

  const user = useMemo(() => session?.user, [session]);
  const token = useMemo(() => session?.token, [session]);

  return { user, token };
};
