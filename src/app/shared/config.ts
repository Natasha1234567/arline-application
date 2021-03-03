/* eslint-disable linebreak-style */
export const BASE_URL = {
  url: 'http://localhost:3000/',
};

export const JSON_SERVER_URLS = {
  users: 'users',
  flights: 'flights',
  passengers: 'passengers',
  shoppingItems: 'shoppingItems',
  services: 'ancillaryServices',
  loggedUser: 'loggedUserData',
};

export const Constants = {
  airlineDataSource: ['id', 'name', 'ancillaryServices', 'seatNumber',
    'passport', 'address', 'dob', 'specialMeals', 'shoppingItems', 'operation'],
  // eslint-disable-next-line max-len
  flightDataSource: ['id', 'name', 'ancillaryServices',
    'mealType', 'items', 'operation'],
  checkInDataSource: ['id', 'name', 'seatNumber', 'ancillaryServices',
    'checkedIn', 'wheelChair', 'infants', 'operation'],
  airlineStep: -1,
  bookedSeatMap: [{seatNo: 1, color: 'grey', disable: false},
    {seatNo: 2, color: 'grey', disable: false},
    {seatNo: 3, color: 'grey', disable: false},
    {seatNo: 4, color: 'grey', disable: false},
    {seatNo: 5, color: 'grey', disable: false},
    {seatNo: 6, color: 'grey', disable: false},
    {seatNo: 7, color: 'grey', disable: false},
    {seatNo: 8, color: 'grey', disable: false},
    {seatNo: 9, color: 'grey', disable: false},
    {seatNo: 10, color: 'grey', disable: false},
    {seatNo: 11, color: 'grey', disable: false},
    {seatNo: 12, color: 'grey', disable: false},
    {seatNo: 13, color: 'grey', disable: false},
    {seatNo: 14, color: 'grey', disable: false},
    {seatNo: 15, color: 'grey', disable: false},
    {seatNo: 16, color: 'grey', disable: false},
    {seatNo: 17, color: 'grey', disable: false},
    {seatNo: 18, color: 'grey', disable: false},
    {seatNo: 19, color: 'grey', disable: false},
    {seatNo: 20, color: 'grey', disable: false}],
  monthts: {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12',
  },
};
