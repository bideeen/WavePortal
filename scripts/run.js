const main = async () => {
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    // This will actually compile our contract and generate the necessary
    //  files we need to work with our contract under the artifacts 
    // directory. Go check it out after you run this :).
    const waveContract = await waveContractFactory.deploy();
    // This is pretty fancy :). 
    // What's happening here is Hardhat will create a local Ethereum
    //  network for us, but just for this contract. 
    // Then, after the script completes it'll destroy that local network. 
    // So, every time you run the contract, it'll be a fresh blockchain. 
    // What's the point? It's kinda like refreshing your local server 
    // every time so you always start from a clean slate which makes 
    // it easy to debug errors.
    await waveContract.deployed();
    // We'll wait until our contract is officially deployed to our local 
    // blockchain! Our constructor runs when we actually deploy.
    console.log("Contract deployed to:", waveContract.address);
    // Finally, once it's deployed waveContract.address  will basically
    //  give us the address of the deployed contract. This address is
    //  how we can actually find our contract on the blockchain. 
    // There are millions of contracts on the actual blockchain. 
    // So, this address gives us easy access to the contract we're 
    // interested in working with! This will be more important a bit later
    //  once we deploy to a real Ethereum network.
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);  // exit Node process without error
    } catch (error) {
        console.log(error);
        process.exit(1); // exit Node process while indicating "Uncaught Fatal Exception" error
    }
    // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
};

runMain();