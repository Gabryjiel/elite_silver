export function excludeDates(object: any) {
  delete object['createdAt'];
  delete object['updatedAt'];

  return object;
}
