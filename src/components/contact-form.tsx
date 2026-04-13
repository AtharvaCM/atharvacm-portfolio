"use client";

import { FormEvent, useState } from "react";

import type { ContactResponse } from "@/lib/types";

type ContactFormState = {
  name: string;
  email: string;
  message: string;
  website: string;
};

const initialState: ContactFormState = {
  name: "",
  email: "",
  message: "",
  website: "",
};

export function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const payload = (await response.json()) as ContactResponse;

      if (!response.ok || !payload.ok) {
        setStatus("error");
        setMessage(payload.ok ? "Could not submit the form." : payload.error);
        return;
      }

      setStatus("success");
      setMessage("Message sent. I will get back to you shortly.");
      setForm(initialState);
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <form
      className="panel relative overflow-hidden space-y-6 p-6 md:p-8"
      onSubmit={onSubmit}
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent/10 blur-lg" />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="form-label">
          <span>Name</span>
          <input
            className="form-input mt-2"
            onChange={(event) =>
              setForm((state) => ({ ...state, name: event.target.value }))
            }
            required
            value={form.name}
          />
        </label>
        <label className="form-label">
          <span>Email</span>
          <input
            className="form-input mt-2"
            onChange={(event) =>
              setForm((state) => ({ ...state, email: event.target.value }))
            }
            required
            type="email"
            value={form.email}
          />
        </label>
      </div>

      <label className="form-label">
        <span>Message</span>
        <textarea
          className="form-textarea mt-2"
          onChange={(event) =>
            setForm((state) => ({ ...state, message: event.target.value }))
          }
          placeholder="Tell me a little about why you’re reaching out, whether it’s a role, a project, a question, or just a hello."
          required
          value={form.message}
        />
      </label>

      <input
        autoComplete="off"
        className="hidden"
        name="website"
        onChange={(event) =>
          setForm((state) => ({ ...state, website: event.target.value }))
        }
        tabIndex={-1}
        value={form.website}
      />

      <div className="flex items-center justify-between gap-4">
        <button
          className="btn-primary disabled:pointer-events-none disabled:opacity-55"
          disabled={status === "loading"}
          type="submit"
        >
          {status === "loading" ? "Sending..." : "Send message"}
        </button>
        {message ? (
          <p
            className={
              status === "error"
                ? "text-sm font-medium text-[hsl(4_62%_42%)]"
                : "text-sm text-text/75"
            }
          >
            {message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
