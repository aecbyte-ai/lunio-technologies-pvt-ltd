import { ReturnOrder } from '../types/ReturnOrder';

export const sampleReturnOrders: ReturnOrder[] = [
  {
    id: 'RET001',
    orderId: 'ORD-2024-001',
    customerName: 'John Smith',
    customerPhone: '+1-555-0123',
    productName: 'Wireless Bluetooth Headphones',
    productImage: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=100',
    quantity: 1,
    returnReason: 'Defective product',
    returnDate: '2024-01-15',
    status: 'Return Initiated',
    refundAmount: 89.99,
    notes: 'Customer reported audio issues'
  },
  {
    id: 'RET002',
    orderId: 'ORD-2024-002',
    customerName: 'Sarah Johnson',
    customerPhone: '+1-555-0124',
    productName: 'Smart Watch Series 5',
    productImage: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=100',
    quantity: 1,
    returnReason: 'Wrong size',
    returnDate: '2024-01-14',
    status: 'Return in Progress',
    refundAmount: 299.99,
    trackingNumber: 'TRK123456789',
    notes: 'Customer needs larger size'
  },
  {
    id: 'RET003',
    orderId: 'ORD-2024-003',
    customerName: 'Mike Davis',
    customerPhone: '+1-555-0125',
    productName: 'Gaming Mechanical Keyboard',
    productImage: 'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=100',
    quantity: 1,
    returnReason: 'Not as described',
    returnDate: '2024-01-13',
    status: 'QC in Progress',
    refundAmount: 149.99,
    trackingNumber: 'TRK123456790',
    notes: 'Product received for quality check'
  },
  {
    id: 'RET004',
    orderId: 'ORD-2024-004',
    customerName: 'Emily Wilson',
    customerPhone: '+1-555-0126',
    productName: 'Laptop Stand Adjustable',
    productImage: 'https://images.pexels.com/photos/4158/apple-iphone-smartphone-desk.jpg?auto=compress&cs=tinysrgb&w=100',
    quantity: 2,
    returnReason: 'Changed mind',
    returnDate: '2024-01-12',
    status: 'Returned',
    refundAmount: 79.98,
    trackingNumber: 'TRK123456791',
    notes: 'Refund processed successfully'
  },
  {
    id: 'RET005',
    orderId: 'ORD-2024-005',
    customerName: 'David Brown',
    customerPhone: '+1-555-0127',
    productName: 'Wireless Mouse',
    productImage: 'https://images.pexels.com/photos/2115217/pexels-photo-2115217.jpeg?auto=compress&cs=tinysrgb&w=100',
    quantity: 1,
    returnReason: 'Damaged in shipping',
    returnDate: '2024-01-11',
    status: 'Scrapped',
    refundAmount: 29.99,
    notes: 'Product damaged beyond repair'
  },
  {
    id: 'RET006',
    orderId: 'ORD-2024-006',
    customerName: 'Lisa Anderson',
    customerPhone: '+1-555-0128',
    productName: 'Phone Case Clear',
    productImage: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=100',
    quantity: 3,
    returnReason: 'Duplicate order',
    returnDate: '2024-01-10',
    status: 'Cancelled',
    refundAmount: 44.97,
    notes: 'Customer cancelled return request'
  },
  {
    id: 'RET007',
    orderId: 'ORD-2024-007',
    customerName: 'Robert Taylor',
    customerPhone: '+1-555-0129',
    productName: 'USB-C Cable 6ft',
    productImage: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=100',
    quantity: 2,
    returnReason: 'Defective product',
    returnDate: '2024-01-09',
    status: 'Return Initiated',
    refundAmount: 19.98,
    notes: 'Cable not charging properly'
  },
  {
    id: 'RET008',
    orderId: 'ORD-2024-008',
    customerName: 'Jennifer Martinez',
    customerPhone: '+1-555-0130',
    productName: 'Bluetooth Speaker Portable',
    productImage: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=100',
    quantity: 1,
    returnReason: 'Poor sound quality',
    returnDate: '2024-01-08',
    status: 'Return in Progress',
    refundAmount: 59.99,
    trackingNumber: 'TRK123456792',
    notes: 'Customer reported audio distortion'
  }
];

export const getOrdersByStatus = (status: string, orders: ReturnOrder[] = sampleReturnOrders): ReturnOrder[] => {
  if (status === 'All') return orders;
  return orders.filter(order => order.status === status);
};

export const getOrdersByTimeFilter = (orders: ReturnOrder[], timeFilter: string): ReturnOrder[] => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  switch (timeFilter) {
    case 'Today':
      return orders.filter(order => {
        const orderDate = new Date(order.returnDate);
        return orderDate >= today;
      });
    case 'Yesterday':
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      return orders.filter(order => {
        const orderDate = new Date(order.returnDate);
        return orderDate >= yesterday && orderDate < today;
      });
    case 'Last 7 days':
      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 7);
      return orders.filter(order => {
        const orderDate = new Date(order.returnDate);
        return orderDate >= weekAgo;
      });
    case 'Last 30 days':
      const monthAgo = new Date(today);
      monthAgo.setDate(monthAgo.getDate() - 30);
      return orders.filter(order => {
        const orderDate = new Date(order.returnDate);
        return orderDate >= monthAgo;
      });
    default:
      return orders;
  }
};