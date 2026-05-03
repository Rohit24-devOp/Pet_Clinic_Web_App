import { matchRoute } from './src/api/mockData.js';
import mockApi from './src/api/mockData.js';

const mockApiProxy = {
  get: async (url) => {
    const match = matchRoute('GET', url);
    if (match) return match.handler(null, match.id);
    throw new Error(`Mock: No handler for GET ${url}`);
  },
  delete: async (url) => {
    const match = matchRoute('DELETE', url);
    if (match) return match.handler(null, match.id);
    throw new Error(`Mock: No handler for DELETE ${url}`);
  },
};

async function test() {
  const initial = await mockApiProxy.get('/owners');
  console.log('Initial owners:', initial.data.length);
  
  await mockApiProxy.delete('/owners/1');
  console.log('Deleted owner 1');
  
  const after = await mockApiProxy.get('/owners');
  console.log('After delete owners:', after.data.length);
}

test();
