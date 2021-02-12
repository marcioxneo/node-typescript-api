import { ForecastPoint, StormGlass } from '@src/clients/stormGlass';
import axios from 'axios';

export enum BeachPosition {
  S = 'S',
  E = 'E',
  W = 'W',
  N = 'N'
}

export interface Beach {
  name: string;
  position: BeachPosition;
  lat: number;
  lng: number;
  user: string;
}

export interface BeachForecast extends Omit<Beach, 'user'>, ForecastPoint {}

const mockedAxios = axios as jest.Mocked<typeof axios>;

export class Forecast {
  
  constructor(protected stormGlass = new StormGlass(mockedAxios)) {}

  public async processForecastForBeaches(
    beaches: Beach[]
    ): Promise<BeachForecast[]> {
    const pointsWithCorrenctSouces: BeachForecast[] = [];
    for(const beach of beaches) {
      const points = await this.stormGlass.fetchPoints(beach.lat, beach.lng);
      const enrichedBeachData = points.map((e) => ({
        ...{
          lat: beach.lat,
          lng: beach.lng,
          name: beach.name,
          position: beach.position,
          rating: 1,
        },
        ...e,
      }));
      pointsWithCorrenctSouces.push(...enrichedBeachData);
    }
  }
}