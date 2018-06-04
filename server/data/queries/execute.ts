import { db } from '../models';

export default function execute<T>(query: string, parameters, queryModifier?: (query: string) => string, resultModifier?) {
  if (queryModifier) {
    query = queryModifier(query);
  }

  return new Promise<T>((resolve, reject) => {
    db.query(query, {
      replacements: parameters,
      type: db.QueryTypes.SELECT
    }).then((data) => {
      // console.log('result data: ', data);
      if (resultModifier) {
        data = resultModifier(data);
      }
      resolve(data);
    }, (err) => {
      console.error(err);
      reject(err);
    });
  });
}