export const delay = (timeout: number = 500): Promise<void> => {
  return new Promise<void>(resolve => {
    setTimeout(resolve, timeout);
  });
};
