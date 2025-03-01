const API_URL = 'http://localhost:8000/api/v1';

export async function createGroup() {}

export async function getGroups() {
  const res = await fetch(`${API_URL}/rosca/get-all-groups`);

  if (!res.ok) throw new Error('Failed to get groups');

  const data = await res.json();
  // console.log(data);
  return data;
}

export async function getGroupById(id) {
  const res = await fetch(`${API_URL}/rosca/get-group/${id}`);

  if (!res.ok) throw new Error('Failed to get groups');

  const data = await res.json();
  // console.log(data);
  return data;
}
