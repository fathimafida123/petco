import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from "react-redux"
import { store } from './redux/Stores/store.js'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import {QueryClient,QueryClientProvider} from "@tanstack/react-query"
const queryclient=new QueryClient
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={queryclient}>
    <Provider store={store}>
    <App />
    <Toaster position='top-right'/>
    </Provider>
    </QueryClientProvider>
     </BrowserRouter>
  </StrictMode>,
)
