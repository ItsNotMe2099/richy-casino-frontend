import React, {useState} from 'react';

const ModalStateContext = React.createContext({
  modalProps: null,
  modalKey: null,
  open: (key, props = {}) => {},
  close: () => {}
});

export function ModalStateProvider(props) {
  const [modalKey, setModalKey] = useState(null);
  const [modalProps, setModalProps] = useState({});
  const open = (modalKey, modalProps = {}) => {
    setModalKey(modalKey);
    setModalProps(modalProps);
  }
  const close = () => {
    setModalKey(null);
  }
  const value = React.useMemo(() => ({ open, close, modalKey, modalProps }), [
    open,
    close,
    modalKey,
    modalProps
  ]);

  return <ModalStateContext.Provider value={value} {...props} />;
}

// a hook to use whenever we need to consume data from `GlobalStateProvider`.
// So, We don't need React.useContext everywhere we need data from GlobalStateContext.

export function useModal() {
  const context = React.useContext(ModalStateContext);

  if (!context) {
    throw new Error("You need to wrap GlobalStateProvider.");
  }

  return context;
}