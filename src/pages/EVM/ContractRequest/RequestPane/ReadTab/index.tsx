import { useMemo } from 'react'

import { EVMContract } from '@/store/collections'

import ReadMethod from './ReadMethod'
import { parseSc } from '@/utils/abi'

export default function ReadTab({ smartContract }: { smartContract: EVMContract }) {
  const readableMethods = useMemo(() => {
    const [address, methods] = parseSc(smartContract);

    const infoMethods = methods.filter(
      (method) => method.inputs?.length > 0 && (method.stateMutability === 'view' || method.stateMutability === 'pure'),
    )

    return infoMethods.map((method) => {
      return {
        address,
        abi: infoMethods,
        functionName: method.name,
      }
    })
  }, [smartContract.contract.abi, smartContract.contract.address])

  return (
    <div className="flex flex-col w-full gap-2">
      {readableMethods.length === 0 && (
        <div className="text-center underline my-2">
          <p>No readable methods found for this contract.</p>
          <p>Please use another tab to interact with the contract.</p>
        </div>
      )}
      {readableMethods.map((method, idx) => {
        return (
          <ReadMethod
            key={method.functionName}
            chainId={smartContract.chainId}
            contractAddress={method.address}
            functionName={method.functionName}
            abi={method.abi[idx]}
          />
        )
      })}
    </div>
  )
}
