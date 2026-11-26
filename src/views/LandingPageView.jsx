import { useState } from 'react'
import { ButtonLink } from '../components/ButtonLink'
import { SectionHeading } from '../components/SectionHeading'
import { createLandingPageViewModel } from '../viewmodels/landingPageViewModel'
import styles from './LandingPageView.module.css'

function validateContactField(field, value) {
  const trimmedValue = value.trim()

  if (field === 'fullName') {
    if (!trimmedValue) {
      return 'Informe seu nome completo.'
    }

    if (trimmedValue.length < 3) {
      return 'O nome deve ter pelo menos 3 caracteres.'
    }
  }

  if (field === 'email') {
    if (!trimmedValue) {
      return 'Informe seu e-mail.'
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(trimmedValue)) {
      return 'Informe um e-mail valido, como nome@dominio.com.'
    }
  }

  if (field === 'message') {
    if (!trimmedValue) {
      return 'Escreva sua mensagem.'
    }

    if (trimmedValue.length < 10) {
      return 'A mensagem deve ter pelo menos 10 caracteres.'
    }
  }

  return ''
}

function validateContactForm(values) {
  return {
    fullName: validateContactField('fullName', values.fullName),
    email: validateContactField('email', values.email),
    message: validateContactField('message', values.message),
  }
}

