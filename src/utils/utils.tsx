export function getValidDate(dateString: string): Date {
  if (!isNaN(Date.parse(dateString))) {
    return new Date(dateString);
  }

  return new Date();
}
