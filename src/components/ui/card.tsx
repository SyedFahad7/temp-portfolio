import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  flex?: "row" | "col";
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, flex = "col", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg bg-card text-card-foreground",
        flex === "row" && "flex flex-row",
        flex === "col" && "flex flex-col",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: "sm" | "md" | "lg";
  fullHeight?: boolean;
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, gap, fullHeight, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "text-pretty font-sans text-sm text-muted-foreground",
        gap === "sm" && "space-y-1",
        gap === "md" && "space-y-2",
        gap === "lg" && "space-y-4",
        fullHeight && "h-full",
        className
      )}
      {...props}
    />
  )
);
CardContent.displayName = "CardContent";

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: "sm" | "md" | "lg";
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, gap, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center pt-2",
        gap === "sm" && "gap-1",
        gap === "md" && "gap-2",
        gap === "lg" && "gap-4",
        className
      )}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};