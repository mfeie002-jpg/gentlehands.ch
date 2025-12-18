import { Link, LinkProps } from "react-router-dom";
import { useRoutePrefetch } from "@/hooks/useRoutePrefetch";
import { forwardRef } from "react";

interface PrefetchLinkProps extends LinkProps {
  prefetch?: boolean;
}

export const PrefetchLink = forwardRef<HTMLAnchorElement, PrefetchLinkProps>(
  ({ to, prefetch = true, children, ...props }, ref) => {
    const { prefetchOnHover } = useRoutePrefetch();
    const path = typeof to === "string" ? to : to.pathname || "";

    const prefetchHandlers = prefetch ? prefetchOnHover(path) : {};

    return (
      <Link ref={ref} to={to} {...prefetchHandlers} {...props}>
        {children}
      </Link>
    );
  }
);

PrefetchLink.displayName = "PrefetchLink";
