import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { navigate, toHash } from "../router-store";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; prefetch?: boolean; scroll?: boolean };

export default function Link({ href, onClick, prefetch: _p, scroll: _s, ...rest }: Props) {
  void _p;
  void _s;
  const external = /^(https?:|mailto:)/.test(href);
  if (external) return <a href={href} target="_blank" rel="noreferrer" onClick={onClick} {...rest} />;
  return (
    <a
      href={`#${toHash(href).hash}`}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        navigate(href);
      }}
      {...rest}
    />
  );
}
