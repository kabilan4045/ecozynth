import type { Address, Order } from './types'

const homeAddress: Address = {
  id: 'addr-1',
  fullName: 'Demo Customer',
  phone: '9876543210',
  line1: 'Flat 12B, Lorem Residency',
  line2: 'Ipsum Main Road',
  landmark: 'Near Dolor Park',
  city: 'Bengaluru',
  state: 'Karnataka',
  pincode: '560001',
  isDefault: true,
}

/** Three mock orders for the account area and order tracking. */
export const mockOrders: Order[] = [
  {
    id: 'EZ104521',
    placedOn: '2026-11-10',
    status: 'Processing',
    items: [{ productSlug: 'shower-pure-15', name: 'ShowerPure 15-Stage Shower Filter', division: 'aqua', variant: 'Chrome', quantity: 2, price: 1499 }],
    subtotal: 2998,
    discount: 300,
    shipping: 0,
    total: 2698,
    paymentMethod: 'UPI',
    address: homeAddress,
    timeline: [
      { step: 'Ordered', date: '2026-11-10' },
      { step: 'Packed', date: null },
      { step: 'Shipped', date: null },
      { step: 'Out for delivery', date: null },
      { step: 'Delivered', date: null },
    ],
    courier: 'Lorem Express',
    trackingNumber: 'LX0000104521',
    email: 'demo@ecozynth.example',
    phone: '9876543210',
  },
  {
    id: 'EZ103877',
    placedOn: '2026-11-04',
    status: 'Shipped',
    items: [
      { productSlug: 'tank-guard-1000', name: 'Tank Guard 1000 Tank Filter', division: 'aqua', quantity: 1, price: 6499 },
      { productSlug: 'tds-hardness-tester', name: 'TDS & Hardness Tester Kit', division: 'aqua', quantity: 1, price: 699 },
    ],
    subtotal: 7198,
    discount: 0,
    shipping: 0,
    total: 7198,
    paymentMethod: 'Card',
    address: homeAddress,
    timeline: [
      { step: 'Ordered', date: '2026-11-04' },
      { step: 'Packed', date: '2026-11-05' },
      { step: 'Shipped', date: '2026-11-06' },
      { step: 'Out for delivery', date: null },
      { step: 'Delivered', date: null },
    ],
    courier: 'Lorem Express',
    trackingNumber: 'LX0000103877',
    email: 'demo@ecozynth.example',
    phone: '9876543210',
  },
  {
    id: 'EZ102310',
    placedOn: '2026-10-18',
    status: 'Delivered',
    items: [{ productSlug: 'wash-guard-washing-machine-filter', name: 'WashGuard Washing Machine Filter', division: 'aqua', quantity: 1, price: 1799 }],
    subtotal: 1799,
    discount: 0,
    shipping: 0,
    total: 1799,
    paymentMethod: 'Cash on Delivery',
    address: homeAddress,
    timeline: [
      { step: 'Ordered', date: '2026-10-18' },
      { step: 'Packed', date: '2026-10-19' },
      { step: 'Shipped', date: '2026-10-19' },
      { step: 'Out for delivery', date: '2026-10-22' },
      { step: 'Delivered', date: '2026-10-22' },
    ],
    courier: 'Dolor Couriers',
    trackingNumber: 'DC0000102310',
    email: 'demo@ecozynth.example',
    phone: '9876543210',
  },
]

export const getMockOrder = (id: string): Order | undefined =>
  mockOrders.find((order) => order.id.toUpperCase() === id.trim().toUpperCase())

export const defaultAddress = homeAddress
