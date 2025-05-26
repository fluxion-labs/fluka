import ClaimBtn, { ClaimBtnProps } from './claimBtn'

const Configs: (ClaimBtnProps & { title: string })[] = [
  {
    title: "Testnet",
    endpoint: "https://dev-api.bsc.coresale.lfg.inc",
    nft: "0x381a23321ed62e0763c7d974fcffc63cc11231a0",
    contractAddress: "0x77aC2C09AADaA09bE5dD0e99eb3430698f33dFE3",
    address: "0x350596b8fbba7f08c8931015999c5d0ca1c26ba4",
    chainId: 97
  },
  {
    title: "Mainnet",
    endpoint: "https://prod-api.bsc.coresale.lfg.inc",
    nft: "0x381a23321ed62e0763c7d974fcffc63cc11231a0", //TODO: Update address
    contractAddress: "0x77aC2C09AADaA09bE5dD0e99eb3430698f33dFE3", //TODO: Update address
    address: "0x350596b8fbba7f08c8931015999c5d0ca1c26ba4", //TODO: Update address
    chainId: 56
  }
]

export default function Helix() {
  return (
    <div className='p-4 flex justify-between flex-col gap-4'>
      <p className='text-2xl'>Helix Unallocated Fund Claiming</p>
      {
        Configs.map((cfg) => (
          <div className='flex justify-between'>
            <p className='text-lg'>{cfg.title}</p>
            <ClaimBtn chainId={cfg.chainId} contractAddress={cfg.contractAddress} endpoint={cfg.endpoint} nft={cfg.nft} address={cfg.address} />
          </div>
        ))
      }
    </div>
  )
}
