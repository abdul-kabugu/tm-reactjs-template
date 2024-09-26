import {  Button, Headline, List, AccordionProps, Image } from "@telegram-apps/telegram-ui";
//import { AccordionContent } from "@telegram-apps/telegram-ui/dist/components/Blocks/Accordion/components/AccordionContent/AccordionContent";
import { AccordionSummary } from "@telegram-apps/telegram-ui/dist/components/Blocks/Accordion/components/AccordionSummary/AccordionSummary";
import { BiQrScan } from "react-icons/bi";
import { BsQrCode } from "react-icons/bs";
import { LuQrCode } from "react-icons/lu";
import { Drawer } from "vaul";
import { useState } from "react";
import {QRCodeSVG} from 'qrcode.react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { PiWall, PiWallet } from "react-icons/pi";
import { useMainButton } from "@telegram-apps/sdk-react";

type  Props  = {
    isOpen : boolean
    setIsOpen : any
    userId :  any
}
export function MyDrawer({isOpen, setIsOpen, userId} : Props) {
    const  mb =  useMainButton()

    const handleClose = ()  =>  {
        mb.show()
        setIsOpen(false)
    }

   const  handleOpenSession =  ()  =>  {
        window.open(`http://localhost:3000/payment/${userId}`, '_blank');
    
      }
  return (
    <Drawer.Root shouldScaleBackground  open={isOpen} onDrag={handleClose} >
      <Drawer.Trigger asChild>
      
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className=" bg-zinc-100 flex flex-col rounded-t-[10px] h-[66%] mt-24 fixed bottom-0 left-0 right-0">
            <div className="p-4  bg-white rounded-t-[10px] flex-1">
          <h1 className="font-medium">Pay with</h1>

          <Accordion type="single" collapsible className="w-full my-4">
                 
                 <AccordionItem value="item-2" className='my-3 border px-2 rounded-xl'>
                   <AccordionTrigger>
                      <div  className='flex items-center space-x-2'><LuQrCode className='w-5 h-5'  />
                      <p>Scan QR  code</p>
                       </div>
                   </AccordionTrigger>
                   <AccordionContent className='flex  items-center justify-center  '>
                      <div  className='my-4  flex  items-center justify-center  flex-col'>
                          <div  className=' bg-slate-100 rounded-xl p-2'>
                   <QRCodeSVG
                    value="checkout link"
                   
                  />
              </div>
              
                
              </div>
                    
                   </AccordionContent>
                 </AccordionItem>
                
               </Accordion>



<div className="mt-7" onClick={handleOpenSession}>
    <div className="w-[94vw] mx-auto border border-gray-200 flex space-x-2 items-center py-3.5 px-4 rounded-lg cursor-pointer my-5">
        <PiWallet  className="w-5 h-5" />
         <p className="font-medium">Pay via browser wallets</p>
    </div>

    <div className="w-[94vw] mx-auto border border-gray-200 flex space-x-2 items-center py-3.5 px-4 rounded-lg cursor-pointer my-4">
        <PiWallet  className="w-5 h-5" />
         <p className="font-medium">Mizu wallet</p>
    </div>
</div>
             </div>
       
          </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
