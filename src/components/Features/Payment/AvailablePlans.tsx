import { Button } from '@/components/ui/button'
import { payentPlanData } from '@/lib/paymentData'

const AvailablePlans = () => {
  return (
    <main className='grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
        {payentPlanData.map((plan, index) => (
            <div key={index} className={`border flex flex-col gap-y-3 ${plan.subscriptionStatus === "current plan" ? "border-blue-600" : "border-[#E2E8F0]"} p-6 rounded-lg`}>
                <section className='flex items-center justify-between'>
                    <div className='items-center fex'>
                        <h3 className='font-semibold'>{plan.planType} {plan.subscriptionStatus == 'current plan' && <span className='bg-[#F2F8F4] text-blue-600 rounded-xl py-1 px-2 font-bold text-[12px]'>{plan.subscriptionStatus}</span>}</h3>
                        <p className='text-sm text-[#A2A2A2]'>{plan.targetAudience}</p>
                    </div>
                    <div className='text-right'>
                        <h3 className='text-2xl font-bold'>{plan.planPrice}</h3>
                        <p className='text-[#A2A2A2] capitalize'>{plan.planSubDuration}</p>
                    </div>
                </section>

                <hr />

                <section className='flex flex-col gap-y-4'>
                    <div>
                        <h3>Features</h3>
                        <p className='text-sm text-[#A2A2A2]'>{plan.featuresInfo}</p>
                    </div>

                    <div className='flex flex-col gap-y-2'>
                        {plan.planFeatures.map((feature, index) => (
                            <div key={index} className='flex items-center gap-x-2'>
                                {/* <circle-check /> */}
                                <p className='text-[#A2A2A2] text-sm capitalize'>{feature}</p>
                            </div>
                        ))}
                    </div>
                    {plan.subscriptionStatus !== "current plan" && <Button onClick={() => payentPlanData[index].subscriptionStatus = 'current plan'} className='capitalize'>{plan.subscriptionStatus}</Button>}
                </section>
            </div>
        ))}
    </main>
  )
}

export default AvailablePlans