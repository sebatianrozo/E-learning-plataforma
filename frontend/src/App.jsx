import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [backendStatus, setBackendStatus] = useState('verificando...')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar conexión con el backend
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
    
    fetch(`${API_URL}/health`)
      .then(res => res.json())
      .then(data => {
        setBackendStatus('✅ Conectado')
      })
      .catch(error => {
        console.error('Error conectando al backend:', error)
        setBackendStatus('❌ Desconectado')
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-green-500">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">🎓 Plataforma E-learning</h1>
          <div className="text-sm text-gray-600">
            {loading ? 'Verificando...' : backendStatus}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">¡Bienvenido a tu Plataforma E-learning!</h2>
          <p className="text-gray-600 mb-6">
            Tu plataforma está configurada y lista para empezar a vender cursos en línea.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-bold text-blue-600 mb-2 text-lg">👨‍💼 Panel Admin</h3>
              <p className="text-sm text-gray-600">Gestiona tus cursos, estudiantes y ventas</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-green-600 mb-2 text-lg">👤 Estudiantes</h3>
              <p className="text-sm text-gray-600">Tus clientes compran y disfrutan los cursos</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
              <h3 className="font-bold text-purple-600 mb-2 text-lg">💳 Stripe</h3>
              <p className="text-sm text-gray-600">Recibe pagos de forma segura</p>
            </div>
          </div>

          <div className={`rounded-lg p-4 mb-8 ${loading ? 'bg-yellow-50 border border-yellow-200' : backendStatus.includes('✅') ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <p className="font-semibold">
              <strong>Estado del Backend:</strong> {backendStatus}
            </p>
            {loading && <p className="text-sm text-gray-600 mt-2">Verificando conexión...</p>}
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">✨ Características Implementadas</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✓</span> Estructura Backend y Frontend
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✓</span> Base de Datos PostgreSQL
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✓</span> Sistema de Autenticación JWT
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✓</span> Integración Stripe
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-yellow-500 mr-2">→</span> Dashboard Admin
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-yellow-500 mr-2">→</span> Catálogo de Cursos
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-yellow-500 mr-2">→</span> Carrito de Compra
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-yellow-500 mr-2">→</span> Panel de Estudiante
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">📚 Documentación</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <a href="#" className="text-blue-600 hover:text-blue-800 text-sm">→ README.md - Información General</a>
              <a href="#" className="text-blue-600 hover:text-blue-800 text-sm">→ DESPLIEGUE_RAPIDO.md - Deploy</a>
              <a href="#" className="text-blue-600 hover:text-blue-800 text-sm">→ DEVELOPMENT_GUIDE.md - Desarrollo</a>
              <a href="#" className="text-blue-600 hover:text-blue-800 text-sm">→ API_DOCUMENTATION.md - API</a>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white text-center py-4 mt-12">
        <p>🚀 Tu plataforma E-learning está lista para vender cursos | {new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}

export default App
