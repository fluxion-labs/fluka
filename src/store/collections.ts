import { UUID } from 'crypto'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { findItemInCollections, removeItemInCollection } from '@/utils/collections'

export enum EVMItemType {
  Collection = 'collection',
  SmartContract = 'smart-contract',
  Folder = 'folder',
}

export interface EVMContract {
  id: UUID
  name: string
  type: EVMItemType.SmartContract
  chainId?: number
  contract: {
    address?: string
    abi?: string
  }
}

export interface EVMFolder {
  id: UUID
  name: string
  type: EVMItemType.Folder
  isOpen: boolean
  items: (EVMContract | EVMFolder)[]
}

export interface EVMCollection {
  id: UUID
  name: string
  type: EVMItemType.Collection
  isOpen: boolean
  items: (EVMContract | EVMFolder)[]
}

export interface EVMABIMethod {
  type: string
  name: string
  inputs: EVMABIMethodInputsOutputs[]
  outputs: EVMABIMethodInputsOutputs[]
  stateMutability?: string
  anonymous?: boolean
}

export interface EVMABIMethodInputsOutputs {
  name: string
  type: string
  components?: EVMABIMethodInputsOutputs[]
}

const collections: EVMCollection[] = []

export const useEVMCollectionStore = create<{
  collections: EVMCollection[]
  addCollection: () => void
  removeCollection: (id: UUID) => void
  renameItem: (id: UUID, name: string) => void
  toggleOpen: (id: UUID) => void
  addFolder: (id: UUID) => void
  addSmartContract: (id: UUID, cb: (contract: EVMContract) => void) => void
  updateContractChainId: (id: UUID, chainId: number) => void
  updateContractAddress: (id: UUID, address: string) => void
  updateContractABI: (id: UUID, abi: string) => void
  removeItem: (id: UUID) => void
}>()(
  persist(
    (set) => ({
      collections: [...collections],
      addCollection: () =>
        set((state) => {
          const collection: EVMCollection = {
            id: crypto.randomUUID(),
            name: 'New Collection',
            type: EVMItemType.Collection,
            isOpen: true,
            items: [],
          }

          return { collections: [...state.collections, collection] }
        }),
      removeCollection: (id: UUID) =>
        set((state) => ({
          collections: state.collections.filter((c) => c.id !== id),
        })),
      renameItem: (id: UUID, name: string) =>
        set((state) => {
          const item = findItemInCollections(state.collections, id)

          if (item) {
            item.name = name
          }

          return {
            collections: state.collections,
          }
        }),
      toggleOpen: (id: UUID) =>
        set((state) => {
          const item = findItemInCollections(state.collections, id)

          if (item && item.type !== EVMItemType.SmartContract) {
            item.isOpen = !item.isOpen
          }

          return {
            collections: state.collections,
          }
        }),
      addFolder: (id: UUID) =>
        set((state) => {
          const folder: EVMFolder = {
            id: crypto.randomUUID(),
            name: 'New Folder',
            type: EVMItemType.Folder,
            isOpen: true,
            items: [],
          }

          const item = findItemInCollections(state.collections, id)

          if (item && item.type !== EVMItemType.SmartContract) {
            item.items.push(folder)
          }

          return {
            collections: state.collections,
          }
        }),
      addSmartContract: (id: UUID, cb: (contract: EVMContract) => void) =>
        set((state) => {
          const contract: EVMContract = {
            id: crypto.randomUUID(),
            name: 'New Smart Contract',
            type: EVMItemType.SmartContract,
            contract: {},
          }

          const item = findItemInCollections(state.collections, id)

          if (item && item.type !== EVMItemType.SmartContract) {
            item.items.push(contract)
          }

          cb(contract)

          return {
            collections: state.collections,
          }
        }),
      updateContractChainId: (id: UUID, chainId: number) =>
        set((state) => {
          const item = findItemInCollections(state.collections, id)

          if (item && item.type === EVMItemType.SmartContract) {
            item.chainId = chainId
          }

          return {
            collections: state.collections,
          }
        }),
      updateContractAddress: (id: UUID, address: string) =>
        set((state) => {
          const item = findItemInCollections(state.collections, id)

          if (item && item.type === EVMItemType.SmartContract) {
            item.contract.address = address
          }

          return {
            collections: state.collections,
          }
        }),
      updateContractABI: (id: UUID, abi: string) =>
        set((state) => {
          const item = findItemInCollections(state.collections, id)

          if (item && item.type === EVMItemType.SmartContract) {
            item.contract.abi = abi
          }

          return {
            collections: state.collections,
          }
        }),
      removeItem: (id: UUID) =>
        set((state) => {
          removeItemInCollection(state.collections, id)

          return {
            collections: state.collections,
          }
        }),
    }),
    {
      name: 'evmCollections',
    },
  ),
)
