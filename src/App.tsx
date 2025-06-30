
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Dashboard from '@/pages/Dashboard'
import Prospects from '@/pages/Prospects'
import Contrats from '@/pages/Contrats'
import Activites from '@/pages/Activites'
import Layout from '@/components/Layout/Layout'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-background">
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/prospects" element={<Prospects />} />
              <Route path="/contrats" element={<Contrats />} />
              <Route path="/activites" element={<Activites />} />
            </Routes>
          </Layout>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App
