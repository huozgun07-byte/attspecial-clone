// All wording used by the step-by-step availability wizard, in English and
// Spanish, kept out of the component so the flow logic stays readable.
//
// Copy note: written for this site. Tone target is "one easy question at a
// time" — nothing here should read like a form the visitor has to fill in.
//
// Accuracy note: the wizard does not run a real address-level availability
// check, so nothing here may tell the visitor that service IS available at
// their address. The promise is that a specialist confirms it on the call.

export interface WizardChoice {
  value: string;
  label: string;
  hint?: string;
}

export interface WizardCopy {
  /** Accessible name for the dialog. */
  dialogLabel: string;
  stepOf: (current: number, total: number) => string;
  /** Shown where the step counter sits once the flow is finished. */
  doneLabel: string;
  back: string;
  next: string;
  close: string;
  secure: string;

  service: { question: string; help: string; choices: WizardChoice[] };
  customer: { question: string; help: string; choices: WizardChoice[] };
  timeline: { question: string; help: string; choices: WizardChoice[] };

  zip: {
    question: string;
    help: string;
    label: string;
    placeholder: string;
    error: string;
  };

  email: {
    question: string;
    help: string;
    label: string;
    placeholder: string;
    skip: string;
    error: string;
  };

  contact: {
    question: string;
    help: string;
    firstName: string;
    lastName: string;
    phone: string;
    phonePlaceholder: string;
    callTime: string;
    callTimeChoices: WizardChoice[];
    consent: string;
    submit: string;
    submitting: string;
    errorFirstName: string;
    errorPhone: string;
  };

  result: {
    title: string;
    showingFor: string;
    callNow: string;
    callHelp: string;
    restart: string;
    plansTitle: string;
    thanks: string;
  };

  genericError: string;
}

export const wizardCopyEn: WizardCopy = {
  dialogLabel: "Check AT&T availability",
  stepOf: (c, t) => `Step ${c} of ${t}`,
  doneLabel: "All done",
  back: "Back",
  next: "Next",
  close: "Close",
  secure: "Safe, secure and confidential. We never sell your information.",

  service: {
    question: "What are you looking for?",
    help: "Pick the closest one — you can change it later on the call.",
    choices: [
      { value: "internet", label: "Home internet", hint: "Fiber or Internet Air" },
      { value: "wireless", label: "Wireless plan", hint: "Lines for your family" },
      { value: "bundle", label: "Internet + wireless", hint: "Bundle and save" },
      { value: "unsure", label: "Not sure yet", hint: "Show me the options" },
    ],
  },

  customer: {
    question: "Are you new to AT&T?",
    help: "New-customer offers differ from upgrade offers, so this decides what we quote you.",
    choices: [
      { value: "new", label: "I'm a new customer" },
      { value: "existing", label: "I already have AT&T service" },
      { value: "unsure", label: "I'm not sure" },
    ],
  },

  timeline: {
    question: "When do you need it working?",
    help: "This only sets how quickly we get back to you.",
    choices: [
      { value: "asap", label: "As soon as possible" },
      { value: "week", label: "Within a week" },
      { value: "month", label: "Within a month" },
      { value: "researching", label: "Just comparing for now" },
    ],
  },

  zip: {
    question: "What's your ZIP code?",
    help: "Just the ZIP for now — a specialist confirms your exact address on the call.",
    label: "ZIP code",
    placeholder: "75201",
    error: "Please enter a 5-digit ZIP code.",
  },

  email: {
    question: "Where should we send the details?",
    help: "Optional — it just means you get the plan and pricing in writing.",
    label: "Email address",
    placeholder: "you@example.com",
    skip: "Skip this step",
    error: "That email address doesn't look right.",
  },

  contact: {
    question: "Last step — who are we calling?",
    help: "A specialist confirms what's available at your address and books the install. No obligation.",
    firstName: "First name",
    lastName: "Last name (optional)",
    phone: "Phone number",
    phonePlaceholder: "(555) 123-0000",
    callTime: "Best time to reach you",
    callTimeChoices: [
      { value: "Any time", label: "Any time" },
      { value: "Morning", label: "Morning" },
      { value: "Afternoon", label: "Afternoon" },
      { value: "Evening", label: "Evening" },
    ],
    consent:
      "By continuing you agree that an AT&T Preferred Dealer specialist may call or text you about AT&T services at the number above. Consent isn't a condition of purchase. Message and data rates may apply.",
    submit: "See my offer",
    submitting: "Sending…",
    errorFirstName: "Please tell us your first name.",
    errorPhone: "Please enter a 10-digit phone number.",
  },

  result: {
    title: "You're all set",
    showingFor: "ZIP code",
    callNow: "Call now to order",
    callHelp: "Lines are open 24/7, and a specialist can usually confirm availability in a couple of minutes.",
    restart: "Start over",
    plansTitle: "AT&T Fiber plans",
    thanks:
      "A specialist will call to confirm exactly which plans reach your address and lock in your offer. Want it sorted now? Call us and skip the wait.",
  },

  genericError: "Something went wrong. Please try again, or call us and we'll take your details over the phone.",
};

