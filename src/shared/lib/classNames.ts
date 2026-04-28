export function classNames(...value: Array<string | false | null | undefined>) {
  return value.filter(Boolean).join(' ');
}
