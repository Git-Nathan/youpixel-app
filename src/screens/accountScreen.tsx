import {observer} from 'mobx-react-lite';
import {useState} from 'react';
import {accountStoreIntance} from '../auth/authProvider';
import {SigninScreen} from '../components/account/signinScreen';
import {AccountHeader} from '../components/header/accountHeader';

export interface IAccountScreen {}

export const AccountScreen = observer(({}: IAccountScreen) => {
  const [accountStore] = useState(() => accountStoreIntance);

  return <>{accountStore.isSignedIn ? <AccountHeader /> : <SigninScreen />}</>;
});
