import { Allotment } from 'allotment'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useEVMCollectionStore } from '@/store/collections'

import Folder from './Folder'

export default function Collections() {
  const { collections, addCollection } = useEVMCollectionStore()

  return (
    <Allotment className="w-full h-full" vertical>
      <Allotment.Pane minSize={48} maxSize={48}>
        <div className="flex items-center justify-between p-2">
          <small className="text-sm font-medium leading-none">Collections</small>
          <Button variant="secondary" size="sm">
            New
          </Button>
        </div>
      </Allotment.Pane>
      <Allotment.Pane minSize={36} maxSize={36}>
        <div className="px-2">
          <Input type="text" placeholder="Search" className="p-0 border-none focus-visible:ring-0" />
        </div>
      </Allotment.Pane>
      <Allotment.Pane className="py-1">
        {collections.length > 0 ? (
          collections.map((collection) => {
            return <Folder key={collection.id} folder={collection} />
          })
        ) : (
          <div className="flex flex-col items-center px-2 py-12 space-y-4 select-none text-muted-foreground">
            <p className="text-sm text-center">Create a collection for your smart contracts.</p>
            <Button variant="secondary" size="sm" onClick={addCollection}>
              Create Collection
            </Button>
          </div>
        )}
      </Allotment.Pane>
    </Allotment>
  )
}
