function prepareRidesData(ridesData, dataFromParksTable) {
    if (!ridesData || !dataFromParksTable) return [];

    const copyRidesData = [...ridesData];
    return copyRidesData.map((ride) => {
      const copyRide = {...ride}
      const parkName = dataFromParksTable.find((park) => {
        return copyRide.park_name === park.park_name
      });
      copyRide.park_id = parkName.park_id;
      delete copyRide.park_name;
      return copyRide;
    });
  };

  module.exports = prepareRidesData;