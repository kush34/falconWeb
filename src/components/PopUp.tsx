import React from 'react';

const PopUp = ({ ticket, setShowPopup }) => {
    if (!ticket) return null;

  const isWithdraw = ticket.type === 'Withdraw';
  // console.log(ticket)
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md text-black relative">
        
        {/* Close button (×) */}
        <button
          className="absolute top-2 right-4 text-2xl text-gray-500 hover:text-black"
          onClick={() => setShowPopup(false)}
        >
          ×
        </button>

        <h2 className="text-xl font-semibold mb-2">Transaction Information</h2>
        <p className="mb-4 text-gray-600">View transaction type and details</p>

        <div className="space-y-2 text-sm">
          <div><strong>Username:</strong> {ticket.profiles?.username}</div>
          <div><strong>User ID:</strong> {ticket.profiles?.id}</div>
          <div><strong>Type:</strong> {ticket.type || 'N/A'}</div>
          <div><strong>Amount:</strong> ₹{ticket.amount || '0'}</div>
          <div><strong>Status:</strong> {ticket.ticket_status || 'N/A'}</div>
            {!isWithdraw &&
            <div><strong>Transaction ID:</strong> {ticket.transaction_id || 'N/A'}</div>
            }

          {isWithdraw && (
            ticket.is_upi == true ? (
              <>
                <div><strong>UPI ID:</strong> {ticket.upi_id || 'N/A'}</div>
                <div><strong>Phone:</strong> {ticket.phone || 'N/A'}</div>
              </>
            ) : (
              <>
                <div><strong>Account Number:</strong> {ticket.account_number || 'N/A'}</div>
                <div><strong>Account Name:</strong> {ticket.account_name || 'N/A'}</div>
                <div><strong>IFSC Code:</strong> {ticket.ifsc_code || 'N/A'}</div>
              </>
            )
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={() => setShowPopup(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
