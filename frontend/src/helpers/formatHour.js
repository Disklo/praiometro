function formatHour(dateString) {
    const date = new Date(dateString);
    const hora = String(date.getHours()).padStart(2, '0');
    const minutos = String(date.getMinutes()).padStart(2, '0');
    return `${hora}:${minutos}`;
}

export { formatHour };