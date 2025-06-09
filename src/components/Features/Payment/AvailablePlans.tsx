import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card';
import { paymentPlanData } from '@/lib/paymentData'
import { FaCircleCheck } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const AvailablePlans = () => {

    const handlePaymentPlanSwitch = (selectedIndex: number) => {
        paymentPlanData.map((plan, index) => {
            selectedIndex != index ? plan.subscriptionStatus = 'Switch plan' :
            plan.subscriptionStatus = 'current plan'
        })
    }

  return (
    <main className='grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
        {paymentPlanData.map((plan, index) => (
            <div key={index} className={`border flex flex-col gap-y-5 ${plan.subscriptionStatus === "current plan" ? "border-blue-600" : "border-[#E2E8F0]"} p-6 rounded-lg`}>
                <section className='flex items-center justify-between'>
                    <div className='items-center fex'>
                        <h3 className='font-semibold text-xl'>{plan.planType} {plan.subscriptionStatus == 'current plan' && <span className='bg-[#F2F8F4] text-blue-600 rounded-xl py-1 px-2 font-bold text-[12px]'>{plan.subscriptionStatus}</span>}</h3>
                        <p className='text-sm text-[#A2A2A2]'>{plan.targetAudience}</p>
                    </div>
                    <div className='text-right'>
                        <h3 className='text-2xl font-bold'>{plan.planPrice}</h3>
                        <p className='text-[#A2A2A2]'>{plan.planSubDuration}</p>
                    </div>
                </section>

                <hr />

                <section className='flex flex-col gap-y-5'>
                    <div>
                        <h3 className='text-xl font-medium'>Features</h3>
                        <p className='text-sm text-[#A2A2A2]'>{plan.featuresInfo}</p>
                    </div>

                    <div className='flex flex-col gap-y-2'>
                        {plan.planFeatures.map((feature, index) => (
                            <div key={index} className='flex items-center gap-x-2'>
                                <FaCircleCheck className='text-[#343CED]' />
                                <p className='text-[#454545] text-sm capitalize'>{feature}</p>
                            </div>
                        ))}
                    </div>

                    {plan.subscriptionStatus !== "current plan" && <Link to="/dashboard/checkout"><Button onClick={() => handlePaymentPlanSwitch(index)} className='font-bold w-full text-white mt-3 bg-[#343CED] hover:bg-[#343CED]/60'>{plan.subscriptionStatus}</Button></Link>}
                </section>
            </div>
        ))}

        <Card className='flex flex-col items-center gap-y-7 text-center bg-[url("/images/dashboard/Premium.png")] bg-cover bg-center bg-no-repeat rounded-[8%] py-10 bg-[#343CED]'>
            <div className='flex flex-col gap-y-6'>
                <span className='capitalize py-2 px-4 rounded-xl bg-background font-semibold'>The Ultimate</span>
                <h2 className='text-3xl text-[#FFC84A] font-bold'>Diamond</h2>
            </div>

            <div className='space-y-6'>
                <div className='space-y-2'>
                    <h3 className='text-2xl text-background'>Customize your plan</h3>
                    <p className='text-background/70'>With this plan, you can select and combine features from our wide range of available options.</p>
                </div>

                <Button className='py-2 h-[45px] px-5 bg-[#FFC84A] hover:bg-background transition-colors duration-300 w-full font-bold text-lg text-[#343CED]'>Contact Us</Button>
            </div>
        </Card>
    </main>
  )
}

export default AvailablePlans