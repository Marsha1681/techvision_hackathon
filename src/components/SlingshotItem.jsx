import {motion} from "framer-motion";

export default function MyComponent(){
 return (
     <motion.div 
       initial={{ opacity: 0, y: -50 }} 
       animate={{ opacity: 1, y: 0 }} 
       className='w-20 h-20 bg-yellow-400 rounded-lg'>
     </motion.div>
 );
}