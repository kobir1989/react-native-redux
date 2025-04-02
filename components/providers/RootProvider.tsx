import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/redux';
import ErrorBoundary from '@/components/ErrorBoundary';

export const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErrorBoundary retry={() => {}} error={() => {}}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
};
