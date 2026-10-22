// React 18 needs an empty string to emit this native boolean attribute.
// Newer DOM typings describe inert as a boolean.
export function inertProps(isInert: boolean) {
  return { inert: isInert ? "" : undefined } as unknown as { inert?: boolean };
}
