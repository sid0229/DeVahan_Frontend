import React, { useState } from 'react';
import { Wallet2, Car, History, Plus, Train as Transfer, X, User, Building2 } from 'lucide-react';

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isDealer, setIsDealer] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    email: string;
    wallet: string;
    type: 'user' | 'dealer';
  } | null>(null);

  const vehicles = [
    {
      name: "Toyota Camry",
      plate: "MH 01 AB 1234",
      wallet: "0x1234...5678"
    },
    {
      name: "Honda Civic",
      plate: "MH 02 CD 5678",
      wallet: "0x8765...4321"
    },
    {
      name: "Tesla Model 3",
      plate: "MH 03 EF 9012",
      wallet: "0x9876...0123"
    }
  ];

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    const email = (e.target as any).email.value;
    const wallet = (e.target as any).wallet.value;

    // Fake authentication logic
    if (isDealer && wallet === "678") {
      setCurrentUser({
        name: "Sid",
        email: email || "sid@dealer.com",
        wallet: "678",
        type: "dealer"
      });
      setIsAuthenticated(true);
    } else if (!isDealer && wallet === "123") {
      setCurrentUser({
        name: "Anmol",
        email: email || "anmol@user.com",
        wallet: "123",
        type: "user"
      });
      setIsAuthenticated(true);
    }
    setShowAuthModal(false);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen bg-primary text-white">
      {/* Header/Navbar */}
      <nav className="bg-primary-light border-b border-metallic/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center cursor-pointer" onClick={() => setCurrentPage('home')}>
              <Car className="w-8 h-8 text-gold" />
              <span className="ml-2 text-xl font-bold">DeVahan</span>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                {isAuthenticated && currentUser?.type === 'user' && (
                  <div onClick={() => setCurrentPage('vehicles')} className="cursor-pointer">
                    <NavLink icon={<Car />} text="My Vehicles" />
                  </div>
                )}
                {isAuthenticated && currentUser?.type === 'dealer' && (
                  <NavLink icon={<Plus />} text="Mint NFT" />
                )}
                <NavLink icon={<Transfer />} text="Transfer" />
                <NavLink icon={<History />} text="History" />
                {isAuthenticated ? (
                  <div className="flex items-center space-x-4">
                    <span className="text-metallic">
                      {currentUser?.name} ({currentUser?.type})
                    </span>
                    <button 
                      onClick={handleSignOut}
                      className="flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-warning to-warning-orange text-white font-semibold hover:opacity-90 transition-opacity"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setShowAuthModal(true)}
                    className="flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-gold to-gold-light text-primary font-semibold hover:opacity-90 transition-opacity"
                  >
                    <Wallet2 className="w-4 h-4 mr-2" />
                    Sign In / Sign Up
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-primary-light rounded-lg p-6 w-full max-w-md relative">
            <button 
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-metallic hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex justify-center space-x-4 mb-6">
              <button 
                onClick={() => setIsDealer(false)}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${!isDealer ? 'bg-gold text-primary' : 'text-metallic hover:text-white'}`}
              >
                <User className="w-4 h-4 mr-2" />
                User
              </button>
              <button 
                onClick={() => setIsDealer(true)}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${isDealer ? 'bg-gold text-primary' : 'text-metallic hover:text-white'}`}
              >
                <Building2 className="w-4 h-4 mr-2" />
                Dealer
              </button>
            </div>

            <div className="flex justify-center space-x-4 mb-6">
              <button 
                onClick={() => setIsSignIn(true)}
                className={`px-4 py-2 rounded-lg transition-colors ${isSignIn ? 'bg-neon-blue text-primary' : 'text-metallic hover:text-white'}`}
              >
                Sign In
              </button>
              <button 
                onClick={() => setIsSignIn(false)}
                className={`px-4 py-2 rounded-lg transition-colors ${!isSignIn ? 'bg-neon-blue text-primary' : 'text-metallic hover:text-white'}`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSignIn} className="space-y-4">
              {!isSignIn && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-metallic mb-1">Name</label>
                    <input 
                      type="text" 
                      name="name"
                      className="w-full px-3 py-2 bg-primary border border-metallic/20 rounded-lg focus:outline-none focus:border-gold text-white"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-metallic mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      className="w-full px-3 py-2 bg-primary border border-metallic/20 rounded-lg focus:outline-none focus:border-gold text-white"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-metallic mb-1">Home Address</label>
                    <textarea 
                      name="address"
                      className="w-full px-3 py-2 bg-primary border border-metallic/20 rounded-lg focus:outline-none focus:border-gold text-white"
                      placeholder="Enter your address"
                      rows={3}
                    />
                  </div>
                </>
              )}
              <div>
                <label className="block text-sm font-medium text-metallic mb-1">Email</label>
                <input 
                  type="email" 
                  name="email"
                  className="w-full px-3 py-2 bg-primary border border-metallic/20 rounded-lg focus:outline-none focus:border-gold text-white"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-metallic mb-1">Wallet Address</label>
                <input 
                  type="text" 
                  name="wallet"
                  className="w-full px-3 py-2 bg-primary border border-metallic/20 rounded-lg focus:outline-none focus:border-gold text-white"
                  placeholder="Enter your wallet address"
                />
              </div>
              {!isSignIn && isDealer && (
                <div>
                  <label className="block text-sm font-medium text-metallic mb-1">Dealer ID</label>
                  <input 
                    type="text" 
                    name="dealerId"
                    className="w-full px-3 py-2 bg-primary border border-metallic/20 rounded-lg focus:outline-none focus:border-gold text-white"
                    placeholder="Enter your dealer ID"
                  />
                </div>
              )}
              <button 
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-neon-blue to-neon-green text-primary font-bold hover:opacity-90 transition-opacity"
              >
                {isSignIn ? "Sign In" : (isDealer ? "Register as Dealer" : "Sign Up")}
              </button>
              {isSignIn && (
                <p className="text-sm text-metallic text-center mt-2">
                  {isDealer ? "Demo Dealer: wallet 678" : "Demo User: wallet 123"}
                </p>
              )}
            </form>
          </div>
        </div>
      )}

      {currentPage === 'home' ? (
        <>
          {/* Hero Section */}
          <div className="relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
              <div className="text-center">
                <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
                  <span className="block">The Future of</span>
                  <span className="block text-gold">Vehicle Ownership</span>
                </h1>
                <p className="mt-3 max-w-md mx-auto text-base text-metallic sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                  Secure, transparent, and efficient vehicle ownership management powered by blockchain technology.
                </p>
                <div className="mt-10 flex justify-center gap-4">
                  <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-neon-blue to-neon-green text-primary font-bold hover:opacity-90 transition-opacity">
                    Get Started
                  </button>
                  <button className="px-8 py-3 rounded-lg border-2 border-metallic/50 hover:border-metallic transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
            
            {/* Background Effect */}
            <div className="absolute inset-0 -z-10 bg-gradient-radial from-primary-light to-primary" />
            <div className="absolute inset-0 -z-10 opacity-30 bg-[radial-gradient(#FFD700_1px,transparent_1px)] [background-size:16px_16px]" />
          </div>

          {/* Features Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                title="Secure Ownership"
                description="Blockchain-backed vehicle ownership records that cannot be tampered with."
                icon={<Wallet2 className="w-8 h-8 text-gold" />}
              />
              <FeatureCard
                title="Instant Transfers"
                description="Transfer vehicle ownership securely and instantly with smart contracts."
                icon={<Transfer className="w-8 h-8 text-gold" />}
              />
              <FeatureCard
                title="Complete History"
                description="Access the complete ownership and maintenance history of any vehicle."
                icon={<History className="w-8 h-8 text-gold" />}
              />
            </div>
          </div>
        </>
      ) : (
        // Vehicles Page
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold mb-8">My Vehicles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle, index) => (
              <div key={index} className="bg-primary-light rounded-lg p-6 border border-metallic/20">
                <div className="flex items-center mb-4">
                  <Car className="w-6 h-6 text-gold mr-3" />
                  <h3 className="text-xl font-semibold">{vehicle.name}</h3>
                </div>
                <div className="space-y-2 text-metallic">
                  <p>Plate Number: <span className="text-white">{vehicle.plate}</span></p>
                  <p>Wallet: <span className="text-white">{vehicle.wallet}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function NavLink({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <a href="#" className="flex items-center px-3 py-2 rounded-md text-metallic hover:text-white hover:bg-primary-light transition-colors">
      {React.cloneElement(icon as React.ReactElement, { className: 'w-4 h-4 mr-2' })}
      {text}
    </a>
  );
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="p-6 rounded-lg bg-primary-light border border-metallic/20 hover:border-metallic/40 transition-colors">
      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-metallic">{description}</p>
    </div>
  );
}

export default App;