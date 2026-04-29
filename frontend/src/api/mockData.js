// Mock data for standalone deployment (no backend needed)

const mockOwners = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890', address: '123 Pet Lane, New York', gender: 'Male' },
  { id: 2, name: 'Emily Carter', email: 'emily.carter@email.com', phone: '555-234-5678', address: '45 Maple Drive, Brooklyn', gender: 'Female' },
  { id: 3, name: 'Michael Chen', email: 'michael.chen@email.com', phone: '555-345-6789', address: '789 Oak Street, Manhattan', gender: 'Male' },
  { id: 4, name: 'Sarah Williams', email: 'sarah.w@email.com', phone: '555-456-7890', address: '321 Elm Avenue, Queens', gender: 'Female' },
];

const now = new Date();
const yesterday = new Date(now); yesterday.setDate(now.getDate() - 1);
const twoDaysAgo = new Date(now); twoDaysAgo.setDate(now.getDate() - 2);
const tomorrow = new Date(now); tomorrow.setDate(now.getDate() + 1);
const nextWeek = new Date(now); nextWeek.setDate(now.getDate() + 7);
const lastMonth = new Date(now); lastMonth.setMonth(now.getMonth() - 1);
const twoMonthsAgo = new Date(now); twoMonthsAgo.setMonth(now.getMonth() - 2);
const sixMonthsLater = new Date(now); sixMonthsLater.setMonth(now.getMonth() + 6);
const oneYearLater = new Date(now); oneYearLater.setFullYear(now.getFullYear() + 1);

const mockPets = [
  {
    id: 1, name: 'Buddy', age: 3, breed: 'Golden Retriever', species: 'DOG',
    owner: mockOwners[0], feedingSchedule: '3 times daily - Morning, Noon, Evening',
    lastFedAt: yesterday.toISOString(),
    walkSchedule: 'Morning and Evening', trainingNotes: 'Knows sit, stay, and shake.'
  },
  {
    id: 2, name: 'Whiskers', age: 2, breed: 'Siamese', species: 'CAT',
    owner: mockOwners[0], feedingSchedule: 'Twice daily with wet food',
    lastFedAt: now.toISOString(),
    isIndoor: true, groomingSchedule: 'Weekly brushing'
  },
  {
    id: 3, name: 'Tweety', age: 1, breed: 'Canary', species: 'BIRD',
    owner: mockOwners[0], feedingSchedule: 'Seeds and fresh water daily',
    lastFedAt: twoDaysAgo.toISOString(),
    cageSize: 'Medium (60x60x100cm)', dailyFlyingMinutes: 30
  },
  {
    id: 4, name: 'Luna', age: 4, breed: 'German Shepherd', species: 'DOG',
    owner: mockOwners[1], feedingSchedule: 'High-protein diet, twice daily',
    lastFedAt: yesterday.toISOString(),
    walkSchedule: '3 walks daily - 45 mins each', trainingNotes: 'Advanced obedience trained. Guard dog certified.'
  },
  {
    id: 5, name: 'Milo', age: 1, breed: 'Persian', species: 'CAT',
    owner: mockOwners[1], feedingSchedule: 'Premium kibble, 3 times daily',
    lastFedAt: now.toISOString(),
    isIndoor: true, groomingSchedule: 'Daily brushing required'
  },
  {
    id: 6, name: 'Coco', age: 2, breed: 'Cockatiel', species: 'BIRD',
    owner: mockOwners[2], feedingSchedule: 'Pellets, seeds and fresh fruits',
    lastFedAt: twoDaysAgo.toISOString(),
    cageSize: 'Large (80x60x120cm)', dailyFlyingMinutes: 60
  },
  {
    id: 7, name: 'Rocky', age: 5, breed: 'Bulldog', species: 'DOG',
    owner: mockOwners[2], feedingSchedule: 'Special diet for joint health',
    lastFedAt: yesterday.toISOString(),
    walkSchedule: '2 short walks daily', trainingNotes: 'Gentle temperament. Loves kids.'
  },
  {
    id: 8, name: 'Shadow', age: 3, breed: 'Maine Coon', species: 'CAT',
    owner: mockOwners[3], feedingSchedule: 'Mixed wet and dry food twice daily',
    lastFedAt: yesterday.toISOString(),
    isIndoor: false, groomingSchedule: 'Bi-weekly grooming session'
  },
];

