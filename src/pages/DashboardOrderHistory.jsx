import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Sidebar from '../components/sidebar';

const DashboardOrderHistory = () => {
  const orderData = [
    {
      orderId: 'FP000741',
      date: 'Dec 16, 2019 07:42',
      total: '550.03 Produksi',
      status: 'Completed',
      statusColor: 'text-green-600',
      action: 'View Details'
    },
    {
      orderId: 'FP000747',
      date: 'Dec 7, 2019 23:26',
      total: '378.13 Produksi',
      status: 'Completed',
      statusColor: 'text-green-600',
      action: 'View Details'
    },
    {
      orderId: 'FP000748',
      date: 'Dec 2, 2019 19:28',
      total: 'Rp 346.06 Produksi',
      status: 'Completed',
      statusColor: 'text-green-600',
      action: 'View Details'
    },
    {
      orderId: 'FP000747',
      date: 'Feb 2, 2019 19:28',
      total: '£2261.2 Produksi',
      status: 'Completed',
      statusColor: 'text-green-600',
      action: 'View Details'
    },
    {
      orderId: '4478998',
      date: 'Dec 16, 2019 07:42',
      total: '£346.2 Produksi',
      status: 'Completed',
      statusColor: 'text-green-600',
      action: 'View Details'
    },
    {
      orderId: '4478998',
      date: 'Dec 16, 2019 07:42',
      total: '£9705.2 Produksi',
      status: 'Cancelled',
      statusColor: 'text-red-600',
      action: 'View Details'
    },
    {
      orderId: '4472007741',
      date: 'Feb 2, 2019 19:28',
      total: '390.03 Produksi',
      status: 'Completed',
      statusColor: 'text-green-600',
      action: 'View Details'
    },
    {
      orderId: '4472907741',
      date: 'Dec 2, 2019 19:28',
      total: '£1,500.16 Produksi',
      status: 'Completed',
      statusColor: 'text-green-600',
      action: 'View Details'
    },
    {
      orderId: '4472907741',
      date: 'Dec 16, 2019 07:42',
      total: '£1,500.16 Produksi',
      status: 'Cancelled',
      statusColor: 'text-red-600',
      action: 'View Details'
    },
    {
      orderId: '4472907741',
      date: 'Dec 16, 2019 07:42',
      total: '£1,500.16 Produksi',
      status: 'Completed',
      statusColor: 'text-green-600',
      action: 'View Details'
    },
    {
      orderId: '4472907741',
      date: 'Dec 16, 2019 07:42',
      total: '390.03 Produksi',
      status: 'Completed',
      statusColor: 'text-green-600',
      action: 'View Details'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeItem="Riwayat Pemesanan" />
      
      <div className="flex-1 p-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center space-x-2 text-gray-500 text-sm">
            <span>Home</span>
            <span>/</span>
            <span>User Account</span>
            <span>/</span>
            <span className="text-gray-900">Product Comparison</span>
          </nav>
        </div>

        {/* Order History Header */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">ORDER HISTORY</h2>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ORDER ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    STATUS
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    DATE/TIME
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    TOTAL
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orderData.map((order, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.orderId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${order.statusColor}`}>
                        {order.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.total}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        {order.action} →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 flex items-center justify-center border-t border-gray-200">
            <nav className="flex items-center space-x-2">
              <button className="p-2 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">
                <ChevronLeft size={16} />
              </button>
              <button className="px-3 py-2 rounded-md bg-blue-500 text-white text-sm">
                1
              </button>
              <button className="px-3 py-2 rounded-md text-gray-500 hover:bg-gray-50 text-sm">
                2
              </button>
              <button className="px-3 py-2 rounded-md text-gray-500 hover:bg-gray-50 text-sm">
                3
              </button>
              <button className="px-3 py-2 rounded-md text-gray-500 hover:bg-gray-50 text-sm">
                4
              </button>
              <button className="px-3 py-2 rounded-md text-gray-500 hover:bg-gray-50 text-sm">
                5
              </button>
              <button className="px-3 py-2 rounded-md text-gray-500 hover:bg-gray-50 text-sm">
                6
              </button>
              <button className="p-2 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">
                <ChevronRight size={16} />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOrderHistory;