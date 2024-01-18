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

export * from "./Embed";
export * from "./formatting";
export * from "./Modal";
export * from "./Message";
export * from "./components/Button";
export * from "./components/Input";
export * from "./components/Option";
export * from "./components/Row";
export * from "./components/Select";
