import React, { createContext, useState } from 'react'

export const addprojectResponseContext = createContext()
export const editProjectResponseContext = createContext()
export const authContext = createContext()

function Contextapi({ children }) {

  const [addResponse, setAddRespose] = useState("")
  const [editResponse, setEditResponse] = useState("")
  const [authContextStatus, setAuthContextStatus] = useState(false)

  return (
    <>
      <addprojectResponseContext.Provider value={{ addResponse, setAddRespose }}>
        <editProjectResponseContext.Provider value={{ editResponse, setEditResponse }}>
          <authContext.Provider value={{ authContextStatus, setAuthContextStatus }}>
            {children}
          </authContext.Provider>
        </editProjectResponseContext.Provider>
      </addprojectResponseContext.Provider>
    </>
  )
}

export default Contextapi