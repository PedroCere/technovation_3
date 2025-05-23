const API_BASE_URL = 'http://localhost:8081/tasks';

export async function getOptimizationAdvice(tasks) {
  const response = await fetch(`${API_BASE_URL}/optimization-tip`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tasks })
  });

  if (!response.ok) throw new Error('Error getting optimization advice');
  return await response.json();
}

export async function getAntiProcrastinationAdvice(data) {
  const response = await fetch(`${API_BASE_URL}/anti-procrastination-tip`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!response.ok) throw new Error('Error getting anti-procrastination advice');
  return await response.json();
}
