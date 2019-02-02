import * as models from "../models";

function associate(
  entity: any,
  type: string,
  propertyName: string,
  id: any,
  idProperty?: string,
) {
  return new Promise((resolve, reject) => {
    let whereClause;

    if (idProperty === undefined) {
      whereClause = { id };
    } else {
      whereClause = {};
      whereClause[idProperty] = id;
    }

    if (!entity[`set${propertyName}`]) {
      reject(`There are no function set${propertyName}`);
    } else {
      models[type]
        .find({
          where: whereClause,
        })
        .then(
          item => {
            entity[`set${propertyName}`](item).then(
              () => {
                resolve(entity);
              },
              err => {
                console.error(err);
                reject(err);
              },
            );
          },
          err => {
            console.error(err);
            reject(err);
          },
        );
    }
  });
}

export default associate;
