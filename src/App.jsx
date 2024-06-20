import MyLayout from './components/MyLayout'
import {Routes, Route} from 'react-router-dom'
import Supplier from './pages/Supplier'
import Client from './pages/Client'
import Product from './pages/Product'
import Purchase from './pages/Purchase'
import PurchaseReturn from './pages/PurchaseReturn'
import Sales from './pages/Sales'
import SalesReturn from './pages/SalesReturn'
import Administrator from './pages/Administrator'
import Employee from './pages/Employee'
import Departement from './pages/Departement'


function App() {

  return (
    <>
     <MyLayout>
      <Routes>
        <Route path='info/supplier' element={<Supplier />}/> 
        <Route path='info/client' element={<Client />}/>
        <Route path='info/product' element={<Product />}/>
        <Route path='procurement/purchase' element={<Purchase />}/>
        <Route path='procurement/purchase_return' element={<PurchaseReturn />}/>
        <Route path='sales/sales' element={<Sales />}/>
        <Route path='sales/sales_returns' element={<SalesReturn />}/>
        <Route path='admin/administrator' element={<Administrator />}/>
        <Route path='admin/employee' element={<Employee/>}/>
        <Route path='admin/departement' element={<Departement />}/>
        
      </Routes>
     </MyLayout>
    </>
  )
}

export default App
