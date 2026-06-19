export const PAYMENT_COUNTRIES = {
  GH: {
    name: "Ghana", currency: "GHS", symbol: "₵",
    methods: [
      { id: "mtn_momo",   label: "MTN Mobile Money", icon: "📱", type: "mobile_money", requiresPhone: true  },
      { id: "vodafone",   label: "Vodafone Cash",     icon: "📲", type: "mobile_money", requiresPhone: true  },
      { id: "airteltigo", label: "AirtelTigo Money",  icon: "📡", type: "mobile_money", requiresPhone: true  },
      { id: "card",       label: "Visa / Mastercard", icon: "💳", type: "card",         requiresPhone: false },
    ],
  },
  NG: {
    name: "Nigeria", currency: "NGN", symbol: "₦",
    methods: [
      { id: "opay",        label: "OPay",              icon: "🔵", type: "mobile_money", requiresPhone: true  },
      { id: "flutterwave", label: "Flutterwave",       icon: "🟠", type: "gateway",      requiresPhone: false },
      { id: "paystack",    label: "Paystack",          icon: "🟢", type: "gateway",      requiresPhone: false },
      { id: "bank",        label: "Bank Transfer",     icon: "🏦", type: "bank",         requiresPhone: false },
      { id: "card",        label: "Visa / Mastercard", icon: "💳", type: "card",         requiresPhone: false },
    ],
  },
};

export const DELIVERY_ZONES = {
  GH: [
    { id: "pickup",      label: "Pickup from market",  fee: 0  },
    { id: "accra_local", label: "Within Accra",        fee: 15 },
    { id: "accra_outer", label: "Greater Accra",       fee: 25 },
    { id: "kumasi",      label: "Kumasi",              fee: 40 },
    { id: "nationwide",  label: "Other regions",       fee: 60 },
  ],
  NG: [
    { id: "pickup",      label: "Pickup from market",  fee: 0    },
    { id: "lagos_local", label: "Within Lagos Island", fee: 1000 },
    { id: "lagos_outer", label: "Greater Lagos",       fee: 2000 },
    { id: "abuja",       label: "Abuja",               fee: 3500 },
    { id: "nationwide",  label: "Other states",        fee: 5000 },
  ],
};

export function generateRef() {
  return "YDA-" + Date.now().toString(36).toUpperCase() + "-" + Math.random().toString(36).slice(2,5).toUpperCase();
}
