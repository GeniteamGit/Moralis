const contractProcessor = useWeb3ExecuteFunction();
await contractProcessor.fetch({
    params: options,
    onSuccess: async (data) => {
        console.log(data);
        const results = await data.wait();
        console.log(results);
        setLoading(null);
        await Swal.fire({
            title: 'Minted!',
            text: 'Transaction Successful',
            icon: 'success',
            confirmButtonText: 'Okay',
            confirmButtonColor: '#198754'
        })
        setNftSold(nftSold + 1);
        setNftRemaining(nftRemaining - 1);
    },
    onComplete: (data) => {
        console.log("complete")
        console.log(data);
    },
    onError: (e) => {
        if (e.code === 4001) {
            Swal.fire({
                title: 'Error!',
                text: 'User Denied Transaction',
                icon: 'error',
                confirmButtonText: 'Close',
                confirmButtonColor: '#F27474'
            })
        }
        const parsedError = JSON.parse(JSON.stringify(e)).error;
        if (parsedError.code === -32603) {
            Swal.fire({
                title: 'Error!',
                text: parsedError.message.slice(19),
                icon: 'error',
                confirmButtonText: 'Close',
                confirmButtonColor: '#F27474'
            })
        }
        console.log(e);
        setLoading(null)
    }
})


