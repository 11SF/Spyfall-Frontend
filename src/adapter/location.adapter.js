import { ClientError } from "../utility/error";

export const buildApiResponseToLocationModelArray = (response) => {
  console.log(response);

  let locationList = response.data;
  let result = [];
  for (const index in locationList) {
    result.push({
      id: locationList[index]._id,
      name: locationList[index].name,
      roles: mapRoles(locationList[index].roles),
      createBy: locationList[index].createBy,
      createByPlayerId: locationList[index].createByPlayerId
        ? locationList[index].createByPlayerId
        : "",
      createDate: locationList[index].createDate,
      updateDate: locationList[index].updateDate,
    });
  }
  return result;
};

export const buildApiResponseToLocationModel = (response) => {
  // console.log(response);
  try {
    let { _id, name, roles, createBy, createByPlayerId, createDate, updateDate } = response.data[0];
  return {
    id: _id,
    name: name,
    roles: mapRoles(roles),
    createBy: createBy,
    createByPlayerId: createByPlayerId ? createByPlayerId : "",
    createDate: createDate,
    updateDate: updateDate,
  };
  } catch(err) {
    return new ClientError(5010, err)
  }
};


export const buildLocationApiSingleToModel = (response) => {
  // console.log(response);
  let { _id, name, roles, createBy, createByPlayerId } = response.data;
  return {
    id: _id,
    name: name,
    roles: mapRoles(roles),
    createBy: createBy,
    createByPlayerId: createByPlayerId ? createByPlayerId : "",
  };
};

const mapRoles = (roles) => {
  let rolesResult = [];
  for (const index in roles) {
    rolesResult.push({
      id: roles[index]._id,
      name: roles[index].name,
      description: roles[index].description,
    });
  }
  return rolesResult;
};
