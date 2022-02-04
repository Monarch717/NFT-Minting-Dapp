export async function contractCall(web3, method, params) {
    const data = method.encodeABI();
    const {maxGas, txHash, receipt, error, from, to, value} = params;

    const gasPrice = await web3.eth.getGasPrice();
    const txObject = {
        from,
        to,
        gasPrice,
        data,
        value,
        gas: maxGas
    };

    let realGas = maxGas;
    try {
        realGas = await web3.eth.estimateGas(txObject);
        // put 2% more gas
        realGas = Math.round(realGas * 1.05);
    } catch (error) {
        console.log(error);
    }
    web3.eth.sendTransaction({...txObject, gas: realGas}).on('transactionHash', (value) => {
        if (txHash) {
            txHash(value);
        }
    })
        .on('receipt', (value) => {
            if (receipt) {
                receipt(value);
            }
        })
        .on('error', (value) => {
            if (error) {
                error(value);
            }
        });
}

export function subscribeEvent(web3, contract, eventName, eventCallback) {
    const evtintf = contract._jsonInterface.find(o => o.name === eventName && o.type === 'event');
    const subscription = web3.eth.subscribe('logs', {
        address: contract.options.address,
        topics: [evtintf.signature]
    }, (error, result) => {
        if (error){
            console.log(`Subscribe event error : ${error}`);
            eventCallback(error);
            return;
        }
        const eventObj = web3.eth.abi.decodeLog(
          evtintf.inputs,
          result.data,
          result.topics.slice(1)
        )
        console.log(`Subscribe event New ${eventName}!`, eventObj);
        eventCallback(undefined, eventObj);
    });
    return subscription;
}
