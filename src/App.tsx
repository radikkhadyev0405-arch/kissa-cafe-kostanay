import { I18nProvider } from './context/I18nContext';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ComboBanner } from './components/ComboBanner';
import { DrinksMenu } from './components/DrinksMenu';
import { BowlBuilder } from './components/BowlBuilder';
import { Sandwiches } from './components/Sandwiches';
import { Contacts } from './components/Contacts';
import { Footer } from './components/Footer';
import { Cart } from './components/Cart';

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-kissa-cream font-body text-kissa-green">
        <Header />
        <main>
          <Hero />
          <ComboBanner />
          <DrinksMenu />
          <BowlBuilder />
          <Sandwiches />
          <Contacts />
        </main>
        <Footer />
        <Cart />
      </div>
    </CartProvider>
  );
}

export default App;
