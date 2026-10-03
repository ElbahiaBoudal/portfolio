import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { createPortal } from "react-dom";

import { Button } from "@/components/ui/button";

const FORMSPREE_ENDPOINT: string =
  import.meta.env["VITE_FORMSPREE_ENDPOINT"] || "https://formspree.io/f/xjyknlqy";

type FieldName = "name" | "email" | "message";
type FormData = Record<FieldName, string>;
type FormErrors = Partial<Record<FieldName, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const EMPTY_FORM: FormData = { name: "", email: "", message: "" };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const labelClass =
  "block font-mono text-xs uppercase tracking-wider text-muted-foreground";

const inputClass = (hasError: boolean) =>
  `mt-2 w-full rounded-xl border bg-card/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary focus:outline-none focus:ring-1 ${
    hasError
      ? "border-destructive focus:border-destructive focus:ring-destructive"
      : "border-border focus:border-primary focus:ring-primary"
  }`;

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  const email = data.email.trim();

  if (!data.name.trim()) errors.name = "Name is required.";

  if (!email) errors.email = "Email is required.";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "Please enter a valid email address.";

  if (!data.message.trim()) errors.message = "Message is required.";

  return errors;
}

/* ── Auto-dismissing success toast ──────────────────────────────────────── */

function SuccessToast({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"in" | "out">("in");

  useEffect(() => {
    // Begin slide-out 400 ms before removal so the animation completes cleanly
    const fadeTimer = setTimeout(() => setPhase("out"), 2600);
    const doneTimer = setTimeout(onDone, 3000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return createPortal(
    <>
      <style>{`
        @keyframes toast-in {
          from { opacity: 0; transform: translateX(110%); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes toast-out {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(110%); }
        }
        .toast-slide-in  { animation: toast-in  0.4s cubic-bezier(.2,.8,.2,1) both; }
        .toast-slide-out { animation: toast-out 0.4s cubic-bezier(.4,0,1,1)   both; }
      `}</style>
      <div
        role="status"
        aria-live="polite"
        className={`fixed right-5 top-24 z-[9999] flex items-center gap-3 rounded-xl border border-primary/40 bg-card px-5 py-4 shadow-xl backdrop-blur-sm ${
          phase === "in" ? "toast-slide-in" : "toast-slide-out"
        }`}
      >
        <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
        <p className="font-mono text-sm font-semibold text-foreground">
          Message sent successfully!
        </p>
      </div>
    </>,
    document.body
  );
}

/* ── Contact form ────────────────────────────────────────────────────────── */

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const isSubmitting = status === "submitting";

  const handleChange =
    (field: FieldName) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = e.target;
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => {
        if (!prev[field]) return prev;
        const next = { ...prev };
        delete next[field];
        return next;
      });
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData(EMPTY_FORM);
        return;
      }

      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
        errors?: { message?: string }[];
      };

      setStatus("error");
      setErrorMessage(
        data.errors?.[0]?.message ||
          data.error ||
          "Unable to send message right now. Please try again or reach out directly."
      );
    } catch {
      setStatus("error");
      setErrorMessage(
        "Network connection error. Please check your internet connection and try again."
      );
    }
  };

  return (
    <>
      {/* Portal-based toast — lives outside the form, auto-dismisses after 3 s */}
      {status === "success" && (
        <SuccessToast onDone={() => setStatus("idle")} />
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-6" noValidate>
        {status === "error" && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-foreground shadow-sm animate-enter"
          >
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
            <div>
              <p className="font-mono text-sm font-semibold text-destructive">Submission Error</p>
              <p className="mt-1 text-xs text-muted-foreground">{errorMessage}</p>
            </div>
          </div>
        )}

        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Your Name <span className="text-primary">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange("name")}
            disabled={isSubmitting}
            placeholder="e.g. Alex Morgan"
            aria-invalid={!!errors.name}
            className={inputClass(!!errors.name)}
          />
          {errors.name && (
            <p className="mt-1.5 font-mono text-[0.7rem] text-destructive">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email Address <span className="text-primary">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange("email")}
            disabled={isSubmitting}
            placeholder="e.g. alex@example.com"
            aria-invalid={!!errors.email}
            className={inputClass(!!errors.email)}
          />
          {errors.email && (
            <p className="mt-1.5 font-mono text-[0.7rem] text-destructive">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="contact-message" className={labelClass}>
            Message <span className="text-primary">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange("message")}
            disabled={isSubmitting}
            placeholder="Tell me about your project, team, or opportunity..."
            aria-invalid={!!errors.message}
            className={inputClass(!!errors.message)}
          />
          {errors.message && (
            <p className="mt-1.5 font-mono text-[0.7rem] text-destructive">{errors.message}</p>
          )}
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full gap-2 font-mono text-sm shadow-md sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Sending message...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Send Message</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </>
  );
}