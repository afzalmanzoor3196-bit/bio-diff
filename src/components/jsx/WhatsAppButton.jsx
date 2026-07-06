import '../css/WhatsAppButton.css'

function WhatsAppButton() {
  return (
    <a
      className="whatsapp-fab"
      href="https://wa.me/030000000000"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <img src="/images/whatsapp-icon.png" alt="WhatsApp" />
    </a>
  )
}

export default WhatsAppButton
