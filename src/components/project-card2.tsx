// components/project-card2.tsx
import { Badge } from "@/components/ui/badge";
import { Card2, Card2Content, Card2Footer, Card2Header, Card2Title } from "@/components/ui/card2";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard2({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
}: Props) {
  return (
    <Card2 className={cn("h-full", className)}>
      {/* Left Side: Video or Image */}
      <div className="flex-shrink-0 w-40 relative">
        <Link href={href || "#"} className={cn("block cursor-pointer h-full", className)}>
          {video && (
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="pointer-events-none h-full w-full object-cover absolute inset-0"
            />
          )}
          {image && (
            <Image
              src={image}
              alt={title}
              width={500}
              height={300}
              className="h-full w-full overflow-hidden object-cover absolute inset-0"
            />
          )}
        </Link>
      </div>

      {/* Right Side: Content */}
      <div className="flex flex-col flex-grow p-2">
        <Card2Header className="px-2">
          <div className="space-y-1">
            <Card2Title className="mt-1 text-base">{title}</Card2Title>
            <time className="font-sans text-xs">{dates}</time>
            <div className="hidden font-sans text-xs underline print:visible">
              {link?.replace("https://", "").replace("www.", "").replace("/", "")}
            </div>
            <Markdown className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
              {description}
            </Markdown>
          </div>
        </Card2Header>
        <Card2Content className="mt-auto flex flex-col px-2">
          {tags && tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {tags?.map((tag) => (
                <Badge
                  className="px-1 py-0 text-[10px]"
                  variant="secondary"
                  key={tag}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </Card2Content>
        <Card2Footer className="px-2 pb-2">
          {links && links.length > 0 && (
            <div className="flex flex-row flex-wrap items-start gap-1">
              {links?.map((link, idx) => (
                <Link href={link?.href} key={idx} target="_blank">
                  <Badge key={idx} className="flex gap-2 px-2 py-1 text-[10px]">
                    {link.icon}
                    {link.type}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </Card2Footer>
      </div>
    </Card2>
  );
}