import * as React from 'react'

const ModalContext = React.createContext()

function ModalProvider({ children }) {
  const [modalState, setModalState] = React.useState(false)

  return (
    <ModalContext.Provider
      value={{
        modalState,
        setModalState
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

const useModalContext = () => {
  const context = React.useContext(ModalContext)

  if (!context)
    throw new Error('useSettingsContext must be used within a SettingsProvider')

  return context
}

export { ModalProvider, useModalContext }
