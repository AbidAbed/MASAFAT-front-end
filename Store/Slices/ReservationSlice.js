import {createSlice} from '@reduxjs/toolkit';
const ReservationSlice = createSlice({
  name: 'Reservation',
  initialState: [
    {
      userId: '111',
      garageId: '222',
      startTime: '111TT@@@@222',
      endTime: 'end',
      slotNumber: 6,
      fee: 5,
    },
    {
      userId: '111',
      garageId: '222',
      startTime: '111TT@@@@222',
      endTime: 'end',
      slotNumber: 6,
      fee: 5,
    },
    {
      userId: '111',
      garageId: '222',
      startTime: '111TT@@@@222',
      endTime: 'end',
      slotNumber: 6,
      fee: 5,
    },
    {
      userId: '111',
      garageId: '222',
      startTime: '111TT@@@@222',
      endTime: 'end',
      slotNumber: 6,
      fee: 5,
    },
  ],
  reducers: {
    fetchHistory(state, action) {
      return [...action.payload];
    },
    addHistory(state, action) {
      const mergedReservation = state.filter(reservation => {
        return action.payload.find(
          newReservation => newReservation.garageId !== reservation.garageId,
        );
      });
      return [...state, ...mergedReservation];
    },
  },
});

export {ReservationSlice};
export const {fetchHistory, addHistory} = ReservationSlice.actions;
