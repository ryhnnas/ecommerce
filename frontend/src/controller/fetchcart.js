export async function getCart() {
  try {
    const token = localStorage.getItem('authToken');
    const res = await fetch(`http://localhost:8080/api/orders/my-orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      if (res.status === 401) {
        throw new Error('Unauthorized: Please log in again.');
      }
      throw new Error('Failed to fetch profile');
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Error fetching profile:', err);
    throw err;
  }
}