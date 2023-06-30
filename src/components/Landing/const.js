export const plans = [
  {
    header: 'Demo',
    subHeader: 'To get a taste',
    features: [
      {
        text: 'Access to prior predictions',
        isActive: true,
      },
      {
        text: '3 random bets per week',
        isActive: true,
      },
      {
        text: '24/7 customer support',
        isActive: false,
      },
      {
        text: 'Telegram feed',
        isActive: false,
      },
    ],
    price: 'Free',
    period: '',
    ctaText: 'Subscribe',
    isPopular: false,
  },
  {
    header: 'Standard',
    subHeader: 'For everyday betters',
    features: [
      {
        text: '<b>Nerif</b> basic kit',
        isActive: true,
      },
      {
        text: 'Telegram feed',
        isActive: true,
      },
      {
        text: '24/7 customer support',
        isActive: true,
      },
    ],
    price: '$25 /',
    period: 'month',
    ctaText: 'Subscribe',
    isPopular: true,
  },
  {
    header: 'Premium',
    subHeader: 'For serious folks',
    features: [
      {
        text: '<b>Nerif</b> standard kit',
        isActive: true,
      },
      {
        text: 'VIP predictions',
        isActive: true,
      },
      {
        text: 'Personal dashboards',
        isActive: true,
      },
      {
        text: 'Money back guarantee',
        isActive: true,
      },
    ],
    price: '$140 /',
    period: 'month',
    ctaText: 'Subscribe',
    isPopular: false,
  },
]