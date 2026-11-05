import { Clock, MapPin, MessageCircle, Instagram, Navigation } from 'lucide-react';
import { Starfish } from './Decor';
import { SmartImage } from './SmartImage';
import { cafeInfo } from '../data/menu';
import { useI18n } from '../context/I18nContext';

export function Contacts() {
  const { t, locale } = useI18n();
  const whatsappLink = `https://wa.me/${cafeInfo.whatsapp}?text=${encodeURIComponent('Здравствуйте! Хочу сделать заказ в KISSA')}`;

  return (
    <section id="contacts" className="relative overflow-hidden bg-kissa-pink-light px-4 py-14 sm:px-6 sm:py-20">
      <Starfish className="absolute right-4 top-8 w-16 opacity-60 animate-floaty sm:w-24" />

      <div className="relative mx-auto max-w-5xl">
        <div className="text-center">
          <span className="inline-block rounded-full bg-kissa-lime px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-kissa-green">
            {t.contacts.sectionLabel}
          </span>
          <h2 className="mt-4 font-display text-3xl font-black uppercase text-kissa-green sm:text-4xl lg:text-5xl">
            {t.contacts.heading}
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-start gap-4 rounded-kissa bg-white p-5 shadow-kissa">
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-kissa-pink text-white">
                <Clock size={22} />
              </span>
              <div>
                <p className="font-display text-sm font-extrabold uppercase text-kissa-olive">{t.contacts.hours}</p>
                <p className="text-lg font-bold text-kissa-green">{cafeInfo.hours[locale]}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-kissa bg-white p-5 shadow-kissa">
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-kissa-pink text-white">
                <MapPin size={22} />
              </span>
              <div>
                <p className="font-display text-sm font-extrabold uppercase text-kissa-olive">{t.contacts.address}</p>
                <p className="text-lg font-bold text-kissa-green">{cafeInfo.address[locale]}</p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-kissa bg-kissa-pink p-4 font-bold text-white shadow-kissa transition-transform hover:scale-105 active:scale-95"
              >
                <MessageCircle size={20} />
                WhatsApp
              </a>
              <a
                href={cafeInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-kissa bg-kissa-green p-4 font-bold text-white shadow-kissa transition-transform hover:scale-105 active:scale-95"
              >
                <Instagram size={20} />
                {cafeInfo.instagramHandle}
              </a>
            </div>

            <p className="text-center text-sm font-semibold text-kissa-olive">
              {t.contacts.phone}: <a href={`tel:${cafeInfo.whatsapp}`} className="text-kissa-pink hover:underline">{cafeInfo.phone}</a>
            </p>

            <div className="overflow-hidden rounded-kissa shadow-kissa">
              <SmartImage
                src="/images/interior.jpg"
                alt={locale === 'ru' ? 'Интерьер кофейни KISSA' : locale === 'kk' ? 'KISSA кофейнясының интерьері' : 'KISSA coffee shop interior'}
                className="h-40 w-full object-cover"
              />
            </div>
          </div>

          {/* Map card (2ГИС only) */}
          <div className="flex flex-col rounded-kissa-lg bg-white p-6 shadow-kissa-lg">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-kissa-lime text-kissa-green">
                <Navigation size={22} />
              </span>
              <div>
                <p className="font-display text-lg font-extrabold uppercase text-kissa-green">{t.contacts.howToFind}</p>
                <p className="text-sm text-kissa-olive">{cafeInfo.address[locale]}</p>
              </div>
            </div>

            <div className="mb-4 flex flex-1 items-center justify-center rounded-kissa bg-gradient-to-br from-kissa-pink-light via-kissa-lime to-kissa-pink-lighter p-6">
              <div className="text-center">
                <MapPin size={40} className="mx-auto text-kissa-pink" />
                <p className="mt-3 font-display text-sm font-extrabold uppercase text-kissa-green">
                  {cafeInfo.addressShort}
                </p>
                <p className="mt-1 text-xs text-kissa-olive">{locale === 'ru' ? 'Костанай, Казахстан' : locale === 'kk' ? 'Қостанай, Қазақстан' : 'Kostanay, Kazakhstan'}</p>
              </div>
            </div>

            <a
              href={cafeInfo.gis2Url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-kissa-green py-3.5 font-bold text-white shadow-kissa transition-transform hover:scale-105 active:scale-95"
            >
              <Navigation size={18} />
              {t.contacts.openIn2gis}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
