import {ReactNode, useEffect, useState} from 'react';
import {AccountStore} from '../stores/account';

export const accountStoreIntance = new AccountStore();

export interface IAuthProviderProps {
  children: ReactNode;
}

export function AuthProvider(props: IAuthProviderProps) {
  const [accountStore] = useState(() => accountStoreIntance);

  useEffect(() => {
    accountStore.getUserFromStorage();
  }, []);

  return props.children;
}
