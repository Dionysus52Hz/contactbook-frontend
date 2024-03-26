import createApiClient from './ApiService';

class ContactService {
   constructor(baseURL = '/api/contacts') {
      this.API = createApiClient(baseURL);
   }

   async getAll() {
      return (await this.API.get('/')).data;
   }

   async create(data) {
      return (await this.API.post('/', data)).data;
   }

   async deleteAll() {
      return (await this.API.delete('/')).data;
   }

   async get(id) {
      return (await this.API.get(`/${id}`)).data;
   }

   async update(id, data) {
      return await this.API.put(`/${id}`, data).data;
   }

   async delete(id) {
      return (await this.API.delete(`/${id}`)).data;
   }
}

export default new ContactService();
