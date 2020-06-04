require('dotenv').config();
const Pinata = require('pinata-sdk');
const IPFS = require('ipfs');

const buildFolderName = 'build';
const buildFolderPath = `./${buildFolderName}`;

const minutesForNodeWarmUp = 3;

const pinata = Pinata.configure(
  process.env.PINATA_API_KEY,
  process.env.PINATA_SECRET_KEY
);

const node = new IPFS({
  config: {
    Addresses: {
      Swarm: [
        // expose the same tcp port as go-ipfs, it appears to perform better with those settings
        '/ip4/0.0.0.0/tcp/4001',
      ],
    },
  },
});

console.log('Waiting for IPFS node to be ready');

node.on('ready', () => {
  console.log(
    `Waiting for node to warm up, it will take ${minutesForNodeWarmUp} minute(s)`
  );

  setTimeout(() => {
    console.log('Node warmed up, adding & pinning build files');
    // Add the target build folder to IPFS
    node.addFromFs(
      buildFolderPath,
      { recursive: true },
      async (err, result) => {
        if (err) {
          throw err;
        }
        const buildFolderObject = result.filter(ipfsObject => {
          return ipfsObject.path === buildFolderName;
        })[0];

        const response = await Pinata.pinHashToIPFS(
          pinata,
          buildFolderObject.hash
        );
        // your content is now pinned on Pinata, our local IPFS node will shut down
        // but your content will still be accessible on the IPFS network
        node.stop(() =>
          console.log('Deployment successfull!', response.ipfsHash)
        );
      }
    );
  }, 1000 * 60 * minutesForNodeWarmUp);
});