const mockHealthRecords = {
  1: [
    { id: 1, petId: 1, type: 'VACCINATION', date: lastMonth.toISOString().split('T')[0], notes: 'Rabies vaccination administered. No adverse reactions.', nextDueDate: oneYearLater.toISOString().split('T')[0] },
    { id: 2, petId: 1, type: 'VET_VISIT', date: twoMonthsAgo.toISOString().split('T')[0], notes: 'Annual checkup. All vitals normal. Weight: 32kg.', nextDueDate: sixMonthsLater.toISOString().split('T')[0] },
  ],
  2: [
    { id: 3, petId: 2, type: 'VACCINATION', date: twoMonthsAgo.toISOString().split('T')[0], notes: 'FVRCP booster shot. Cat was calm during procedure.', nextDueDate: oneYearLater.toISOString().split('T')[0] },
  ],
  3: [
    { id: 4, petId: 3, type: 'VET_VISIT', date: lastMonth.toISOString().split('T')[0], notes: 'Wing feather inspection. Healthy plumage. Good respiratory sounds.', nextDueDate: sixMonthsLater.toISOString().split('T')[0] },
  ],
  4: [
    { id: 5, petId: 4, type: 'VACCINATION', date: lastMonth.toISOString().split('T')[0], notes: 'Distemper and Parvovirus combo vaccine. Booster required in 3 weeks.', nextDueDate: sixMonthsLater.toISOString().split('T')[0] },
    { id: 6, petId: 4, type: 'VET_VISIT', date: twoMonthsAgo.toISOString().split('T')[0], notes: 'Hip X-ray performed. No signs of dysplasia. Joint supplements recommended.', nextDueDate: null },
  ],
  7: [
    { id: 7, petId: 7, type: 'VET_VISIT', date: lastMonth.toISOString().split('T')[0], notes: 'Skin fold dermatitis check. Prescribed medicated wipes. Follow up in 2 weeks.', nextDueDate: sixMonthsLater.toISOString().split('T')[0] },
  ],
};

const tomorrowAt10 = new Date(tomorrow); tomorrowAt10.setHours(10, 0, 0);
const tomorrowAt14 = new Date(tomorrow); tomorrowAt14.setHours(14, 30, 0);
const nextWeekAt9 = new Date(nextWeek); nextWeekAt9.setHours(9, 0, 0);
const nextWeekAt11 = new Date(nextWeek); nextWeekAt11.setHours(11, 0, 0);
const lastMonthAt10 = new Date(lastMonth); lastMonthAt10.setHours(10, 0, 0);
const twoMonthsAgoAt15 = new Date(twoMonthsAgo); twoMonthsAgoAt15.setHours(15, 0, 0);

const mockAppointments = [
  { id: 1, petId: 1, dateTime: tomorrowAt10.toISOString(), vetName: 'Smith', reason: 'Annual Vaccination', status: 'SCHEDULED' },
  { id: 2, petId: 4, dateTime: tomorrowAt14.toISOString(), vetName: 'Johnson', reason: 'Hip Follow-up Checkup', status: 'SCHEDULED' },
  { id: 3, petId: 2, dateTime: nextWeekAt9.toISOString(), vetName: 'Patel', reason: 'Dental Cleaning', status: 'SCHEDULED' },
  { id: 4, petId: 7, dateTime: nextWeekAt11.toISOString(), vetName: 'Smith', reason: 'Skin Dermatitis Follow-up', status: 'SCHEDULED' },
  { id: 5, petId: 3, dateTime: lastMonthAt10.toISOString(), vetName: 'Garcia', reason: 'Wing Feather Inspection', status: 'COMPLETED' },
  { id: 6, petId: 5, dateTime: twoMonthsAgoAt15.toISOString(), vetName: 'Johnson', reason: 'Routine Health Screening', status: 'COMPLETED' },
];

