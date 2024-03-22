export const debounce = <T extends unknown[], R>(
  func: (...args: T) => R,
  waitMilliseconds: number,
): ((...args: T) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (...args: T): void {
    const doLater = () => {
      timeoutId = null;
      func(...args);
    };

    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(doLater, waitMilliseconds);
  };
};
