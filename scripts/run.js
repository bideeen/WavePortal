const main = async () => {
    // const [owner, randomPerson] = await hre.ethers.getSigners();
    // In order to deploy something to the blockchain,
    //  we need to have a wallet address! Hardhat does this for us
    //  magically in the background, but here I grabbed the wallet address
    //  of contract owner and I also grabbed a random wallet address and 
    // called it randomPerson. This will make more sense in a moment.
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    // This will actually compile our contract and generate the necessary
    //  files we need to work with our contract under the artifacts 
    // directory. Go check it out after you run this :).
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.1"),
    });
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
    // console.log("Contract deployed to:", waveContract.address);
    // Finally, once it's deployed waveContract.address  will basically
    //  give us the address of the deployed contract. This address is
    //  how we can actually find our contract on the blockchain. 
    // There are millions of contracts on the actual blockchain. 
    // So, this address gives us easy access to the contract we're 
    // interested in working with! This will be more important a bit latercls
    //  once we deploy to a real Ethereum network.
    console.log("Contract addy:", waveContract.address);
    // I'm doing this just to see the address of the person 
    // deploying our contract. I'm curious!


    /*
   * Get Contract balance
   */
    let contractBalance = await hre.ethers.provider.getBalance(
        waveContract.address
    );
    console.log(
        "Current balance:",
        hre.ethers.utils.formatEther(contractBalance)
    );
    
    // let waveCount;
    // waveCount = await waveContract.getTotalWaves();
    // console.log(waveCount.toNumber());

    /**
   * Let's send a few waves!
   */
    const waveTxn = await waveContract.wave("This is wave #1!")
    await waveTxn.wait() // Wait for the transaction to be mined
    
    const waveTxn2 = await waveContract.wave("This is wave #2!")
    await waveTxn2.wait() // Wait for the transaction to be mined
    
    // const [_, randomPerson] = await hre.ethers.getSigners();
    // waveTxn = await waveContract.connect(randomPerson).wave("Another message!");
    // await waveTxn.wait() // Wait for the transaction to be mined

    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(
        "Contract balance:",
        hre.ethers.utils.formatEther(contractBalance)
    );

    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);
    // waveCount = await waveContract.getTotalWaves();
    // Basically, we need to manually call our functions! 
    // Just like we would any normal API. 
    // First I call the function to grab the # of total waves. 
    // Then, I do the wave. 
    // Finally, I grab the waveCount one more time to see if it changed.
    // waveTxn = await waveContract.connect(randomPerson).wave();
    // await waveTxn.wait()

    // waveCount = await waveContract.getTotalWaves();
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