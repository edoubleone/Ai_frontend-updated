export interface IPaystackPaymentHistory {
  id: number
  status: string
  verified: boolean
  billing_cycle: string
  created_at: string
  expires_at: any
  currency: string
  reference: string
  amount: number
  customer_email: string
  plan_name: string
  duration_days: number
  paid_at: any
  is_expired: boolean
}

export interface IStripeHistory {
  customer_email: string
  amount: number
  currency: string
  created_at: string
  billing_cycle: string
  is_expired: boolean
  status: string
  id: string
  verified: boolean
  plan_name: string
  expires_at: string
}