export const wizardCopyEs: WizardCopy = {
  dialogLabel: "Verificar disponibilidad de AT&T",
  stepOf: (c, t) => `Paso ${c} de ${t}`,
  doneLabel: "Listo",
  back: "Atrás",
  next: "Siguiente",
  close: "Cerrar",
  secure: "Seguro y confidencial. Nunca vendemos tu información.",

  service: {
    question: "¿Qué estás buscando?",
    help: "Elige la opción más cercana — puedes cambiarla durante la llamada.",
    choices: [
      { value: "internet", label: "Internet en casa", hint: "Fiber o Internet Air" },
      { value: "wireless", label: "Plan móvil", hint: "Líneas para tu familia" },
      { value: "bundle", label: "Internet + móvil", hint: "Combina y ahorra" },
      { value: "unsure", label: "Todavía no sé", hint: "Muéstrame las opciones" },
    ],
  },

  customer: {
    question: "¿Eres cliente nuevo de AT&T?",
    help: "Las ofertas para clientes nuevos son distintas, así que esto decide qué precio te damos.",
    choices: [
      { value: "new", label: "Soy cliente nuevo" },
      { value: "existing", label: "Ya tengo servicio de AT&T" },
      { value: "unsure", label: "No estoy seguro" },
    ],
  },

  timeline: {
    question: "¿Para cuándo lo necesitas?",
    help: "Esto solo define qué tan rápido te contactamos.",
    choices: [
      { value: "asap", label: "Lo antes posible" },
      { value: "week", label: "Dentro de una semana" },
      { value: "month", label: "Dentro de un mes" },
      { value: "researching", label: "Solo estoy comparando" },
    ],
  },

  zip: {
    question: "¿Cuál es tu código postal?",
    help: "Solo el código postal por ahora — un especialista confirma tu dirección exacta en la llamada.",
    label: "Código postal",
    placeholder: "75201",
    error: "Por favor escribe un código postal de 5 dígitos.",
  },

  email: {
    question: "¿A dónde te enviamos los detalles?",
    help: "Opcional — sirve para que recibas el plan y el precio por escrito.",
    label: "Correo electrónico",
    placeholder: "tu@ejemplo.com",
    skip: "Omitir este paso",
    error: "Ese correo electrónico no parece válido.",
  },

  contact: {
    question: "Último paso — ¿a quién llamamos?",
    help: "Un especialista confirma qué hay disponible en tu dirección y agenda la instalación. Sin compromiso.",
    firstName: "Nombre",
    lastName: "Apellido (opcional)",
    phone: "Número de teléfono",
    phonePlaceholder: "(555) 123-0000",
    callTime: "Mejor hora para llamarte",
    callTimeChoices: [
      { value: "Any time", label: "Cualquier hora" },
      { value: "Morning", label: "Por la mañana" },
      { value: "Afternoon", label: "Por la tarde" },
      { value: "Evening", label: "Por la noche" },
    ],
    consent:
      "Al continuar aceptas que un especialista de un distribuidor preferido de AT&T te llame o envíe mensajes sobre servicios de AT&T al número indicado. El consentimiento no es condición de compra. Pueden aplicar tarifas de mensajes y datos.",
    submit: "Ver mi oferta",
    submitting: "Enviando…",
    errorFirstName: "Por favor escribe tu nombre.",
    errorPhone: "Por favor escribe un teléfono de 10 dígitos.",
  },

  result: {
    title: "Listo",
    showingFor: "Código postal",
    callNow: "Llama ahora para ordenar",
    callHelp: "Atendemos 24/7 y un especialista puede confirmar la disponibilidad en pocos minutos.",
    restart: "Empezar de nuevo",
    plansTitle: "Planes de AT&T Fiber",
    thanks:
      "Un especialista te llamará para confirmar qué planes llegan a tu dirección y asegurar tu oferta. ¿Lo quieres resolver ya? Llámanos y evita la espera.",
  },

  genericError: "Algo salió mal. Inténtalo de nuevo o llámanos y tomamos tus datos por teléfono.",
};
