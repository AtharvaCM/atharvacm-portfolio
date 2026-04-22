"use client";

import { useRouter } from "next/navigation";
import {
  type KeyboardEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { trackEvent } from "@/lib/gtm-events";

type Command = {
  id: string;
  label: string;
  hint: string;
  href: string;
  displayHref?: string;
  aliases?: string[];
  hidden?: boolean;
};

const COMMANDS: Command[] = [
  {
    id: "home",
    label: "Home",
    hint: "Back to the first impression.",
    href: "/",
    displayHref: "/home",
  },
  {
    id: "projects",
    label: "Projects",
    hint: "Selected work and shipped systems.",
    href: "/projects",
  },
  {
    id: "resume",
    label: "Resume",
    hint: "Experience, stack, and project proof.",
    href: "/resume",
  },
  {
    id: "about",
    label: "About",
    hint: "A little more context behind the work.",
    href: "/about",
  },
  {
    id: "contact",
    label: "Contact",
    hint: "Reach out without an intake funnel.",
    href: "/contact",
  },
  {
    id: "blog",
    label: "Blog",
    hint: "Writing, once it starts shipping.",
    href: "/blog",
  },
  {
    id: "now",
    label: "Now",
    hint: "A quiet current snapshot.",
    href: "/now",
    aliases: ["show /now", "open lab notes"],
  },
  {
    id: "cat-about-me",
    label: "cat /about/me",
    hint: "Print the human-readable version.",
    href: "/about",
    hidden: true,
  },
  {
    id: "sudo-personality",
    label: "sudo reveal personality",
    hint: "Escalate from portfolio to person.",
    href: "/now",
    hidden: true,
  },
];

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  const tagName = target.tagName.toLowerCase();

  return (
    tagName === "input" ||
    tagName === "textarea" ||
    tagName === "select" ||
    target.isContentEditable
  );
}

function matchesCommand(command: Command, query: string) {
  if (!query) {
    return !command.hidden;
  }

  const haystack = [
    command.label,
    command.hint,
    command.href,
    ...(command.aliases ?? []),
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query.toLowerCase());
}

function normalizeCommandQuery(query: string) {
  return query.trim().toLowerCase();
}

function getSelectedCommandName(command: Command, query: string) {
  const normalizedQuery = normalizeCommandQuery(query);
  const matchedAlias = command.aliases?.find(
    (alias) => alias.toLowerCase() === normalizedQuery
  );

  if (matchedAlias) {
    return matchedAlias;
  }

  return command.hidden ? command.label : command.id;
}

function isHiddenCommandSelection(command: Command, query: string) {
  const normalizedQuery = normalizeCommandQuery(query);

  return (
    Boolean(command.hidden) ||
    Boolean(
      command.aliases?.some((alias) => alias.toLowerCase() === normalizedQuery)
    )
  );
}

export function CommandPalette() {
  const router = useRouter();
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const visibleCommands = COMMANDS.filter((command) =>
    matchesCommand(command, query.trim())
  );

  useEffect(() => {
    function onKeyDown(event: globalThis.KeyboardEvent) {
      if (isTypingTarget(event.target)) {
        return;
      }

      const opensWithK =
        event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey);
      const opensWithSlash =
        event.key === "/" && !event.metaKey && !event.ctrlKey && !event.altKey;

      if (opensWithK || opensWithSlash) {
        event.preventDefault();
        if (!isOpen) {
          trackEvent("command_palette_open", { location: "global" });
        }
        setIsOpen(true);
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isOpen]);

  function closePalette() {
    setIsOpen(false);
    setQuery("");
    setActiveIndex(0);
  }

  function runCommand(command: Command | undefined) {
    if (!command) {
      return;
    }

    trackEvent("command_palette_select", {
      command: getSelectedCommandName(command, query),
      destination: command.href,
      is_hidden_command: isHiddenCommandSelection(command, query),
    });

    router.push(command.href);
    closePalette();
  }

  function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      closePalette();
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) =>
        Math.min(current + 1, Math.max(visibleCommands.length - 1, 0))
      );
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => Math.max(current - 1, 0));
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      runCommand(visibleCommands[activeIndex]);
    }
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div
      aria-labelledby={inputId}
      aria-modal="true"
      className="fixed inset-0 z-[90] flex items-start justify-center bg-[hsl(var(--bg)/0.62)] px-4 pt-[14vh] backdrop-blur-sm"
      onMouseDown={closePalette}
      role="dialog"
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-[1.35rem] border border-border/80 bg-[hsl(var(--surface)/0.96)] shadow-[0_28px_90px_hsl(var(--ink)/0.42)]"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="border-b border-border/70 px-4 py-4 md:px-5">
          <label className="sr-only" htmlFor={inputId}>
            Command palette
          </label>
          <input
            autoComplete="off"
            className="w-full bg-transparent text-[1rem] font-medium text-text outline-none placeholder:text-text/36 md:text-[1.05rem]"
            id={inputId}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={handleInputKeyDown}
            placeholder="Search routes or type a command..."
            ref={inputRef}
            value={query}
          />
          <p className="mt-2 text-xs leading-5 text-text/48">
            Jump anywhere. A few things are hidden on purpose.
          </p>
        </div>

        <div className="command-palette-scroll max-h-[min(24rem,52vh)] overflow-y-auto p-2">
          {visibleCommands.length > 0 ? (
            <ul className="space-y-1">
              {visibleCommands.map((command, index) => (
                <li key={command.id}>
                  <button
                    className="group grid w-full gap-1 rounded-[0.95rem] border border-transparent px-3 py-3 text-left transition duration-150 hover:bg-[hsl(var(--text)/0.055)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent data-[active=true]:border-border/75 data-[active=true]:bg-[hsl(var(--text)/0.06)] data-[active=true]:shadow-[inset_2px_0_0_hsl(var(--accent)/0.72)]"
                    data-active={index === activeIndex}
                    onClick={() => runCommand(command)}
                    onMouseEnter={() => setActiveIndex(index)}
                    type="button"
                  >
                    <span className="flex items-center justify-between gap-4">
                      <span className="text-sm font-semibold tracking-[-0.01em] text-text">
                        {command.label}
                      </span>
                      <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-text/34 group-data-[active=true]:text-accent/80">
                        {command.displayHref ?? command.href}
                      </span>
                    </span>
                    <span className="text-sm leading-6 text-text/55">
                      {command.hint}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-3 py-6 text-sm text-text/55">
              No command found. Some doors are intentionally unmarked.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
