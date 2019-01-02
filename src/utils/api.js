
const host = 'REPLACE_ME';

export function fetchPost() {
  return fetch(`${host}/api/`, {
    method: 'POST',
    body: JSON.stringify({}),
  });
}

export function fetchGet() {
  return fetch(`${host}/api/`)
    .then(res => res.json());
}
