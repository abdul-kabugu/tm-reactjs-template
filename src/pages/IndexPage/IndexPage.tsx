import { Section, Cell, Image, List, Headline, Banner, Button, Card, Skeleton, Spinner } from '@telegram-apps/telegram-ui';
import type { FC,  } from 'react';
import { Link } from '@/components/Link/Link.tsx';
import tonSvg from './ton.svg';
import { useBackButton, useInitData, useMainButton } from '@telegram-apps/sdk-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { END_POINT_URL } from '@/constants';
import  React, { useState, useEffect } from 'react';
import { MyDrawer } from '@/components/drawer';
import io from 'socket.io-client';
import { CardChip } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardChip/CardChip';
import { CardCell } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell';
import { CiCircleCheck } from "react-icons/ci";
import { Checkmark } from 'react-checkmark'
//import { MainButton } from '@telegram-apps/sdk-react';
export const IndexPage: FC = () => {
const  initInfo =  useInitData()


const [isOpen, setIsOpen] = useState(false)
const [status, setstatus] = useState(null)
const [selectedPackage, setselectedPackage] = useState()
const [testTruth, settestTruth] = useState(true)

const  mb =  useMainButton()



useEffect(() => {
  mb.show().setText("Pay now").enable()

  if(isOpen || status?.status === "SUCCESS"){
    mb.hide()
  }
}, [isOpen, status])



mb.on(("click"), () =>  {
  setIsOpen(!isOpen)
} )

  const userId =  initInfo?.user?.id

console.log("initi information", userId)

const socket = io(END_POINT_URL, { autoConnect: false });
useEffect(() => {
  socket.connect();

  socket.on('connect', () => {
    console.log(`Connected to server with ID: ${socket.id}`);
  });

  socket.on('paymentStatus', (newStatus) => {
    // console.log("The payment status:", newStatus);
     if(newStatus.userId  === userId){
      //setisCheckingOut(false)
      setstatus(newStatus)
     }
    
   // alert("changed")
    setstatus(newStatus);
  });

  return () => {
    socket.disconnect();
  };
}, [])

console.log("the lateststatus", status)




const getSessions =  async ()  =>  {
  const res =  await axios.get(`${END_POINT_URL}api/payment/session/${userId}`)
  return res.data
}

const {data, isLoading, error}  =  useQuery({
  queryKey : ['session'],
  queryFn : getSessions,
  enabled : !!userId
})
console.log("session", data)

if(isLoading){
  return(
    <div className='w-full h-[99vh] flex items-center justify-center'>
       <Spinner  size='l' />
    </div>
  )
}



const handleCheckTx = ()  =>  {
  window.open(`https://explorer.aptoslabs.com/txn/${status?.transactionHash}?network=testnet`, '_blank');
}

if(status?.status  === "SUCCESS"){
  return(
    <List className='flex flex-col items-center justify-center h-[90vh]'> 
    <div className='flex items-center justify-center flex-col'>
    <div  className='mb-3  border border-green-300 rounded-full w-fit  flex items-center justify-center animate-pulse'>
<Checkmark size='50px'  />

</div>

<div>
<h1  className='text-xl leading-snug font-semibold text-center mb-1'>Payment Confirmed!</h1>
<h2 className=' text-xs text-center'>Your transaction has been securely processed</h2>
</div>

<div className='flex space-x-3 items-center'>

<Button className='mt-5'
size='s'
mode='plain'
onClick={handleCheckTx}
>
  View transaction
</Button>
</div>
</div>
     </List>
  )
}

  return (
   
    <List>
      <Banner


  description={`You're just one step away from unlocking access to exclusive content in ${data?.communityId?.chatTitle}`}
  header={`Complete Your Payment `}
  
  type="section"
>
  
</Banner>
    <List className='px-1'>
      <Headline weight='3'>Choose plan</Headline>
       
       {
         data?.communityId?.subscriptionTiers.length > 0 ?
     data?.communityId?.subscriptionTiers?.map((item, i) => (
      <Card type="plain" key={i} className='w-full'>
  <React.Fragment key=".0">
    <CardChip readOnly  onClick={() =>  setIsOpen(!isOpen)} className=''>
      Select plan
    </CardChip>
  <div 
   className={`w-[95%] mx-auto min-h-[200px] z-0 md:h-[500px]  ${i === 0 ? "bg-gradient-to-br from-red-100 via-red-50 to-red-200" :  i === 1 ? "bg-gradient-to-br from-amber-200 via-lime-200 to-amber-300" : "bg-gradient-to-bl from-orange-300 via-orange-100 to-orange-300"} 
   p-3 py-4 rounded-xl hover:border border-border  ${item._id ===  selectedPackage?._id && "ring-4 ring-blue-500"}
  `}
  onClick={() =>  setselectedPackage(item)} 
  >
    <Headline className='mb-3' weight='3'>{item?.tierName}</Headline>
 <div className='flex items-center  '>
                <h1 className='font-bold text-3xl'>${item.tierPrice}</h1>
                <span className='text-xs font-medium text-muted-foreground'>/month</span>
             </div>

             <div>
  {item.tierBenefits.map((item, i)  =>  (
    <div key={i} className='flex items-center space-x-1 my-3'> 
       <CiCircleCheck  className='w-4 h-4'  />
       <p>{item}</p>
 </div>
))}
  </div>
  </div>


  </React.Fragment>
</Card>
     ))  
       : (
        <p>Subscription not activated</p>
       )}
    </List>


      
       <MyDrawer isOpen={isOpen} setIsOpen={setIsOpen} userId={userId}  />

       
    </List>

 
 
  );
};
