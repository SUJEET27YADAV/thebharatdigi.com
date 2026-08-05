export function splitTitle(title: string) {
  const words = title.split(" ");
  const mid = Math.ceil(words.length / 2);
  return {
    first: words.slice(0, mid).join(" "),
    rest: words.slice(mid).join(" "),
  };
}
