export const getInitials = (name: string): string => {
  const namesArray = name.split(" ");
  if (namesArray.length > 1) {
    return `${namesArray[0][0]}${namesArray[1][0]}`.toUpperCase();
  }
  return `${namesArray[0][0]}`.toUpperCase();
};
