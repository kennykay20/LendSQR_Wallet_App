export function isValidEmail(email: string): boolean {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function isValidPassword(password: string): boolean {
  const re = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d\w\W]{5,}$/;
  return re.test(password);
}
