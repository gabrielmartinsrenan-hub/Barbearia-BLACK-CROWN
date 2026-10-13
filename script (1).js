// BLACK CROWN — interações da página
document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) window.lucide.createIcons();

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const toast = document.getElementById("toast");
  let toastTimeout;

  function notify(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove("show"), 3800);
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.innerHTML = isOpen ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
    if (window.lucide) window.lucide.createIcons();
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.innerHTML = '<i data-lucide="menu"></i>';
      if (window.lucide) window.lucide.createIcons();
    });
  });

  // Atualiza ano automaticamente.
  document.getElementById("year").textContent = new Date().getFullYear();

  // Bloqueia datas passadas no calendário.
  const dateInput = document.getElementById("bookingDate");
  const now = new Date();
  dateInput.min = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  // Máscara simples de telefone brasileiro.
  const phoneInput = document.getElementById("clientPhone");
  phoneInput.addEventListener("input", () => {
    let digits = phoneInput.value.replace(/\D/g, "").slice(0, 11);
    if (digits.length > 10) {
      digits = digits.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, "($1) $2-$3");
    } else if (digits.length > 6) {
      digits = digits.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (digits.length > 2) {
      digits = digits.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
    } else if (digits.length) {
      digits = digits.replace(/^(\d*)/, "($1");
    }
    phoneInput.value = digits;
  });

  /*
   * IMPORTANTE:
   * Substitua o número abaixo pelo WhatsApp real, com código do país e DDD,
   * apenas números. Exemplo Brasil: 5547999999999
   */
  const WHATSAPP_NUMBER = "5500000000000";

  document.getElementById("bookingForm").addEventListener("submit", event => {
    event.preventDefault();
    const name = document.getElementById("clientName").value.trim();
    const phone = document.getElementById("clientPhone").value.trim();
    const service = document.getElementById("serviceSelect").value;
    const date = document.getElementById("bookingDate").value;
    const time = document.getElementById("bookingTime").value;

    if (!name || !phone || !service || !date || !time) {
      notify("Preencha todos os campos para continuar.");
      return;
    }

    const dateFormatted = new Date(`${date}T12:00:00`).toLocaleDateString("pt-BR");
    const message = `Olá! Gostaria de solicitar um agendamento na Black Crown.%0A%0A` +
      `Nome: ${encodeURIComponent(name)}%0A` +
      `Meu WhatsApp: ${encodeURIComponent(phone)}%0A` +
      `Serviço: ${encodeURIComponent(service)}%0A` +
      `Data desejada: ${encodeURIComponent(dateFormatted)}%0A` +
      `Horário desejado: ${encodeURIComponent(time)}%0A%0A` +
      `Se possível, confirme a disponibilidade.`;
    if (WHATSAPP_NUMBER === "5500000000000") {
      notify("Quase pronto! Abra js/script.js e configure o número real do WhatsApp da barbearia.");
      return;
    }
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank", "noopener,noreferrer");
  });

  document.getElementById("contactWhatsapp").addEventListener("click", event => {
    if (WHATSAPP_NUMBER === "5500000000000") {
      event.preventDefault();
      notify("Configure o número real do WhatsApp em js/script.js antes de publicar.");
    } else {
      event.currentTarget.href = `https://wa.me/${WHATSAPP_NUMBER}`;
    }
  });
});
