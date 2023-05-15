/* eslint-disable import/prefer-default-export */
export const layouts = {
  tabs: {
    type: 'tabs',
    defaultCollapsed: false,
  },
  accordion: {
    type: 'accordion',
    defaultCollapsed: false,
    radios: true,
    spacedAccordionItems: false,
  },
}

export const paymentMethodType = [
  {
    name: 'Pre-authorized debit payments',
    type: 'acss_debit',
    currency: ['usd'],
  },
  // {
  //   name: 'Pre-authorized debit payments',
  //   type: 'affirm',
  //   currency: ['cad'], // remove[usd,]
  // },
  {
    name: 'Afterpay / Clearpay',
    type: 'afterpay_clearpay',
    currency: ['usd'], // remove[eur, cad, 'gbp',  'aud', 'nzd']
  },
  {
    name: 'Alipay',
    type: 'alipay',
    currency: ['cny', 'usd'], // remove [eur, 'myr', 'jpy','nzd', 'hkd', 'cad', 'gbp',  'sgd',  'aud',]
  },
  // {
  //   name: 'BECS Direct Debit',
  //   type: 'au_becs_debit',
  //   currency: ['usd'],
  // },
  // {
  //   name: 'Bacs Direct Debit',
  //   type: 'bacs_debit',
  //   currency: ['usd'],
  // },
  {
    name: 'Bancontact',
    type: 'bancontact',
    currency: ['eur'],
  },
  // {
  //   name: 'BLIK',
  //   type: 'blik',
  //   currency: ['usd'],
  // },
  // {
  //   name: 'Boleto',
  //   type: 'boleto',
  //   currency: ['usd'],
  // },
  {
    name: 'Card payments',
    type: 'card',
    currency: ['usd', 'eur', 'cad', 'gbp', 'aud', 'nzd', 'cny', 'hkd', 'jpy', 'sgd', 'myr', 'dkk', 'chf', 'nok', 'sek', 'czk', 'czk', 'pln'],
  },
  // {
  //   name: 'Stripe Terminal',
  //   type: 'card_present',
  //   currency: ['usd'],
  // },
  {
    name: 'Cash App Pay',
    type: 'cashapp',
    currency: ['usd'],
  },
  // {
  //   name: 'Cash Balance',
  //   type: 'customer_balance',
  //   currency: ['usd'],
  // },
  {
    name: 'EPS',
    type: 'eps',
    currency: ['eur'],
  },
  // {
  //   name: 'FPX',
  //   type: 'fpx',
  //   currency: ['usd'],
  // },
  {
    name: 'giropay',
    type: 'giropay',
    currency: ['eur'],
  },
  // {
  //   name: 'grabpay',
  //   type: 'grabpay',
  //   currency: ['usd'],
  // },
  {
    name: 'iDEAL',
    type: 'ideal',
    currency: ['eur'],
  },
  // {
  //   name: 'Stripe Terminal (interac)',
  //   type: 'interac_present',
  //   currency: ['usd'],
  // },
  {
    name: 'Klarna',
    type: 'klarna',
    currency: ['usd'], // 'eur','chf','czk', 'pln', 'sek', 'nok', 'dkk', 'nzd', 'aud', 'gbp',  cad temporay removed
  },
  // {
  //   name: 'Konbini',
  //   type: 'konbini',
  //   currency: ['usd'],
  // },
  // {
  //   name: 'Link',
  //   type: 'link',
  //   currency: ['usd'],
  // },
  // {
  //   name: 'XOXO',
  //   type: 'oxxo',
  //   currency: ['usd'],
  // },
  {
    name: 'Przelewy24',
    type: 'p24',
    currency: ['eur', 'pln'],
  },
  // {
  //   name: 'Pix',
  //   type: 'pix',
  //   currency: ['usd'],
  // },
  // {
  //   name: 'Promptpay',
  //   type: 'promptpay',
  //   currency: ['usd'],
  // },
  {
    name: 'SEPA Direct Debit',
    type: 'sepa_debit',
    currency: ['eur'],
  },
  {
    name: 'Sofort',
    type: 'sofort',
    currency: ['eur'],
  },
  {
    name: 'ACH Direct Debit',
    type: 'us_bank_account',
    currency: ['usd'],
  },
  {
    name: 'WeChat Pay',
    type: 'wechat_pay',
    currency: ['cny', 'usd'], // remove [eur,'nok', 'sek', 'chf' 'dkk', cad, 'gbp', 'aud', 'hkd', 'jpy',  'sgd', ]
  },
]
// Stripe Supported locales
export const localeCodes = [
  {
    region: 'Stripe detects the locale of the browser',
    code: 'auto',
  },
  {
    region: 'Bulgarian(Bulgaria)',
    code: 'bg',
  },
  {
    region: 'Arabic',
    code: 'ar',
  },
  {
    region: 'Czech(Czech Republic)',
    code: 'cs',
  },
  {
    region: 'Danish(Denmark)',
    code: 'da',
  },
  {
    region: 'German(Germany)',
    code: 'de',
  },
  {
    region: 'Greek(Greece)',
    code: 'el',
  },
  {
    region: 'English',
    code: 'en',
  },
  {
    region: 'English(United Kingdom)',
    code: 'en-GB',
  },
  {
    region: 'Spanish(Spain)',
    code: 'es',
  },
  {
    region: 'Spanish(Latin America)',
    code: 'es-419',
  },
  {
    region: 'Estonian(Estonia)',
    code: 'et',
  },
  {
    region: 'Finnish(Finland)',
    code: 'fi',
  },
  {
    region: 'Filipino(Philipines)',
    code: 'fil',
  },
  {
    region: 'French(France)',
    code: 'fr',
  },
  {
    region: 'French(Canada)',
    code: 'fr-CA',
  },
  {
    region: 'Hebrew(Isreal)',
    code: 'he',
  },
  {
    region: 'Croatian(Croatia)',
    code: 'hr',
  },
  {
    region: 'Hungarian(Hungary)',
    code: 'hu',
  },
  {
    region: 'Indonesian(Indonesia)',
    code: 'id',
  },
  {
    region: 'Italian(Italy)',
    code: 'it',
  },
  {
    region: 'Japanese(Japan)',
    code: 'ja',
  },
  {
    region: 'Korean(Korea)',
    code: 'ko',
  },
  {
    region: 'Lithuanian(Lithuania)',
    code: 'lt',
  },
  {
    region: 'Latvian(Latvia)',
    code: 'lv',
  },
  {
    region: 'Malay(Malaysia)',
    code: 'ms',
  },
  {
    region: 'Maltese(Malta)',
    code: 'mt',
  },
  {
    region: 'Norwegian Bokmål',
    code: 'nb',
  },
  {
    region: 'Dutch(Netherlands)',
    code: 'nl',
  },
  {
    region: 'Polish(Poland)',
    code: 'pl',
  },
  {
    region: 'Portuguese(Brazil)',
    code: 'pt-BR',
  },
  {
    region: 'Portuguese(Brazil)',
    code: 'pt',
  },
  {
    region: 'Romanian(Romania)',
    code: 'ro',
  },
  {
    region: 'Russian(Russia)',
    code: 'ru',
  },
  {
    region: 'Slovak(Slovakia)',
    code: 'sk',
  },
  {
    region: 'Slovenian(Slovenia)',
    code: 'sl',
  },
  {
    region: 'Swedish(Sweden)',
    code: 'sv',
  },
  {
    region: 'Thai(Thailand)',
    code: 'th',
  },
  {
    region: 'Turkish(Turkey)',
    code: 'tr',
  },
  {
    region: 'Vietnamese(Vietnam)',
    code: 'vi',
  },
  {
    region: 'Chinese Simplified(China)',
    code: 'zh',
  },
  {
    region: 'Chinese Traditional(Hong Kong)',
    code: 'zh-HK',
  },
  {
    region: 'Chinese Traditional(Taiwan)',
    code: 'zh-TW',
  },
]

