import { useWeb3 } from '@3rdweb/hooks';

const App = () => {
  const { connectWallet, address } = useWeb3();
  if (!address) {
    return (
      <div className='landing'>
        <h1>The HealthCareDAO</h1>
        <button onClick={() => connectWallet('injected')} className='btn-hero'>
          Connect with MetaMask
        </button>
      </div>
    );
  }

  console.log('Connected to Address:', address);
  return (
    <div className='landing'>
      <h1>MetaMask Wallet connected!</h1>
    </div>
  );
};

export default App;
