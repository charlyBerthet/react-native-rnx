import React, { useReducer, createContext, Dispatch, useContext } from 'react';

interface StateProviderProps {
  children: JSX.Element | JSX.Element[];
}

let Store: React.Context<any>;

export function createStateProvider<T>(
  initial: T,
  reducer: (state: T, action: { type: string; value: any }) => T
) {
  interface Context {
    state: T;
    dispatch: Dispatch<{ type: string; value: any }>;
  }

  const initialContext: Context = {
    state: initial,
    dispatch: () => {},
  };
  Store = createContext(initialContext);

  const StateProvider = ({ children }: StateProviderProps) => {
    const [state, dispatch] = useReducer(
      (accState: T, action: { type: string; value: any }) => {
        console.log('[StateProvider.dispatch] action', action);
        console.log(
          '[StateProvider.dispatch] stateBefore',
          JSON.stringify(accState)
        );
        let partialUpdate: Partial<T> = {};
        switch (action.type) {
          case 'set':
            partialUpdate = { ...partialUpdate, ...action.value };
            break;
        }
        const newState = {
          ...reducer({ ...accState, ...partialUpdate }, action),
        };
        console.log(
          '[StateProvider.dispatch] stateAfter',
          JSON.stringify(newState)
        );
        return newState;
      },
      initial
    );
    return (
      <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
    );
  };

  return StateProvider;
}

export function useGlobalState<T>() {
  if (!Store) {
    throw 'Please initialize Store first using createStateProvider';
  }
  const { state, dispatch } = useContext(Store);

  const _dispatch = (actionType: string, actionValue: any) => {
    dispatch({ type: actionType, value: actionValue });
  };

  const setGlobalState = (partial: Partial<T>) => {
    console.log('------>>>setGlobalState', JSON.stringify(partial));
    dispatch({ type: 'set', value: partial });
  };

  return { globalState: state as T, dispatch: _dispatch, setGlobalState };
}
