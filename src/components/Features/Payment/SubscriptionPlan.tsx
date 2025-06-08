import CurrentPlan from '@/components/common/dashboard/CurrentPlan';
import { Edit } from 'lucide-react';

const SubscriptionPlan = () => {
  return (
    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
      {/* Plan Header */}
      <CurrentPlan />



      {/* Payment Method Section */}
      <section className='flex flex-col gap-y-3 p-6 border border-[#E2E8F0] rounded-lg'>
        <h3 className="font-medium">Payment Method</h3>
        <p className="text-sm text-gray-600">Change how you pay for your plan</p>
        
        <div className="flex items-center justify-between p-3 border rounded">
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