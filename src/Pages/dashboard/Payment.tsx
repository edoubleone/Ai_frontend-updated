import AvailablePlans from '@/components/Features/Payment/AvailablePlans'
import PaymentHistory from '@/components/Features/Payment/PaymentHistory'
import SubscriptionPlan from '@/components/Features/Payment/SubscriptionPlan'
import { useState } from 'react'


const tabMenu = ["My Plan", "Available Plans"]

const Payment = () => {
    const [activeMenu, setActiveMenu] = useState<string>(tabMenu[0])
    
  // const [currentPage, setCurrentPage] = useState(1)
    // const [, setDeleteModalOpen] = useState(false)
    // const [, setBotToDelete] = useState<Transaction | null>(null)
    // const { toast } = useToast()


  return (
    <div className='flex flex-col gap-y-5 w-full'>
        <h2 className='font-bold text-2xl'>Payment</h2>

        <main className='flex flex-col gap-y-6'>
            <section className='py-6 px-5 md:px-6 lg:px-9 bg-background rounded-lg flex flex-col gap-y-6'>
                <div className='border-b border-[#E2E8F0] flex items-center justify-between md:justify-start'>
                    {tabMenu.map((menu, index) => (
                        <nav key={index} onClick={() => setActiveMenu(tabMenu[index])} className={`transition-all duration-300 border-b-[2px] py-2 px-7 font-semibold ${menu === activeMenu ? "text-blue-600 border-blue-600" : "hover:text-gray-400 cursor-pointer"}`}>{menu}</nav>
                    ))}
                </div>

                {activeMenu === tabMenu[0] ? <SubscriptionPlan /> : <AvailablePlans />}
            </section>

            {activeMenu === tabMenu[0] && <PaymentHistory />}
        </main>
    </div>
  )
}

export default Payment