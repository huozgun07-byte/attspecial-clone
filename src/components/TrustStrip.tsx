import { noSurprises } from "@/lib/knowledge";

/**
 * The three things people most often want confirmed before they will order:
 * no contract, no data cap, no equipment fee. Kept as a narrow strip rather
 * than a full section so it can sit directly under the plan grid on any page.
 */
export default function TrustStrip({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-att bg-att-light-blue px-6 py-6 sm:px-8 sm:py-7 ${className}`}>
      <ul className="grid sm:grid-cols-3 gap-6 sm:gap-8" role="list">
        {noSurprises.map((item) => (
          <li key={item.title} className="flex items-start gap-3">
            <svg
              className="w-5 h-5 shrink-0 mt-0.5 text-att-cyan"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.5 12.5 2.5 2.5 4.5-5" />
            </svg>
            <div>
              <p className="font-bold text-att-ink text-[15px] mb-1">{item.title}</p>
              <p className="att-fine text-att-gray-600">{item.desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
