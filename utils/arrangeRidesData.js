function arrangeRidesData(ridesData) {
    return ridesData.map((ride) => {
      return [ride.park_id, ride.ride_name, ride.year_opened, ride.votes]
    });
  };

  module.exports = arrangeRidesData;