// stripe currencies
export const currencyCodes = [
  { currency: 'United States Dollar', code: 'usd', minAmount: 0.5 },
  { currency: 'United Arab Emirates Dirham', code: 'aed', minAmount: 2 },
  { currency: 'Australian Dollar', code: 'aud', minAmount: 0.5 },
  { currency: 'Bulgarian Lev', code: 'bgn', minAmount: 1 },
  { currency: 'Brazilian Real', code: 'brl', minAmount: 0.5 },
  { currency: 'Canadian Dollar', code: 'cad', minAmount: 0.5 },
  { currency: 'Swiss Franc', code: 'chf', minAmount: 0.5 },
  { currency: 'Czech Koruna', code: 'czk', minAmount: 15 },
  { currency: 'Danish Krone', code: 'dkk', minAmount: 2.5 },
  { currency: 'Euro', code: 'eur', minAmount: 0.5 },
  { currency: 'British Pound', code: 'gbp', minAmount: 0.3 },
  { currency: 'Hong Kong Dollar', code: 'hkd', minAmount: 4 },
  { currency: 'Croatian Kuna', code: 'hrk', minAmount: 0.5 },
  { currency: 'Hungarian Forint', code: 'huf', minAmount: 175 },
  { currency: 'Indonesian Rupiah', code: 'inr', minAmount: 0.5 },
  { currency: 'JAPAN (Yen)', code: 'jpy', minAmount: 50 },
  { currency: 'Mexican Peso', code: 'mxn', minAmount: 10 },
  { currency: 'Malaysian Ringgit', code: 'myr', minAmount: 2 },
  { currency: 'Norwegian Krone', code: 'nok', minAmount: 3 },
  { currency: 'New Zealand Dollar', code: 'nzd', minAmount: 0.5 },
  { currency: 'Poland (Zloty)', code: 'pln', minAmount: 2 },
  { currency: 'Romanian Leu', code: 'ron', minAmount: 2 },
  { currency: 'Swedish Krona', code: 'sek', minAmount: 3 },
  { currency: 'Singapore Dollar', code: 'sgd', minAmount: 0.5 },
  { currency: 'Thailand (Baht)', code: 'thb', minAmount: 10 },
]

// https://stripe.com/docs/currencies#minimum-and-maximum-charge-amounts
