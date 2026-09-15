import WizardButton from "./WizardButton";
import { phoneNumber, telHref } from "@/lib/site-config";

/**
 * The block that used to hold the inline address form.
 *
 * It now opens the step-by-step wizard instead. The card still has to earn the
 * click, so it says what happens next and how long it takes rather than just
 * showing a button — a bare button in a hero reads as an advert, a button with
 * three plain promises reads as a tool.
 */

interface AvailabilityCardProps {
  title: string;
  /** One line under the title. */
  subtitle?: string;
  cta?: string;
  /** Recorded on the lead. */
  source: string;
  zip?: string;
  lang?: "en" | "es";
  /** Short reassurance bullets. Pass [] to hide them. */
  bullets?: string[];
  /** Phone fallback line under the button. */
  showPhone?: boolean;
  className?: string;
}

const defaultBullets = [
  "Six quick questions, about 30 seconds",
  "No street address or credit check needed",
  "No obligation to order",
];

export default function AvailabilityCard({
  title,
  subtitle = "A few quick questions, starting with your ZIP code. A specialist then confirms exactly what reaches your address.",
  cta = "Check my address",
  source,
  zip,
  lang = "en",
  bullets = defaultBullets,
  showPhone = true,
  className = "",
}: AvailabilityCardProps) {
  return (
    <div className={className}>
      <h2 className="att-h3 mb-2">{title}</h2>
      {subtitle && <p className="text-att-gray-600 text-sm mb-5">{subtitle}</p>}

      <WizardButton source={source} zip={zip} lang={lang} className="btn-primary w-full">
        {cta}
        <svg className="btn-arrow w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </WizardButton>

      {bullets.length > 0 && (
        <ul className="mt-4 space-y-2" role="list">
          {bullets.map((item) => (
            <li key={item} className="flex items-start gap-2 att-fine text-att-gray-600">
              <svg
                className="w-4 h-4 shrink-0 mt-px text-att-cyan"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      )}

      {showPhone && (
        <p className="att-fine text-att-gray-500 mt-4">
          {lang === "es" ? "¿Prefieres hablar? Llama al " : "Rather talk to someone? Call "}
          <a href={telHref(phoneNumber)} className="text-att-navy font-bold underline underline-offset-2">
            {phoneNumber}
          </a>
          {lang === "es" ? " — disponible 24/7." : " — open 24/7."}
        </p>
      )}
    </div>
  );
}
