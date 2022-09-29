export const buildRoomObjectModel = (response) => {
  let {
    _id,
    id,
    name,
    code,
    mode,
    ownerId,
    players,
    roundTime,
    location,
    numOfSpy,
  } = response?.data ?? response;

  return {
    id: id ?? _id,
    model: {
      name: name ? name : null,
      code: code ? code : null,
      mode: mode ? mode : 0,
      ownerId: ownerId ? ownerId : null,
      players: players ? mapPlayersList(players) : null,
      roundTime: roundTime ? roundTime : null,
      location: location ? mapLocation(location) : null,
      numOfSpy: numOfSpy ?? null,
    },
  };
};

const mapPlayersList = (players) => {
  let result = [];
  for (const i of players) {
    result.push({
      id: i.id ? i.id : i._id,
      name: i.name,
    });
  }
  return result;
};

const mapLocation = (locations) => {
  let result = [];
  for (const location of locations) {
    result.push({
      id: location.id,
      name: location.name,
      state: location.state,
    });
  }
  return result;
};
