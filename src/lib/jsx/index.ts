export function createElement<Attributes, Children extends any[], Return>(
  component: (props: Attributes & { children: Children }) => Return,
  attributes: Attributes,
  ...children: Children
): Return {
  return component({ ...attributes, children });
}

export function Fragment<Children extends any[]>({
  children,
}: {
  children: Children;
}): Children {
  return children;
}
