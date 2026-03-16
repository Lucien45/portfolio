import { useState } from 'react'
import Routes from './routes/Routes'
import LoadingSpinner from './components/LoadingSpinner';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      {loading && <LoadingSpinner/>}
      <BrowserRouter>
        <Routes setLoading={setLoading} />
      </BrowserRouter>
    </>
  )
}

export default App
