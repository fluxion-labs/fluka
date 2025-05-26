import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Button } from '@/components/ui/button'
import { useContractWrite, useSwitchNetwork } from 'wagmi'
import { ReloadIcon } from '@radix-ui/react-icons'
import { Send } from 'lucide-react'
import { RewardABI } from './abi'
import axios from "axios";
import { useCallback } from 'react'

const functionName = 'claimAll'

async function getRewards(endpoint: string, nft: string, address: string) {
  try {
    const response = await axios.post(`${endpoint}/api/v1/rewards`, {
      nft,
      address,
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    console.log('Response:', response.data);
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
}

export interface ClaimBtnProps {
  chainId: number,
  contractAddress: `0x${string}`
  endpoint: string
  nft: string,
  address: string
}

export default function ClaimBtn({ contractAddress, endpoint, chainId, nft, address }: ClaimBtnProps) {
  const { switchNetwork } = useSwitchNetwork()

  const { write, isLoading } = useContractWrite({
    address: contractAddress,
    abi: RewardABI,
    functionName: functionName,
    args: [],
    chainId: chainId,
    onSettled(data, error) {
      if (error) {
        console.log(error)
      }

      return console.log({
        type: 'WRITE',
        functionName,
        chainId: chainId,
        address: contractAddress,
        txHash: data && data.hash,
      })
    },
  })

  const handleWriteClick = useCallback(async () => {
    // const data = await getRewards('0x381a23321ed62e0763c7d974fcffc63cc11231a0', '0x350596b8fbba7f08c8931015999c5d0ca1c26ba4')
    const rewardRes = await getRewards(endpoint, nft, address)
    console.log('Data:', rewardRes);

    const {
      tokens,
      amounts,
      deadline,
      nonce,
      signature: { v, s, r },
    } = rewardRes.data

    write({
      args: [nft, tokens, address, amounts, deadline, nonce, v, r, s],
    })
  }, [endpoint, nft, address, write])

  const handleSwitchNetwork = () => {
    switchNetwork?.(chainId)
  }

  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted }) => {
        const ready = mounted
        const connected = ready && account && chain
        console.log({ connected, chain })

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button size="sm" onClick={openConnectModal}>
                    Connect Wallet
                  </Button>
                )
              }

              if (chain.id !== chainId) {
                return (
                  <Button size="sm" onClick={handleSwitchNetwork}>
                    Switch Network
                  </Button>
                )
              }

              return (
                <Button size="sm" onClick={handleWriteClick}>
                  {isLoading ? (
                    <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  Write
                </Button>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}
