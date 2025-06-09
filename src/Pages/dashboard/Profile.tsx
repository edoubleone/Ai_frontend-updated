import AvailablePlans from '@/components/Features/Payment/AvailablePlans'
import SubscriptionPlan from '@/components/Features/Payment/SubscriptionPlan'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import userMain from "/images/dashboard/userMain.png"
import camera from "/images/dashboard/camera.png"
import { fieldsetStyles } from '@/components/Features/bot/create-bot/forms'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { GetUserData } from '@/services/api/auth'

const tabMenu = ["Account", "My Plan", "Available Plans"]
const inputField = "w-full border px-4 py-[8px] outline-none rounded-md p-2"

const Profile = () => {
    const { data: user } = useQuery({
        queryFn: GetUserData,
        queryKey: ["user"],
    });

    const [activeMenu, setActiveMenu] = useState(tabMenu[0])

    const Names = user?.full_name.split(" ")
    console.log(Names)

  return (
    <div className='flex flex-col gap-y-5 w-full'>
        <h2 className='text-2xl font-bold'>Profile</h2>

        <main className='flex flex-col gap-y-6'>
            <div className='flex flex-col px-5 py-6 rounded-lg md:px-6 lg:px-9 bg-background gap-y-10'>
                <section className='flex items-center gap-x-4'>
                    <div className='relative w-fit'>
                        <Avatar className="w-16 h-16 cursor-pointer">
                            <AvatarImage src={userMain} width={1000} height={1000} alt="User" />
                            <AvatarFallback className="text-sm text-white bg-orange-500">U</AvatarFallback>
                        </Avatar>
                        <div className='p-[6px] rounded-full absolute bottom-0 cursor-pointer -right-1 bg-white shadow-lg w-fit'>
                            <img src={camera} alt="edit photo" />
                        </div>
                    </div>

                    <div className='flex flex-col gap-y-1'>
                        <h2 className='text-lg font-semibold'>{user?.full_name ? user.full_name : "Elizabeth Kafaru"}</h2>
                        <p className='text-[#737373] text-sm'>{user?.email ? user.email : "elizabeth@gmail.com"}</p>
                    </div>
                </section>
                

                <div className='border-b border-[#E2E8F0] flex items-center justify-between md:justify-start'>
                    {tabMenu.map((menu, index) => (
                        <nav key={index} onClick={() => setActiveMenu(tabMenu[index])} className={`transition-all duration-300 border-b-[2px] py-2 px-7 font-semibold ${menu === activeMenu ? "text-blue-600 border-blue-600" : "hover:text-gray-400 cursor-pointer"}`}>{menu}</nav>
                    ))}
                </div>

                {activeMenu === tabMenu[0] ? (
                    <section className='min-h-[calc(100vh-400px)]'>
                        <form className='flex flex-col gap-y-7'>
                            <div className='flex justify-between gap-x-40'>
                                <fieldset className={fieldsetStyles}>
                                    <label htmlFor="firstname">First Name</label>
                                    <input id="firstname" value={Names ? Names[0] : "Elizabeth"} name='firstname' type="text" className={inputField} />
                                </fieldset>

                                <fieldset className={fieldsetStyles}>
                                    <label htmlFor="lastname">Last Name</label>
                                    <input id="lastname" value={Names ? Names[1] : "Kafaru"} name='lastname' type="text" className={inputField} />
                                </fieldset>
                            </div>

                            <div className='flex justify-between gap-x-40'>
                                <fieldset className={fieldsetStyles}>
                                    <label htmlFor="email">Email</label>
                                    <input id="email" value={user?.email ? user.email : "elizabeth@gmail.com"} name='email' type="email" className={inputField} />
                                </fieldset>

                                <fieldset className={fieldsetStyles}>
                                    <label htmlFor="language">Language</label>
                                    <select
                                        name="language"
                                        id="language"
                                        className={inputField}
                                    >
                                        <option defaultValue="Select your audience">English</option>
                                        <option value="All Users">All Users</option>
                                        <option value="Image">Image</option>
                                    </select>
                                </fieldset>
                            </div>

                            
                        </form>
                    </section>
                ) : activeMenu === tabMenu[1] ? <SubscriptionPlan /> : <AvailablePlans />}
            </div>
        </main>
    </div>
  )
}

export default Profile