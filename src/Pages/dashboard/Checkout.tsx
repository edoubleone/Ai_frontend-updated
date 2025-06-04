
import { Download } from 'lucide-react';

const Checkout = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 md:p-8">
      <div className="w-full mx-auto">
        {/* Header with Download Button */}
        <div className="flex justify-end mb-6">
          <button type='button' className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
            <Download size={16} />
            <span className="text-sm">Download Invoice</span>
          </button>
        </div>

        {/* Main Invoice Card */}
        <div className="bg-white rounded-lg p-6 md:p-8 flex flex-col gap-y-5">
          {/* Pricing Plan Header */}
          <section className='border border-gray-200 flex flex-col p-3 rounded-2xl'>
            <div className="flex items-center bg-gray-50 rounded-lg px-4 py-3 justify-between mb-2">
                <div>
                    <p className="text-sm text-gray-600 mb-1">Pricing Plan</p>
                    <h1 className="text-2xl font-semibold text-gray-900">Platinum</h1>
                    <p className="text-sm text-gray-600 mt-1">For period ending: 26th Jul, 2025</p>
                </div>
                <span className="bg-orange-100 text-orange-800 text-xs font-medium px-3 py-1 rounded-full">
                Pending
                </span>
            </div>

            {/* Amount and Details Grid */}
            <div className="grid grid-cols-1 items-center lg:grid-cols-4 gap-2">
                {/* Amount Due Section */}
                <div className="rounded-lg px-4 py-3 border-gray-200 border">
                    <p className="text-sm text-gray-600 mb-2">Amount due:</p>
                    <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-gray-900">₦19,570.00</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Naira</p>
                    <p className="text-xs text-gray-500">July 26, 2024</p>
                </div>


                <div className='bg-gray-50 h-full flex flex-col justify-center px-4 py-3 rounded-lg'>
                    <p className="text-sm text-gray-600 mb-1">No of Users:</p>
                    <p className="text-xl font-semibold text-gray-900">40</p>
                </div>
                
                <div className='bg-gray-50 h-full flex flex-col justify-center px-4 py-3 rounded-lg'>
                    <p className="text-sm text-gray-600 mb-1">Invoice number:</p>
                    <p className="text-xl font-semibold text-gray-900">123456</p>
                </div>
                
                <div className='bg-gray-50 h-full flex flex-col justify-center px-4 py-3 rounded-lg'>
                    <p className="text-sm text-gray-600 mb-1">Invoice Date:</p>
                    <p className="text-xl font-semibold text-gray-900">June 26, 2024</p>
                </div>
            </div>
          </section>

          {/* Plan Details Section */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Plan Details</h3>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((item) => (
                <p key={item} className="text-gray-600">Lorem Ipsum</p>
              ))}
            </div>
          </div>

          {/* Pay Button */}
          <div className="flex justify-end">
            <button type='button' className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-12 py-3 rounded-lg transition-colors">
              Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;