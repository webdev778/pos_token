// let / await requires node 7.6+ 
const helper = require("./timeTestHelper.js");
const BITTO = artifacts.require("BITTO.sol");

contract("Bussiness Logic Test", async (accounts) => {
  let contract;

  beforeEach(async function() {
    contract = await BITTO.deployed(); 
    console.log('-----------Contract Deployed------------------');
    let last_block = await web3.eth.getBlock('latest')
    console.log(last_block.timestamp);
    //await contract.ownerSetStakeStartTime(last_block.timestamp);

    // travel time to 9.18
    await helper.advanceTimeAndBlock(5 * 24 * 3600);    
    console.log(`virtually set 9.18`);
    last_block = await web3.eth.getBlock('latest')
    console.log(`Current Time: ${formatedTime(last_block.timestamp)}`);

    console.log('////////////////////////////////////////////////////////////');
    console.log('Min Staking Days : 10 days')
    console.log('Max Staking Days : 180 days')
    console.log('Start Staking Time : 2018.09.18 00:00:00(Timestampe : 1537228800)');
    console.log('----------------------Interest Info-------------------------');
    console.log('Stage 1: 2018.09.18 00:00:00 ~ 2019.03.17 00:00:00 (180 days) : 65%');
    console.log('Stage 2: 2019.03.17 00:00:00 ~ 2019.09.13 00:00:00 (180 days) : 34%');
    console.log('Stage 3: 2019.09.13 00:00:00 ~ 2020.03.11 00:00:00 (180 days) : 20%');
    console.log('Stage 4: 2020.03.11 00:00:00 ~ 2020.09.07 00:00:00 (180 days) : 13.4%');
    console.log('Stage 5: 2020.09.07 00:00:00 ~                     (    days) : 13.4%');
  });

  // it ("Get Total Supply", async() =>{
  //   let totalSupply = await contract.totalSupply();  
  //   console.log(`totalSupply:${web3.fromWei(totalSupply)}`) 
  //   assert.equal(web3.fromWei(totalSupply), 17300000, "Unexpected Total Initial Supply");

  // });

  /*
  it ("Reward Calc", async() =>{
    let stakerA=accounts[1], stakerB = accounts[2]
    let mA = 6000, mB = 20000;
    await contract.transfer(stakerA, web3.toWei(''+mA, 'ether'));
    await contract.transfer(stakerB, web3.toWei(''+mB, 'ether'));
    await helper.advanceTimeAndBlock(16 * 24 * 3600);    
        console.log('aaa');

    const balA =  await contract.balanceOf(stakerA);
    const balB =  await contract.balanceOf(stakerB);
    console.log("stakerA:"+web3.fromWei(balA) +" stakerB:" + web3.fromWei(balB));

    console.log('-----------16days later------------------');
    let last_block = await web3.eth.getBlock('latest')
    console.log(last_block.timestamp);

    //get coin age
    const age1 = await contract.coinAge({from: stakerA});
    const age2 = await contract.coinAge({from: stakerB});
    console.log(`CoinAge1:${age1}, CoinAge2:${age2}`);
    try
    {
      let result = await contract.mint({from: stakerA});  
      let result1 = await contract.mint({from: stakerB});  
    }catch (e){
        console.log(e);
    }

    const balA1 =  await contract.balanceOf(stakerA);
    const balB1 =  await contract.balanceOf(stakerB);
    console.log("stakerA:"+web3.fromWei(balA1) +" stakerB:" + web3.fromWei(balB1));
    assert.notEqual(balA1, balB1, "Unexpected Total Initial Supply");

  });
  */

  /*
  it ("Get Period Number", async() =>{
    // Print Start CoinAge Time
    let last_block = await web3.eth.getBlock('latest')
    console.log(`Start CoinAge: ${formatedTime(last_block.timestamp)}`);

    const result = await contract.getPeriodNumber(last_block.timestamp);
    console.log(`Current Period : ${result} `)

    // travel time
    for(let i = 1; i < 5; i ++){
      await helper.advanceTimeAndBlock(180 * 24 * 3600);    
      last_block = await web3.eth.getBlock('latest')
      console.log(`Current Time: ${formatedTime(last_block.timestamp)}, Timestamp = ${last_block.timestamp}`);

      const result1 = await contract.getPeriodNumber(last_block.timestamp);
      console.log(`Current Period : ${result1} `)
    }
    assert.equal(result, 0, "Unexpected Period Number");
  });
  */

/*    
  it ("Annual Interest", async() =>{
    // Print Start CoinAge Time
    let last_block = await web3.eth.getBlock('latest')
    console.log(`Start CoinAge: ${formatedTime(last_block.timestamp)}`);

    const result = await contract.getPeriodNumber(last_block.timestamp);
    console.log(`Current Period : ${result} `)

    // travel time
    for(let i = 1; i < 5; i ++){
      last_block = await web3.eth.getBlock('latest')
      console.log(`Current Time: ${formatedTime(last_block.timestamp)}, Timestamp = ${last_block.timestamp}`);

      const result1 = await contract.annualInterest();
      console.log(`Period Interest : ${web3.fromWei(result1)} `)

      await helper.advanceTimeAndBlock(180 * 24 * 3600);    
    }
    assert.equal(result, 0, "Unexpected Period Number");
  });

*/

it ("Scenario 2 Test", async() =>{
  let staker = accounts[3];
  let staking_days1=180, staking_days2 = 100;
  let m = 25000;

  console.log('');
  console.log('Scenario 2 Test Starting...');
  // Transfer
  console.log(`Transfering ${m} to the address ${staker}...`);
  await contract.transfer(staker, web3.toWei(''+m, 'ether'));
  console.log(`Successfully transfered`);

  // Get Balance
  const bal =  await contract.balanceOf(staker);
  console.log(`Current Balance: ${web3.fromWei(bal)}`);


  // Print Start CoinAge Time
  let last_block = await web3.eth.getBlock('latest')
  console.log(`Start CoinAge: ${formatedTime(last_block.timestamp)}`);
  
  // travel time 
  await helper.advanceTimeAndBlock(staking_days1 * 24 * 3600);    
  console.log(`Staking Days: ${staking_days1}days `);
  last_block = await web3.eth.getBlock('latest')
  console.log(`Current Time: ${formatedTime(last_block.timestamp)}`);
  
  // Get Period
  let period = await contract.getPeriodNumber(last_block.timestamp);
  // console.log(`Current Period : ${parseInt(period)+1} `)
  const pid = parseInt(period);

  
  console.log('---------------- CoinAge---------------');
  for (let i = 0; i < pid+1; i ++){
    let coinAge = await contract.getCoinAgeofPeriod(staker, i, last_block.timestamp);
    if(coinAge == 0) continue;
    console.log(`Stage 1 ${i+1}: ${coinAge/m} * ${m} = ${coinAge}`);
  }
  console.log('---------------- CoinAge---------------');
  

  // Get Pos Reward 
  let reward = await contract.getProofOfStakeReward(staker); 
  console.log(`Pos Reward: ${web3.fromWei(reward)}`);

  // Claim
  let result1 = await contract.mint({from: staker}); 

  // Print Start CoinAge Time
  last_block = await web3.eth.getBlock('latest')
  console.log(`Mint: ${formatedTime(last_block.timestamp)}`);

  // Get Balance
  const balNew =  await contract.balanceOf(staker);
  console.log(`New balance after mint: ${web3.fromWei(balNew)}`);
  assert.notEqual(balNew, bal+reward, "Unexpected Pos Reward calculation");

  console.log(`----------------------------------------------------------`);
  console.log(`----------------------------------------------------------`);

  // travel time 
  await helper.advanceTimeAndBlock(staking_days2 * 24 * 3600);    
  console.log(`Staking Days: ${staking_days2}days `);
  last_block = await web3.eth.getBlock('latest')
  console.log(`Current Time: ${formatedTime(last_block.timestamp)}`);
  
  // Get Period
  period = await contract.getPeriodNumber(last_block.timestamp);
  // console.log(`Current Period : ${period+1} `)
  const pid1 = parseInt(period);

  console.log('---------------- CoinAge---------------');
  for (i = 0; i < pid1+1; i ++){
    let coinAge1 = await contract.getCoinAgeofPeriod(staker, i, last_block.timestamp);
    if(coinAge1 == 0) continue;
    console.log(`Period ${i}: ${coinAge1/web3.fromWei(balNew)} * ${web3.fromWei(balNew)} = ${coinAge1}`);
  }
  console.log('---------------- CoinAge---------------');


  // Get Pos Reward 
  let reward1 = await contract.getProofOfStakeReward(staker); 
  console.log(`Pos Reward: ${web3.fromWei(reward1)}`);

  // Claim
  let result2 = await contract.mint({from: staker}); 

  // Print Start CoinAge Time
  last_block = await web3.eth.getBlock('latest')
  console.log(`Mint: ${formatedTime(last_block.timestamp)}`);

  // Get Balance
  const balNew1 =  await contract.balanceOf(staker);
  console.log(`New balance after mint: ${web3.fromWei(balNew1)}`);
  assert.notEqual(balNew, bal+reward, "Unexpected Pos Reward calculation");
});


/*
  it ("Scenario Test", async() =>{
    let staker = accounts[3];
    let staking_days = 365;
    let m = 25000;

    // Transfer
    console.log(`Transfering ${m} to the address ${staker}...`);
    await contract.transfer(staker, web3.toWei(''+m, 'ether'));
    console.log(`Successfully transfered`);

    // Get Balance
    const bal =  await contract.balanceOf(staker);
    console.log(`Current Balance: ${web3.fromWei(bal)}`);


    // Print Start CoinAge Time
    let last_block = await web3.eth.getBlock('latest')
    console.log(`Start CoinAge: ${formatedTime(last_block.timestamp)}`);
    
    // travel time 
    await helper.advanceTimeAndBlock(staking_days * 24 * 3600);    
    console.log(`${staking_days}days virtually passed`);
    last_block = await web3.eth.getBlock('latest')
    console.log(`Current Time: ${formatedTime(last_block.timestamp)}`);
    
    // Get Pos Reward 
    let reward = await contract.getProofOfStakeReward(staker); 
    console.log(`Pos Reward: ${web3.fromWei(reward)}`);

    // Claim
    let result1 = await contract.mint({from: staker}); 

    // Get Balance
    const balNew =  await contract.balanceOf(staker);
    console.log(`New balance after mint: ${web3.fromWei(balNew)}`);
    assert.notEqual(balNew, bal+reward, "Unexpected Pos Reward calculation");
  });
  */


  // it ("changes the country name",  async() =>{
  //   await contract.changeCountryName(1, "Czechia");
  //   let country = await contract.viewCountry(1);
  //   assert.equal(country[1], "Czechia", "Unexpected country name after change");
  // });

  // it ("adds two animals",  async() =>{
  //   await contract.addAnimal("Wolf", 1, 10);
  //   await contract.addAnimal("Dog", 1, 10);

  //   let animal = await contract.viewAnimal(1);   
  //   assert.equal(animal[1], "Wolf", "Unexpected animal name");

  //   let animal2 = await contract.viewAnimal(2); 
  //   assert.equal(animal2[1], "Dog", "Unexpected animal name");
  // });

  // it ("pull country name from added animal",  async() =>{
  //   let animal = await contract.viewAnimal(1); 
  //   var countryOfOrigin = animal[4];

  //   country = await contract.viewCountry(countryOfOrigin);
  //   assert.equal(country[1], "Czechia", "Unexpected country name from animal");
  // });

  // it ("starts buying animals",  async() =>{ 
  //   // empty on purpose to increase test readability    
  // });

  // it ("buys first animal for acc one",  async() =>{
  //   logAddressBalances();
  //   await contract.buyAnimal(1, { from: web3.eth.accounts[1], value: web3.toWei(1, "ether"), gasPrice: 3000000000});
  //   let animal = await contract.viewAnimal(1); 
  //   assert.equal(animal[3], web3.eth.accounts[1], "Animal owner is not acc 1");  
  // });

  // it ("checks contract balance (should be 0.00005)",  async() =>{
  //   // 5% from 0.001
  //   let contract = await BITTO.deployed();   
  //   assert.equal(getAddressBalance(contract.address), 0.00005, "Unexpected contract balance");
  // });

  // it ("buys first animal for acc two (outbidding previous owner)",  async() =>{    
  //   logAddressBalances();
  //   await contract.buyAnimal(1, { from: web3.eth.accounts[2], value: web3.toWei(1, "ether"), gasPrice: 3000000000});
  //   let animal = await contract.viewAnimal(1); 
  //   assert.equal(animal[3], web3.eth.accounts[2], "Animal owner is not acc 1");  
  // });

  // it ("checks contract balance (should be 0.00015)",  async() =>{
  //   // 5% from 0.002 (This animal was already bought, its price raises 2x) + previous balance of 0.00005
  //   assert.equal(getAddressBalance(contract.address), 0.00015, "Unexpected contract balance");
  // });

  // it ("buys second animal for acc two",  async() =>{    
  //   logAddressBalances();
  //   await contract.buyAnimal(2, { from: web3.eth.accounts[2], value: web3.toWei(1, "ether"), gasPrice: 3000000000});
  //   let animal = await contract.viewAnimal(2); 
  //   assert.equal(animal[3], web3.eth.accounts[2], "Animal owner is not acc 1");  
  // });

  // it ("checks contract balance (should be 0.0002)",  async() =>{
  //   // 5% from 0.001 (buying animal as a first owner) + previous balance of 0.00015
  //   assert.equal(getAddressBalance(contract.address), 0.0002, "Unexpected contract balance");
  // });

  // it ("checks acc 1 DNAs - it should have 1 DNA card with id 1",  async() =>{
  //   let dnas = await contract.viewAllPlayersDNAs(web3.eth.accounts[1]);
  //   assert.equal(dnas.length, 1, "Unexpected DNA length");
  //   assert.equal(dnas[0], 1, "Unexpected animal id");
  // });

  // it ("checks acc 1 animals - it should have no animal card",  async() =>{
  //   let animals = await contract.viewAllPlayersAnimals(web3.eth.accounts[1]);
  //   assert.equal(animals.length, 0, "Unexpected DNA length");
  // });

  // it ("checks acc 2 DNAs - it should have 2 DNA cards with IDs 2 and 3",  async() =>{
  //   let dnas = await contract.viewAllPlayersDNAs(web3.eth.accounts[2]);
  //   assert.equal(dnas.length, 2, "Unexpected DNA length");
  //   assert.equal(dnas[0], 2, "Unexpected animal id");
  //   assert.equal(dnas[1], 3, "Unexpected animal id");
  // });

  // it ("checks acc 2 animals - it should have 2 animal cards with IDs 1 and 2",  async() =>{
  //   let animals = await contract.viewAllPlayersAnimals(web3.eth.accounts[2]);
  //   assert.equal(animals.length, 2, "Unexpected DNA length");
  //   assert.equal(animals[0], 1, "Unexpected animal id");
  //   assert.equal(animals[1], 2, "Unexpected animal id");
  //   console.log("Final contract balance: " + getAddressBalance(contract.address));
  // });

  // it ("checks number of countries",  async() =>{
  //   let countriesCount = await contract.viewCountriesCount();
  //   assert.equal(countriesCount.toString(), "1", "Unexpected number of countries"); // Solidity returns BigNumber => BigNumber.toString()
  // });

  // it ("checks number of animals",  async() =>{
  //   let animalsCount = await contract.viewAnimalsCount();
  //   assert.equal(animalsCount.toString(), "2", "Unexpected number of animals"); // Solidity returns BigNumber => BigNumber.toString()
  // });


})

function logAddressBalances(){
  console.log("Address No. 1 balance:" + getAddressBalance(web3.eth.accounts[1]));
  console.log("Address No. 2 balance:" + getAddressBalance(web3.eth.accounts[2]));
}

function getAddressBalance(address) {
  return web3.fromWei(web3.eth.getBalance(address).toNumber());
}

const formatedTime = (timestamp) => new Date(timestamp*1000).toLocaleString("en-US");