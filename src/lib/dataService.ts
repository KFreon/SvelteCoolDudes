// polyfill


export interface CoolDude {
  id: number;
  name: string;
  isCool: boolean;
}


const map = new Map<number, CoolDude>();

export const addADude = (dude: CoolDude) => {
  map.set(dude.id, dude);
}

export const removeADude = (id: number) => {
  map.delete(id);
}

export const getAllDudes = async (): Promise<CoolDude[]> => {
  const results: CoolDude[] = [];
  map.forEach(element => {
    results.push(element);
  });
  return results;
  // ------ So many issues with sqlite, so just...no
  // const promise = new Promise<CoolDude[]>((resolve, reject) => {
  //   const db = new Database("database.db");
  //   let results: CoolDude[] = [];
  //   db.all<CoolDude>("SELECT * FROM CoolDudes", (err, rows) => {
  //     console.log(rows)
  //     results = [...results, ...rows];
  //     resolve(results);
  //   });
  // });
  // return await promise;
}

export const setupDB = async () => {
  return;

  // ------ So many issues with sqlite, so just...no
  // if (fs.existsSync('database.db')){
  //   return;
  // }

  // return await new Promise<void>((resolve, reject) => {
  //   const db = new Database("database.db");
  //   db.exec("CREATE TABLE CoolDudes (Id INTEGER PRIMARY KEY AUTOINCREMENT, Name VARCHAR(50), IsCool BIT)", (err) => resolve());
  // });
}