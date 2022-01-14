import { useWeb3 } from '@3rdweb/hooks';
import { ThirdwebSDK } from '@3rdweb/sdk';
import { useEffect, useState } from 'react';

const sdk = new ThirdwebSDK('rinkeby');

const bundleDropModule = sdk.getBundleDropModule(
  '0xE42C8be6a3AdAa6C934255aaeF0ca804175173CD'
);

const App = () => {
  const { connectWallet, address, provider } = useWeb3();
  const signer = provider ? provider.getSigner() : undefined;

  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);

  useEffect(() => {
    sdk.setProviderOrSigner(signer);
  }, [signer]);

  useEffect(() => {
    if (!address) {
      return;
    }

    return bundleDropModule
      .balanceOf(address, '0')
      .then((balance) => {
        if (balance.gt(0)) {
          setHasClaimedNFT(true);
          console.log('User has a Membership NFT!');
        } else {
          setHasClaimedNFT(false);
          console.log('User has no Membership NFT');
        }
      })
      .catch((error) => {
        setHasClaimedNFT(false);
        console.error('Failed to read NFT balance', error);
      });
  }, [address]);

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

  if (hasClaimedNFT) {
    return (
      <div className='member-page'>
        <h1>HealthCareDAO Member Page</h1>
        <p>Congratulations on being a member</p>
      </div>
    );
  }

  const mintNFT = () => {
    setIsClaiming(true);
    bundleDropModule
      .claim('0', 1)
      .then(() => {
        setHasClaimedNFT(true);
        console.log(
          `Successfully Minted! Check it our on OpenSea: https://testnets.opensea.io/assets/${bundleDropModule.address}/0`
        );
      })
      .catch((error) => console.error('Failed to claim NFT', error))
      .finally(() => {
        setIsClaiming(false);
      });
  };

  console.log('Connected to Address:', address);
  return (
    <div className='mint-nft'>
      <h1>Mint your HealthCareDAO Membership NFT</h1>
      <button disabled={isClaiming} onClick={() => mintNFT()}>
        {isClaiming ? 'Minting...' : 'Mint your nft (FREE)'}
      </button>
    </div>
  );
};

export default App;
