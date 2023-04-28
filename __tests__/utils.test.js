/* make sure you write your tests for your utils functions in here :eyes: */
const { prepareRidesData } = require('../utils/index');

describe('prepareRidesData tests', () => {
    test('returns an array', () => {           
        expect(prepareRidesData()).toEqual([]);
    })
    test('doesn\'t mutate the original data', () => {   
        const ridesData = [
            {
                ride_name: 'Colossus',
                year_opened: 2002,
                park_name: 'Thorpe Park',
                votes: 5,
              },
              {
                ride_name: 'Stealth',
                year_opened: 2006,
                park_name: 'Thorpe Park',
                votes: 4,
              }
        ]       
        const copyRidesData = [...ridesData]
        const copyFirstRide = {...ridesData[0]}
        const parksData = [
            { park_name: 'Thorpe Park', year_opened: 1979, annual_attendance: 1700000 },
            { park_name: 'Alton Towers', year_opened: 1980, annual_attendance: 2520000 }
        ]       
        const copyParksData = [...parksData];

        prepareRidesData(ridesData, parksData)

        expect(ridesData).toEqual(copyRidesData);
        expect(parksData).toEqual(copyParksData);
        expect(ridesData[0]).toEqual(copyFirstRide);
    })
    test('changes the park_name property to park_id, with the appropriate id for one ride/park', () => { 
        const ridesData = [
            {
                ride_name: 'Colossus',
                year_opened: 2002,
                park_name: 'Thorpe Park',
                votes: 5,
              }
        ];
        const parksData = [
            { park_id: 1, park_name: 'Thorpe Park', year_opened: 1979, annual_attendance: 1700000 }
        ]    

        expect(prepareRidesData(ridesData, parksData)[0]).toEqual({
                ride_name: 'Colossus',
                year_opened: 2002,
                park_id: 1,
                votes: 5,
              });
    })
    test('changes the park_name property to park_id, with the appropriate id for multiple rides/parks', () => { 
        const ridesData = [
            {
                ride_name: 'Colossus',
                year_opened: 2002,
                park_name: 'Thorpe Park',
                votes: 5,
              },
              {
                ride_name: 'Stealth',
                year_opened: 2006,
                park_name: 'Thorpe Park',
                votes: 4,
              },
              {
                ride_name: 'Nemesis',
                year_opened: 1994,
                park_name: 'Alton Towers',
                votes: 5,
              },
              {
                ride_name: 'The Smiler',
                year_opened: 2013,
                park_name: 'Alton Towers',
                votes: 1,
              }
        ];
        const parksData = [
            { park_id: 1, park_name: 'Thorpe Park', year_opened: 1979, annual_attendance: 1700000 },
            { park_id: 2, park_name: 'Alton Towers', year_opened: 1980, annual_attendance: 2520000 }
        ]   

        expect(prepareRidesData(ridesData, parksData)).toEqual(
            [
                { ride_name: 'Colossus', year_opened: 2002, votes: 5, park_id: 1 },
                { ride_name: 'Stealth', year_opened: 2006, votes: 4, park_id: 1 },
                { ride_name: 'Nemesis', year_opened: 1994, votes: 5, park_id: 2 },
                { ride_name: 'The Smiler', year_opened: 2013, votes: 1, park_id: 2 }
              ])
        })
});


