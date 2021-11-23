import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import user from './user/sagas';
import adress from './adress/sagas';
import product from './product/sagas';
import sales from './sales/sagas';
import account from './account/sagas';
import portion from './portion/sagas';
import servicos from './servicos/sagas';

export default function* rootSaga() {
  return yield all([
    auth, 
    user, 
    adress, 
    product, 
    sales, 
    account, 
    portion, 
    servicos
  ]);
}
