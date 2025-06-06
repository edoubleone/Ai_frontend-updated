const Invoice = () => {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Invoice</h1>
            <p className="text-gray-600 font-medium">#27346733-022</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white text-sm font-bold">K</span>
            </div>
            <span className="text-2xl font-bold text-blue-600">Kool Ai</span>
          </div>
        </div>

        {/* Invoice Dates */}
        <div className="mb-12 space-y-2">
          <div className="flex">
            <span className="text-gray-700 w-32">Invoice Date</span>
            <span className="text-gray-900 font-medium">26 May, 2025</span>
          </div>
          <div className="flex">
            <span className="text-gray-700 w-32">Due Date</span>
            <span className="text-gray-900 font-medium">27 May, 2026</span>
          </div>
        </div>

        {/* Billing Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Billed To */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Billed To</h3>
            <div className="space-y-1 text-gray-700">
              <p>Xyz</p>
              <p>xyz@gmail.com</p>
              <p>9029 Salt Lake, Mandalor</p>
              <p>(+254) 724-453-233</p>
            </div>
          </div>

          {/* From */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">From</h3>
            <div className="space-y-1 text-gray-700">
              <p>ArgenticAl</p>
              <p>argentical.com</p>
              <p>9029 Arcane, Jupiter 2</p>
              <p>(+254) 243-124-392</p>
            </div>
          </div>

          {/* Status */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Status</h3>
            <span className="inline-block bg-orange-400 text-white text-sm font-medium px-3 py-1 rounded">
              Pending
            </span>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-8">
          <p className="text-gray-700">
            For questions above your order, visit{" "}
            <a href="#" className="text-blue-600 underline">
              argentcaicontactus
            </a>
          </p>
        </div>

        {/* Invoice Details */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Invoice Details</h3>
          
          {/* Table Header */}
          <div className="grid grid-cols-5 gap-4 py-3 border-b border-gray-200 text-gray-700 font-medium">
            <div>Description</div>
            <div className="text-center">Plan</div>
            <div className="text-center">Sub-total</div>
            <div className="text-center">VAT</div>
            <div className="text-right">Amount</div>
          </div>

          {/* Table Row */}
          <div className="grid grid-cols-5 gap-4 py-4 border-b border-gray-200">
            <div className="text-gray-700"></div>
            <div className="text-center text-gray-900">Platinum</div>
            <div className="text-center text-gray-900">$6000</div>
            <div className="text-center text-gray-900">$300</div>
            <div className="text-right text-gray-900">$65000</div>
          </div>

          {/* Invoice Total */}
          <div className="flex justify-end mt-6">
            <div className="text-right">
              <div className="text-xl font-semibold text-gray-900">
                Invoice Total
                <span className="ml-8">$65000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Instructions */}
        <div className="mb-12">
          <h3 className="text-blue-600 font-semibold text-lg mb-4">PAYMENT INSTRUCTIONS</h3>
          <div className="space-y-1 text-gray-700">
            <p>Blocks design studio</p>
            <p>Bank name: ABC Bank limited</p>
            <p>SWIFT/IBAN: NZ0201230012</p>
            <p>Account number: 12-1234-123456-12</p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 pt-6">
          <p className="text-gray-600 text-sm">© Copyright 2024 ArgenticAl Limited</p>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
