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
    });
  }
  return result;
};

export const buildApiResponseToLocationModel = (response) => {
  console.log(response);
  let { _id, name, roles, createBy } = response.data;
  return {
    id: _id,
    name: name,
    roles: mapRoles(roles),
    createBy: createBy,
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
