import React from 'react';
import { 
  Home, 
  Search, 
  MapPin, 
  ShoppingCart, 
  Heart, 
  Book, 
  CreditCard, 
  Eye, 
  Settings, 
  LogOut 
} from 'lucide-react';

const Sidebar = ({ activeItem = 'Riwayat Pemesanan' }) => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Search, label: 'Riwayat Pemesanan', path: '/DashboardOrderHistory' },
    { icon: MapPin, label: 'Lacak Pesanan', path: '/lacak-pesanan' },
    { icon: ShoppingCart, label: 'Keranjang Belanja', path: '/keranjang' },
    { icon: Heart, label: 'Wishlist', path: '/wishlist' },
    { icon: Book, label: 'Buka Toko', path: '/buka-toko' },
    { icon: CreditCard, label: 'Kartu & Alamat', path: '/kartu-alamat' },
    { icon: Eye, label: 'Riwayat Pencarian', path: '/riwayat-pencarian' },
    { icon: Settings, label: 'Pengaturan', path: '/pengaturan' },
    { icon: LogOut, label: 'Log-out', path: '/logout' }
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-full">
      <div className="p-6">
        <div className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = item.label === activeItem;
            
            return (
              <div
                key={index}
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                  isActive 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;