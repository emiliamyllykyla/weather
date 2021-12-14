export type Coordinates = { lon: number; lat: number };

export type City = {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  boundingbox: [number, number, number, number];
  lat: number;
  lon: number;
  display_name: string;
  class: string;
  type: string;
  importance: number;
  address: {
    village?: string;
    town?: string;
    city?: string;
    municipality?: string;
    county?: string;
    province?: string;
    state?: string;
    region: string;
    country: string;
    country_code: string;
    [key: string]: any;
  };
};
