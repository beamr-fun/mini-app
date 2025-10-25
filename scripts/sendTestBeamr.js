const { connect, connectors } = useConnect();
const { data: walletClient } = useWalletClient();

const sendAddress5000Tokens = () => {
  if (!walletClient) return;

  connect({ connector: connectors[0] });

  walletClient.writeContract({
    address: ADDR.SUPER_TOKEN,
    abi: erc20Abi,
    functionName: 'transfer',
    args: ['0xa73b38F7948eA24D77D1E4BE0EFf89E10FdF96B1', parseEther('5000')],
  });
};