// Helper to compute health status
function getHealthStatus(pet) {
  const records = mockHealthRecords[pet.id] || [];
  if (records.length === 0) return 'NEEDS_CHECKUP';
  const hasRecent = records.some(r => {
    const diff = (new Date() - new Date(r.date)) / (1000 * 60 * 60 * 24);
    return diff < 60;
  });
  return hasRecent ? 'HEALTHY' : 'NEEDS_CHECKUP';
}

// Build pets-with-status array (matches backend /api/pets response)
function getPetsWithStatus() {
  return mockPets.map(pet => ({
    pet: { ...pet },
    healthStatus: getHealthStatus(pet),
    careInstructions: getCareInstructions(pet),
    feedingSchedule: pet.feedingSchedule
  }));
}

function getCareInstructions(pet) {
  switch (pet.species) {
    case 'DOG': return `${pet.name} needs regular exercise with ${pet.walkSchedule || 'daily walks'}. Maintain a consistent feeding schedule and ensure fresh water is always available. Regular grooming and socialization are important.`;
    case 'CAT': return `${pet.name} is an ${pet.isIndoor ? 'indoor' : 'outdoor'} cat. Provide enrichment activities, scratching posts, and ${pet.groomingSchedule || 'regular grooming'}. Monitor water intake and litter box habits.`;
    case 'BIRD': return `${pet.name} needs a clean ${pet.cageSize || 'appropriately sized'} cage with ${pet.dailyFlyingMinutes || 30} minutes of supervised free flight daily. Provide varied diet and social interaction.`;
    default: return 'Follow standard pet care guidelines.';
  }
}

// State management for mutations
let ownerIdCounter = mockOwners.length + 1;
let petIdCounter = mockPets.length + 1;
let appointmentIdCounter = mockAppointments.length + 1;
let healthRecordIdCounter = 10;

// Deep clone to allow mutations
let owners = JSON.parse(JSON.stringify(mockOwners));
let pets = JSON.parse(JSON.stringify(mockPets));
let appointments = JSON.parse(JSON.stringify(mockAppointments));
let healthRecords = JSON.parse(JSON.stringify(mockHealthRecords));

