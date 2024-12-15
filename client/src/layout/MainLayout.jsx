import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const MainLayout = () => {
  const {isAuthenticated} = useSelector(store=>store.auth);
  return (
    <div className='flex flex-col min-h-screen'>
        <Navbar/>
        <div className='flex-1 mt-16'>
            <Outlet/>
        </div>
        {!isAuthenticated && <Footer/>}
    </div>
  )
}

export default MainLayout