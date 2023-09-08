import { setupDB, getAllDudes, type CoolDude, addADude, removeADude } from "$lib/dataService";

export interface DataPayload {
  dudes: CoolDude[];
}

export async function load(): Promise<DataPayload> {
  await setupDB();
  const dudes = await getAllDudes();
  return {
    dudes: dudes
  };
}

export const actions = {
  addnew: async ({ cookies, request}) => {
    const data = await request.formData();
    const name = data.get('name')!.toString();
    const isCool = (data.get('isCool') ?? false).toString();
    const dude: CoolDude = {name: name, id: Math.random(), isCool: isCool === 'on'}
    addADude(dude);
  },
  remove: async({cookies, request}) => {
    const data = await request.formData();
    const id = data.get('id')!.toString();
    removeADude(+id)
  }
}