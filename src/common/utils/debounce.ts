// export default function debounce<T extends (...args: any[]) => any>(
//   callback: T,
//   wait: number
// ) {
//   let timer: NodeJS.Timeout;

//   return (...args: Parameters<T>) => {
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       callback(...args);
//     }, wait);
//   };
// }

export default function debounce<T extends (...args: any[]) => Promise<any>>(
  callback: T,
  wait: number
) {
  let timer: NodeJS.Timeout;

  return (...args: Parameters<T>): Promise<ReturnType<T>> => {
    clearTimeout(timer);

    return new Promise<ReturnType<T>>((resolve) => {
      timer = setTimeout(async () => {
        const result = await callback(...args);
        resolve(result);
      }, wait);
    });
  };
}
