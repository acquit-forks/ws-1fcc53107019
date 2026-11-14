export type Line = { amount: number };

// ISO 4217, Table A.1: minor units for current currency and funds codes.
// Codes whose minor unit is "N.A." (for example, XAU and XXX) are omitted.
const MINOR_UNIT_CODES = {
  0: 'BIF CLP DJF GNF ISK JPY KMF KRW PYG RWF UGX UYI VND VUV XAF XOF XPF',
  2: 'AED AFN ALL AMD ANG AOA ARS AUD AWG AZN BAM BBD BDT BGN BMD BND BOB BOV BRL BSD BTN BWP BYN BZD CAD CDF CHE CHF CHW CNY COP COU CRC CUP CVE CZK DKK DOP DZD EGP ERN ETB EUR FJD FKP GBP GEL GHS GIP GMD GTQ GYD HKD HNL HTG HUF IDR ILS INR IRR JMD KES KGS KHR KPW KYD KZT LAK LBP LKR LRD LSL MAD MDL MGA MKD MMK MNT MOP MRU MUR MVR MWK MXN MXV MYR MZN NAD NGN NIO NOK NPR NZD PAB PEN PGK PHP PKR PLN QAR RON RSD RUB SAR SBD SCR SDG SEK SGD SHP SLE SOS SRD SSP STN SVC SYP SZL THB TJS TMT TOP TRY TTD TWD TZS UAH USD USN UYU UZS VED VES WST XCD XCG YER ZAR ZMW ZWG ZWL',
  3: 'BHD IQD JOD KWD LYD OMR TND',
  4: 'CLF UYW',
} as const;

const ISO_4217_MINOR_UNITS = new Map<string, number>(
  Object.entries(MINOR_UNIT_CODES).flatMap(([minorUnits, currencies]) =>
    currencies.split(' ').map(currency => [currency, Number(minorUnits)] as const),
  ),
);

export function formatTotal(lines: Line[], currency: string): string {
  const minorUnits = ISO_4217_MINOR_UNITS.get(currency.toUpperCase());
  if (minorUnits === undefined) {
    throw new RangeError(`Currency has no supported ISO 4217 minor unit: ${currency}`);
  }

  const sum = lines.reduce((total, line) => total + line.amount, 0);
  return sum.toFixed(minorUnits);
}
