import WizardButton from "./WizardButton";
import type { WirelessPlan } from "@/lib/site-config";

/** One unlimited-plan tier, same card shell as the fiber plans. Server-safe. */
export default function WirelessPlanCard({ plan, highlighted = false, source }: { plan: WirelessPlan; highlighted?: boolean; source: string }) {
  return (
    <article className={`plan-card ${highlighted ? "plan-card-highlighted" : ""}`} role="listitem">
      <div className="plan-header">
        <span className="text-white font-bold tracking-wide text-sm uppercase">{plan.name}</span>
        {highlighted && <span className="plan-badge">Most popular</span>}
      </div>
      <div className="plan-body">
        <p className="plan-label">AT&amp;T Unlimited</p>
        <div className="plan-price">
          <span className="plan-price-amount">{plan.price}</span>
          <span className="plan-price-period">/mo per line*</span>
        </div>
        <p className="att-fine text-att-gray-500 mb-3">
          {plan.regularPrice}/mo without AutoPay &amp; Paperless. 4 lines.
        </p>
        <ul className="mb-5 space-y-2 flex-1" role="list">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2 att-fine text-att-gray-700">
              <svg className="w-4 h-4 shrink-0 mt-px text-att-cyan" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {f}
            </li>
          ))}
        </ul>
        <WizardButton source={source} service="wireless" className={`w-full ${highlighted ? "btn-primary" : "btn-secondary"}`}>
          Get a quote
        </WizardButton>
      </div>
    </article>
  );
}
