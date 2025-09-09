export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'suspended';
  location: {
    city: string;
    state: string;
    country: string;
  };
  signupDate: string;
  lastOrderDate?: string;
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  loyaltyTier: 'bronze' | 'silver' | 'gold' | 'platinum';
  segment: string[];
  avatar?: string;
}

export interface Order {
  id: string;
  customerId: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  total: number;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress: Address;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface SupportTicket {
  id: string;
  customerId: string;
  subject: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  satisfactionRating?: number;
}

export interface CustomerSegment {
  id: string;
  name: string;
  description: string;
  criteria: SegmentCriteria;
  customerCount: number;
  createdAt: string;
}

export interface SegmentCriteria {
  totalSpentMin?: number;
  totalSpentMax?: number;
  orderCountMin?: number;
  orderCountMax?: number;
  lastOrderDaysAgo?: number;
  loyaltyTiers?: string[];
  locations?: string[];
  signupDateRange?: {
    start: string;
    end: string;
  };
}