export function LandingPageView() {
  const { navigation, benefits, modules, steps, faqs } = createLandingPageViewModel()
  const [openFaqIndex, setOpenFaqIndex] = useState(null)
  const [contactForm, setContactForm] = useState({
    fullName: '',
    email: '',
    message: '',
  })
  const [contactErrors, setContactErrors] = useState({
    fullName: '',
    email: '',
    message: '',
  })
  const [contactSuccessMessage, setContactSuccessMessage] = useState('')

  const handleFaqToggle = (index) => {
    setOpenFaqIndex((currentIndex) => (currentIndex === index ? null : index))
  }

  const handleContactChange = (event) => {
    const { name, value } = event.target

    setContactForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }))

    setContactErrors((currentErrors) => ({
      ...currentErrors,
      [name]: validateContactField(name, value),
    }))

    if (contactSuccessMessage) {
      setContactSuccessMessage('')
    }
  }

  const handleContactSubmit = (event) => {
    event.preventDefault()

    const nextErrors = validateContactForm(contactForm)
    const hasErrors = Object.values(nextErrors).some(Boolean)

    setContactErrors(nextErrors)

    if (hasErrors) {
      return
    }

    setContactSuccessMessage('Mensagem enviada com sucesso! Em breve entraremos em contato.')
    setContactForm({
      fullName: '',
      email: '',
      message: '',
    })
  }

  return (
    <>
      <header className={styles.header}>
        <a className={styles.brand} href="#inicio" aria-label="Vocalis — voltar ao início">
          vocalis
        </a>
        <nav className={styles.navigation} aria-label="Navegação principal">
          {navigation.map((item) => (
            <a href={item.href} key={item.href}>{item.label}</a>
          ))}
        </nav>
        <ButtonLink href="#modulos" className={styles.headerCta}>Conhecer as aulas</ButtonLink>
      </header>

      <main id="inicio">
        <section className={`${styles.hero} ${styles.container}`}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>Sua voz. Seu ritmo. Sua descoberta.</p>
            <h1>Sua voz merece ser descoberta.</h1>
            <p className={styles.heroText}>
              Aprenda os fundamentos do canto, explore sua musicalidade e encontre novas formas de
              se expressar. Tudo começa com uma nota.
            </p>
            <ButtonLink href="#modulos">Conhecer as aulas <span aria-hidden="true">→</span></ButtonLink>
          </div>
          <div className={styles.heroVisual}>
            <span className={styles.noteOne} aria-hidden="true">♪</span>
            <img src="/vocalis-logo.png" alt="Símbolo do Vocalis, uma onda sonora formando um sorriso" />
            <span className={styles.noteTwo} aria-hidden="true">♫</span>
          </div>
        </section>

        <section id="beneficios" className={`${styles.section} ${styles.container}`}>
          <SectionHeading
            eyebrow="Por que começar"
            title="Aprender música começa com você."
            description="Um primeiro contato acolhedor com sua voz, sem cobranças e sem precisar de experiência."
          />
          <div className={styles.cardGrid}>
            {benefits.map((benefit) => (
              <article className={styles.benefitCard} key={benefit.title}>
                <span className={styles.cardSymbol} aria-hidden="true">{benefit.symbol}</span>
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="modulos" className={styles.modulesSection}>
          <div className={`${styles.section} ${styles.container}`}>
            <SectionHeading
              eyebrow="Módulos demonstrativos"
              title="Uma jornada em três etapas."
              description="Conteúdos organizados para apresentar os fundamentos de maneira clara e gradual."
              align="left"
            />
            <div className={styles.moduleGrid}>
              {modules.map((module) => (
                <article className={styles.moduleCard} key={module.number}>
                  <span className={styles.moduleNumber}>{module.number}</span>
                  <div>
                    <h3>{module.title}</h3>
                    <p>{module.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="como-funciona" className={`${styles.section} ${styles.container}`}>
          <div className={styles.howLayout}>
            <SectionHeading
              eyebrow="Como funciona"
              title="Comece de onde você está."
              description="Cada exercício é um novo passo. Conheça a proposta no seu tempo e do seu jeito."
              align="left"
            />
            <ol className={styles.steps}>
              {steps.map((step) => (
                <li key={step.title}>
                  <span>{step.number}</span>
                  <div><h3>{step.title}</h3><p>{step.text}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.testimonialsSection}>
          <div className={`${styles.section} ${styles.container}`}>
            <SectionHeading
              eyebrow="Exemplos ilustrativos"
              title="Aprender também é descobrir."
            />
            <div className={styles.testimonialGrid}>
              <blockquote>
                <p>“Finalmente sei por onde começar.”</p>
                <cite>Marina, personagem fictícia</cite>
              </blockquote>
              <blockquote>
                <p>“Aprender também é experimentar.”</p>
                <cite>Lucas, personagem fictício</cite>
              </blockquote>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.container}`}>
          <div className={styles.offer}>
            <div>
              <p className={styles.offerLabel}>Plano introdutório gratuito</p>
              <h2>Seu primeiro passo começa aqui.</h2>
              <p>Explore os fundamentos apresentados pelo Vocalis e descubra por onde começar.</p>
            </div>
            <ButtonLink href="#modulos" variant="light">Quero começar <span aria-hidden="true">→</span></ButtonLink>
          </div>
        </section>

        <section id="duvidas" className={`${styles.section} ${styles.faqSection} ${styles.container}`}>
          <SectionHeading eyebrow="FAQ" title="Dúvidas frequentes" align="left" />
          <div className={styles.faqList}>
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index
              const questionId = `faq-question-${index}`
              const panelId = `faq-panel-${index}`

              return (
                <article key={faq.question} className={styles.faqItem}>
                  <h3>
                    <button
                      id={questionId}
                      type="button"
                      className={styles.faqButton}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => handleFaqToggle(index)}
                    >
                      {faq.question}
                      <span className={styles.faqButtonIcon} aria-hidden="true">▾</span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    className={styles.faqPanel}
                    role="region"
                    aria-labelledby={questionId}
                    hidden={!isOpen}
                  >
                    <p>{faq.answer}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section id="contato" className={`${styles.section} ${styles.container}`}>
          <SectionHeading
            eyebrow="Contato acadêmico"
            title="Envie sua dúvida sobre o protótipo"
            description="Este formulário é apenas demonstrativo e não envia dados para um servidor."
            align="left"
          />
          <form className={styles.contactForm} onSubmit={handleContactSubmit} noValidate>
            <div className={styles.formField}>
              <label htmlFor="fullName">Nome completo</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={contactForm.fullName}
                onChange={handleContactChange}
                className={styles.contactInput}
                aria-invalid={Boolean(contactErrors.fullName)}
                aria-describedby={contactErrors.fullName ? 'fullName-error' : undefined}
              />
              {contactErrors.fullName && (
                <p id="fullName-error" className={styles.formError}>
                  {contactErrors.fullName}
                </p>
              )}
            </div>

            <div className={styles.formField}>
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                name="email"
                type="email"
                value={contactForm.email}
                onChange={handleContactChange}
                className={styles.contactInput}
                aria-invalid={Boolean(contactErrors.email)}
                aria-describedby={contactErrors.email ? 'email-error' : undefined}
              />
              {contactErrors.email && (
                <p id="email-error" className={styles.formError}>
                  {contactErrors.email}
                </p>
              )}
            </div>

            <div className={styles.formField}>
              <label htmlFor="message">Mensagem</label>
              <textarea
                id="message"
                name="message"
                value={contactForm.message}
                onChange={handleContactChange}
                className={`${styles.contactInput} ${styles.contactTextarea}`}
                aria-invalid={Boolean(contactErrors.message)}
                aria-describedby={contactErrors.message ? 'message-error' : undefined}
              />
              {contactErrors.message && (
                <p id="message-error" className={styles.formError}>
                  {contactErrors.message}
                </p>
              )}
            </div>

            <button type="submit" className={styles.contactButton}>Enviar mensagem</button>

            {contactSuccessMessage && (
              <p className={styles.formSuccess} role="status" aria-live="polite">
                {contactSuccessMessage}
              </p>
            )}
          </form>
        </section>

        <section className={styles.finalCta}>
          <div className={styles.container}>
            <p className={styles.eyebrow}>Sua voz pode começar agora</p>
            <h2>Descubra o prazer de aprender música.</h2>
            <ButtonLink href="#modulos" variant="light">Conhecer os módulos</ButtonLink>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <a className={styles.brand} href="#inicio">vocalis</a>
          <p>Sua voz. Seu ritmo. Sua descoberta.</p>
        </div>
      </footer>
    </>
  )
}
