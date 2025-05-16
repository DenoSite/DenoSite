const sessions = new Set<string>();

export function createSession(): string {
  const token = crypto.randomUUID();
  sessions.add(token);
  return token;
}

export function isValidSession(token: string | null): boolean {
  return token !== null && sessions.has(token);
}


export function deleteSession(token: string): void {
  sessions.delete(token);
}