describe('Beach forecast functional tests', () => {
  it('should return a forecast with just a few times', async () => {
    const { body, status } = await global.testRequest.get('/forecast');
    expect(status).toBe(200);
    expect(body).toEqual([
      {
        time: '2021-02-11T00:00:00+00:00',
        forecast: [
          {
            lat: -33.792726,
            lng: 151.289824,
            name: 'Manly',
            position: 'E',
            rating: 2,
            swellDirection: 64.26,
            swellHeight: 0.15,
            swellPeriod: 3.89,
            time: '2021-02-11T00:00:00:+00:00',
            waveDirection: 231.38,
            waveHeight: 0.47,
            windDirection: 299.45,
          },
        ],
      },
      {
        time: '2021-02-11T00:00:00+00:00',
        forecast: [
          {
            lat: -33.792726,
            lng: 151.289824,
            name: 'Manly',
            position: 'E',
            rating: 2,
            swellDirection: 123.41,
            swellHeight: 0.21,
            swellPeriod: 3.67,
            time: '2021-02-11T00:00:00:+00:00',
            waveDirection: 232.12,
            waveHeight: 0.46,
            windDirection: 310.48,
          },
        ],
      },
    ]);
  });
});
