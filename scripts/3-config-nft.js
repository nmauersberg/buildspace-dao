import sdk from './1-initialize-sdk.js';
import { readFileSync } from 'fs';

const bundleDrop = sdk.getBundleDropModule(
  '0xE42C8be6a3AdAa6C934255aaeF0ca804175173CD'
);

// Second Drop deployed
// 0xd0a1ab8C446fc801B1db44EDB315b275F62f76B4

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: 'HealthCare access token',
        description:
          'This NFT will give you access to the HealthCareDAO and all associated services.',
        image: readFileSync('scripts/assets/AccessToken.png'),
      },
    ]);
    console.log('Successfully created a new NFT in the drop!');
  } catch (error) {
    console.error('failed to create the new NFT', error);
  }
})();
