import { ForecastPoint, StormGlass } from '@src/clients/stormGlass';
import axios from 'axios';

export enum BeachPosition {
  S = 'S',
  E = 'E',
  W = 'W',
  N = 'N',
}

export interface Beach {
  name: string;
  position: BeachPosition;
  lat: number;
  lng: number;
  user: string;
}

export interface TimeForecast {
  time: string;
  forecast: BeachForecast[];
}

export interface BeachForecast extends Omit<Beach, 'user'>, ForecastPoint {}

const mockedAxios = axios as jest.Mocked<typeof axios>;

export class Forecast {
  constructor(protected stormGlass = new StormGlass(mockedAxios)) {}

  public async processForecastForBeaches(
    beaches: Beach[]
  ): Promise<TimeForecast[]> {
    const pointsWithCorrenctSouces: BeachForecast[] = [];
    for (const beach of beaches) {
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
    return this.mapForecastByTime(pointsWithCorrenctSouces);
  }

  private mapForecastByTime(forecast: BeachForecast[]): TimeForecast[] {
    const forecastByTime: TimeForecast[] = [];
    for(const point of forecast) {
      const timePoint = forecastByTime.find((f) => f.time === point.time);
      if(timePoint) {
        timePoint.forecast.push(point);
      } else {
        forecastByTime.push({
          time: point.time,
          forecast: [point],
        })
      }
    }
    return forecastByTime;
  }
}
