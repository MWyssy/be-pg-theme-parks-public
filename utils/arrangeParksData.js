function arrangeParksData(parksData) {
    return parksData.map((park) => {
      return [park.park_name, park.year_opened, park.annual_attendance]
    });
  };

  module.exports = arrangeParksData;