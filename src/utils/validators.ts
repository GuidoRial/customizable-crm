export function fieldCannotBeEmpty(value: string) {
  return value.length > 0;
}
export function fieldShouldBeLessThanComparatorCharacters(value: string, comparator: number) {
  return value.length < comparator;
}

export function emailIsValid(email: string) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
}

export function passwordIsValid(password: string) {
  return (
    String(password).match(/[a-z]/g) &&
    String(password).match(/[A-Z]/g) &&
    String(password).match(/[0-9]/g) &&
    String(password).length >= 8
  );
}

export function usernameIsAvailable(username: string, usernames: string[]) {
  return !usernames.includes(username);
}

export function stringsShouldMatch(string1: string, string2: string) {
  return string1 === string2;
}
