import CurrentPlan from '@/components/common/dashboard/CurrentPlan';

const SubscriptionPlan = () => {
  return (
    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
      {/* Plan Header */}
      <CurrentPlan />



      {/* Payment Method Section */}
      <section className='flex flex-col gap-y-8 p-5 border border-[#E2E8F0] rounded-lg'>
        <div>
          <h3 className="font-bold text-2xl text-[#232323]">Payment Method</h3>
          <p className="text-[14px] text-[#8B8B8B]">Change how you pay for your plan</p>
        </div>
        
        <div className="flex items-center justify-between py-[13px] px-[15px] border border-[#F0F2F5] rounded-lg h-[91px] w-full">
          <div className='flex items-center gap-x-3'>
            <div className="font-medium border border-[#F0F2F5] rounded-[4px] h-[40px] w-[66px] flex items-center justify-center">
              <img src='/images/dashboard/Vector.png' alt='visa card'  />
            </div>
            <div>
              <p className="text-[#454545] font-semibold">You ending in LISA</p>
              <p className="text-sm text-[#8B8B8B]">Expiry 06/2024</p>
            </div>
          </div>
          <button type='button' title='button' className="font-medium border border-[#343CED] text-[#343CED] rounded-[4px] h-[40px] w-[66px] flex items-center justify-center">
            Edit
          </button>
        </div>
      </section>
    </div>
  );
};

export default SubscriptionPlan;