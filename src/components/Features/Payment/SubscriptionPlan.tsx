import { CreditCard, RefreshCw, ArrowUp, Edit } from 'lucide-react';

const SubscriptionPlan = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Plan Header */}
      <section className='flex flex-col gap-y-3 p-6 border border-[#E2E8F0] rounded-lg'>
        <div className="flex items-center justify-between pb-4">
          <div>
            <h2 className="text-xl font-bold">Gold plan</h2>
            <p className="text-gray-600">Monthly 30 days remaining</p>
          </div>
          <div className='flex items-end gap-x-1'>
            <h2 className="text-3xl font-bold">N10,000</h2>
            <p>month</p>
          </div>
        </div>

        <div className="border-b pb-4">
          <p className="text-gray-600">M of 40 users</p>
        </div>

        <div className='flex items-center justify-between'>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">Enable auto renew</p>
            <button type='button' title='button' className="text-gray-400">
              <Edit size={16} />
            </button>
          </div>

          {/* Upgrade Button */}
          <button type='button' title='button' className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded font-medium">
            <ArrowUp size={16} />
            Upgrade plan
          </button>
        </div>
      </section>



      {/* Payment Method Section */}
      <section className='flex flex-col gap-y-3 p-6 border border-[#E2E8F0] rounded-lg'>
        <h3 className="font-medium">Payment Method</h3>
        <p className="text-sm text-gray-600">Change how you pay for your plan</p>
        
        <div className="flex items-center justify-between border p-3 rounded">
          <div>
            <p className="font-medium">VISA</p>
            <p className="text-sm text-gray-600">You ending in LISA</p>
            <p className="text-sm text-gray-600">Expiry 06/2024</p>
          </div>
          <button type='button' title='button' className="text-gray-400">
            <Edit size={16} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default SubscriptionPlan;