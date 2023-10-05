export function validatePassword(password: string): boolean {
  return /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{8,}$/g.test(password) ? true : false;
}
