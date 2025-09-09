export interface ReturnOrder {
  id: string;
  orderId: string;
  customerName: string;
  customerPhone: string;
  productName: string;
  productImage: string;
  quantity: number;
  returnReason: string;
  returnDate: string;
  status: 'Return Initiated' | 'Return in Progress' | 'QC in Progress' | 'Returned' | 'Scrapped' | 'Cancelled';
  refundAmount: number;
  trackingNumber?: string;
  notes?: string;
}

export interface TimeFilter {
  label: string;
  value: string;
  startDate?: Date;
  endDate?: Date;
}