export interface WeatherResponse {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  hourly_units: HourlyUnits
  hourly: Hourly
  daily_units: DailyUnits
  daily: Daily
}

export interface HourlyUnits {
  time: string
  temperature_2m: string
  precipitation_probability: string
  rain: string
  weathercode: string
  windspeed_120m: string
  winddirection_120m: string
  temperature_120m: string
  uv_index: string
}

export interface Hourly {
  time: string[]
  temperature_2m: number[]
  precipitation_probability: number[]
  rain: number[]
  weathercode: number[]
  windspeed_120m: number[]
  winddirection_120m: number[]
  temperature_120m: number[]
  uv_index: number[]
}

export interface DailyUnits {
  time: string
  temperature_2m_max: string
  temperature_2m_min: string
  apparent_temperature_max: string
  apparent_temperature_min: string
  sunrise: string
  sunset: string
  precipitation_probability_max: string
}

export interface Daily {
  time: string[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  apparent_temperature_max: number[]
  apparent_temperature_min: number[]
  sunrise: string[]
  sunset: string[]
  precipitation_probability_max: number[]
}



export type Countries = Country[]

export interface Country {
  name: Name
  tld: string[]
  cca2: string
  ccn3: string
  cca3: string
  cioc: string
  independent: boolean
  status: string
  unMember: boolean
  currencies: Currencies
  idd: Idd
  capital: string[]
  altSpellings: string[]
  region: string
  subregion: string
  languages: Languages
  translations: Translations
  latlng: number[]
  landlocked: boolean
  borders: string[]
  area: number
  demonyms: Demonyms
  flag: string
  maps: Maps
  population: number
  gini: Gini
  fifa: string
  car: Car
  timezones: string[]
  continents: string[]
  flags: Flags
  coatOfArms: CoatOfArms
  startOfWeek: string
  capitalInfo: CapitalInfo
  postalCode: PostalCode
  timeZone: string[]
}

export interface Name {
  common: string
  official: string
  nativeName: NativeName
}

export interface NativeName {
  spa: Spa
}

export interface Spa {
  official: string
  common: string
}

export interface Currencies {
  EUR: Eur
}

export interface Eur {
  name: string
  symbol: string
}

export interface Idd {
  root: string
  suffixes: string[]
}

export interface Languages {
  spa: string
}

export interface Translations {
  ara: Ara
  bre: Bre
  ces: Ces
  cym: Cym
  deu: Deu
  est: Est
  fin: Fin
  fra: Fra
  hrv: Hrv
  hun: Hun
  ita: Ita
  jpn: Jpn
  kor: Kor
  nld: Nld
  per: Per
  pol: Pol
  por: Por
  rus: Rus
  slk: Slk
  spa: Spa2
  srp: Srp
  swe: Swe
  tur: Tur
  urd: Urd
  zho: Zho
}

export interface Ara {
  official: string
  common: string
}

export interface Bre {
  official: string
  common: string
}

export interface Ces {
  official: string
  common: string
}

export interface Cym {
  official: string
  common: string
}

export interface Deu {
  official: string
  common: string
}

export interface Est {
  official: string
  common: string
}

export interface Fin {
  official: string
  common: string
}

export interface Fra {
  official: string
  common: string
}

export interface Hrv {
  official: string
  common: string
}

export interface Hun {
  official: string
  common: string
}

export interface Ita {
  official: string
  common: string
}

export interface Jpn {
  official: string
  common: string
}

export interface Kor {
  official: string
  common: string
}

export interface Nld {
  official: string
  common: string
}

export interface Per {
  official: string
  common: string
}

export interface Pol {
  official: string
  common: string
}

export interface Por {
  official: string
  common: string
}

export interface Rus {
  official: string
  common: string
}

export interface Slk {
  official: string
  common: string
}

export interface Spa2 {
  official: string
  common: string
}

export interface Srp {
  official: string
  common: string
}

export interface Swe {
  official: string
  common: string
}

export interface Tur {
  official: string
  common: string
}

export interface Urd {
  official: string
  common: string
}

export interface Zho {
  official: string
  common: string
}

export interface Demonyms {
  eng: Eng
  fra: Fra2
}

export interface Eng {
  f: string
  m: string
}

export interface Fra2 {
  f: string
  m: string
}

export interface Maps {
  googleMaps: string
  openStreetMaps: string
}

export interface Gini {
  "2018": number
}

export interface Car {
  signs: string[]
  side: string
}

export interface Flags {
  png: string
  svg: string
  alt: string
}

export interface CoatOfArms {
  png: string
  svg: string
}

export interface CapitalInfo {
  latlng: number[]
}

export interface PostalCode {
  format: string
  regex: string
}
