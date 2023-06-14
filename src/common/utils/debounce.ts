export default function debounce(callback: () => void, wait: number) {
  let timer: NodeJS.Timeout;

  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback();
    }, wait);
  };
}
