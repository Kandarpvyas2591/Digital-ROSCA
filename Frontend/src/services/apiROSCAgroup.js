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

export async function login(data) {
  const data1 = await fetch(`${API_URL}/user/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return data1;
}

export async function signUp(data) {
  await fetch(`${API_URL}/user/register`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export async function getMe() {
  const res = await fetch(`${API_URL}/user/getme`, {
    method: 'GET',
    credentials: 'include',
  });
  const data = await res.json();
  return data.data;
}
