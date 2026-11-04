// Утилита доступности комбо по времени Костаная.
// Часовой пояс Asia/Qostanay (UTC+5), не зависит от устройства клиента.

export function getQostanayHour(): number {
  try {
    const fmt = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Qostanay',
      hour: 'numeric',
      hour12: false,
    });
    const parts = fmt.formatToParts(new Date());
    const hourPart = parts.find((p) => p.type === 'hour');
    const hour = hourPart ? parseInt(hourPart.value, 10) : new Date().getHours();
    return isNaN(hour) ? new Date().getHours() : hour;
  } catch {
    // Fallback: UTC+5 (Костанай)
    const utc5 = new Date(Date.now() + 5 * 60 * 60 * 1000);
    return utc5.getUTCHours();
  }
}

export function isComboAvailable(): boolean {
  const hour = getQostanayHour();
  return hour >= 8 && hour < 12;
}