// Simulate delay
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API handlers
const mockApi = {
  // GET /owners
  'GET /owners': async () => {
    await delay();
    return { data: [...owners] };
  },

  // POST /owners
  'POST /owners': async (data) => {
    await delay();
    const newOwner = { id: ownerIdCounter++, ...data };
    owners.push(newOwner);
    return { data: newOwner };
  },

  // PUT /owners/:id
  'PUT /owners/:id': async (data, id) => {
    await delay();
    const idx = owners.findIndex(o => o.id === parseInt(id));
    if (idx === -1) throw new Error('Owner not found');
    owners[idx] = { ...owners[idx], ...data };
    return { data: owners[idx] };
  },

  // DELETE /owners/:id
  'DELETE /owners/:id': async (_, id) => {
    await delay();
    owners = owners.filter(o => String(o.id) !== String(id));
    return { data: { message: 'Deleted' } };
  },

  // GET /pets
  'GET /pets': async () => {
    await delay();
    return {
      data: pets.map(pet => ({
        pet: { ...pet },
        healthStatus: getHealthStatusLive(pet),
        careInstructions: getCareInstructions(pet),
        feedingSchedule: pet.feedingSchedule
      }))
    };
  },

  // GET /pets/:id
  'GET /pets/:id': async (_, id) => {
    await delay();
    const pet = pets.find(p => p.id === parseInt(id));
    if (!pet) throw new Error('Pet not found');
    return {
      data: {
        pet: { ...pet },
        healthStatus: getHealthStatusLive(pet),
        careInstructions: getCareInstructions(pet),
        feedingSchedule: pet.feedingSchedule
      }
    };
  },

  // POST /pets
  'POST /pets': async (data) => {
    await delay();
    const owner = owners.find(o => o.id === parseInt(data.ownerId));
    const newPet = {
      id: petIdCounter++,
      name: data.name,
      age: parseInt(data.age),
      breed: data.breed,
      species: data.species,
      owner: owner || null,
      feedingSchedule: 'Standard schedule',
      lastFedAt: null,
      ...(data.species === 'DOG' ? { walkSchedule: data.walkSchedule, trainingNotes: data.trainingNotes } : {}),
      ...(data.species === 'CAT' ? { isIndoor: data.isIndoor, groomingSchedule: data.groomingSchedule } : {}),
      ...(data.species === 'BIRD' ? { cageSize: data.cageSize, dailyFlyingMinutes: parseInt(data.dailyFlyingMinutes) || 0 } : {}),
    };
    pets.push(newPet);
    return { data: newPet };
  },

  // DELETE /pets/:id
  'DELETE /pets/:id': async (_, id) => {
    await delay();
    pets = pets.filter(p => String(p.id) !== String(id));
    return { data: { message: 'Deleted' } };
  },

  // POST /pets/:id/feed
  'POST /pets/:id/feed': async (_, id) => {
    await delay();
    const pet = pets.find(p => p.id === parseInt(id));
    if (!pet) throw new Error('Pet not found');
    const today = new Date().toDateString();
    if (pet.lastFedAt && new Date(pet.lastFedAt).toDateString() === today) {
      throw new Error(`${pet.name} has already been fed today!`);
    }
    pet.lastFedAt = new Date().toISOString();
    return { data: pet };
  },

  // GET /pets/feeding-reminders
  'GET /pets/feeding-reminders': async () => {
    await delay();
    const today = new Date().toDateString();
    const unfed = pets.filter(p => !p.lastFedAt || new Date(p.lastFedAt).toDateString() !== today);
    return { data: unfed };
  },

  // PUT /pets/:id/feeding-schedule
  'PUT /pets/:id/feeding-schedule': async (data, id) => {
    await delay();
    const pet = pets.find(p => p.id === parseInt(id));
    if (!pet) throw new Error('Pet not found');
    pet.feedingSchedule = data.schedule;
    return { data: pet };
  },

  // GET /pets/:id/health-records
  'GET /pets/:id/health-records': async (_, id) => {
    await delay();
    return { data: healthRecords[id] || [] };
  },

  // GET /appointments
  'GET /appointments': async () => {
    await delay();
    return { data: [...appointments] };
  },

  // POST /appointments
  'POST /appointments': async (data) => {
    await delay();
    const newAppt = {
      id: appointmentIdCounter++,
      petId: parseInt(data.petId),
      dateTime: data.dateTime,
      vetName: data.vetName,
      reason: data.reason,
      status: 'SCHEDULED'
    };
    appointments.push(newAppt);
    return { data: newAppt };
  },

  // POST /health-records
  'POST /health-records': async (data) => {
    await delay();
    const newRecord = {
      id: healthRecordIdCounter++,
      petId: parseInt(data.petId),
      type: data.type,
      date: data.date,
      notes: data.notes,
      nextDueDate: data.nextDueDate || null
    };
    if (!healthRecords[data.petId]) healthRecords[data.petId] = [];
    healthRecords[data.petId].push(newRecord);
    return { data: newRecord };
  },
};

function getHealthStatusLive(pet) {
  const records = healthRecords[pet.id] || [];
  if (records.length === 0) return 'NEEDS_CHECKUP';
  const hasRecent = records.some(r => {
    const diff = (new Date() - new Date(r.date)) / (1000 * 60 * 60 * 24);
    return diff < 60;
  });
  return hasRecent ? 'HEALTHY' : 'NEEDS_CHECKUP';
}

// Route matching helper
function matchRoute(method, url) {
  // Strip query parameters and trailing slashes for robust matching
  const cleanUrl = url.split('?')[0].replace(/\/+$/, '');
  const key = `${method} ${cleanUrl}`;
  
  // Exact match
  if (mockApi[key]) return { handler: mockApi[key], id: null };

  // Pattern match
  for (const pattern of Object.keys(mockApi)) {
    const [pMethod, pPath] = pattern.split(' ');
    if (pMethod !== method) continue;
    
    const regex = pPath.replace(/:id/g, '([^/]+)');
    const match = cleanUrl.match(new RegExp(`^${regex}$`));
    if (match) {
      return { handler: mockApi[pattern], id: match[1] };
    }
  }
  
  return null;
}

export { matchRoute };
export default mockApi;
