import { useMainButton, useQRScanner, useUtils } from '@telegram-apps/sdk-react';
import { TonConnectButton, useTonWallet } from '@tonconnect/ui-react';
import { initMainButton } from '@telegram-apps/sdk';
import { Drawer } from 'vaul';

import {
  Avatar,
  Button,
  Cell,
  List,
  Navigation,
  Placeholder,
  Section,
  Text,
  Title,
} from '@telegram-apps/telegram-ui';
import {useState}  from 'react'
import type { FC } from 'react';
// onClick={() =>  window.open('https://example.com', '_blank')}
import { DisplayData } from '@/components/DisplayData/DisplayData.tsx';

import './TONConnectPage.css';
import { MyDrawer } from '@/components/drawer';

export const TONConnectPage: FC = () => {

  const [isOpen, setIsOpen] = useState(false)

  const  mb =  useMainButton()
  mb.show().setText("pay now").enable()

  mb.on(("click"), () =>  {
    setIsOpen(!isOpen)
  } )



 

  return (
    <List className=''>
     <h2>hello  world</h2>
    {/*} <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger>
      <Button className=' w-[90vw] absolute bottom-0 left-4 right-4 ' >I love  this </Button>
      </Drawer.Trigger>
      <Drawer.Portal  >
        <Drawer.Content className='bg-red-600 h-full'>
       <div className='h-full bg-green-500'>hello</div>
        </Drawer.Content>
        <Drawer.Overlay className=' h-full bg-yellow-500' />
      </Drawer.Portal>
    </Drawer.Root>*/}
    
    <MyDrawer isOpen={isOpen} />
  
    </List>
  );
};
