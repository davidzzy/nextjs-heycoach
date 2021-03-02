import '../styles/global.css'
import PlayerContext from '../context/AppContext'
import React, { useState } from "react";

export default function App({ Component, pageProps }) {
  const [context, setContext] = useState([]);
    return (
    <PlayerContext.Provider value={[context, setContext]}>
      <Component {...pageProps} />
    </PlayerContext.Provider>
    )
  }