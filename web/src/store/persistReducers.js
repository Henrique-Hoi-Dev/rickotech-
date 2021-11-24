import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      key: 'vendas',
      storage,
      whitelist: [
        'auth', 
        'user', 
        'adress', 
        'product', 
        'sales', 
        'account', 
        'portion', 
        'servicos',
        'financialBox'],
    },
    reducers
  );

  return persistedReducer;
};
