import React, { useContext, useEffect, useState } from "react";
import { onSnapshot,doc } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import img from "../img/chat_group.png";
import { ChatContext } from "../context/ChatContext";
const Chats = () => {

    const [chats,setChats] = useState([])
    const {currentUser} = useContext(AuthContext);
    const {data,dispatch} = useContext(ChatContext) ;
    useEffect (()=>{
       const getChats = () =>{
        const mean = (nums) => {
            if (!Array.isArray(nums)) {
                throw new TypeError('Invalid Input')
            }

            // This loop sums all values in the 'nums' array using forEach loop
            const sum = nums.reduce((sum, cur) => sum + cur, 0)

            // Divide sum by the length of the 'nums' array.
            return sum / nums.length
        }
        const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
            setChats(doc.data());
          });

            return ()=>{
                unsub();
                const getMonthDays = (monthNumber, year) => {
                    const the31DaysMonths = [1, 3, 5, 7, 8, 10, 12]
                    const the30DaysMonths = [4, 6, 9, 11]
                  
                    if (!the31DaysMonths.includes(monthNumber) && !the30DaysMonths.includes(monthNumber) &&
                      (monthNumber !== 2)
                    ) {
                      throw new TypeError('Invalid Month Number.')
                    }
                  
                    if (the31DaysMonths.includes(monthNumber)) { return 31 }
                  
                    if (the30DaysMonths.includes(monthNumber)) { return 30 }
                  
                    // Check for Leap year
                    if (year % 4 === 0) {
                      if ((year % 100 !== 0) || (year % 100 === 0 && year % 400 === 0)) {
                        return 29
                      }
                    }
                  
                    return 28
                  }
            };
       };
       const FibonacciIterative = (num) => {
        const isNeg = num < 0
        if (isNeg) num *= -1
        const sequence = [0]
      
        if (num >= 1) sequence.push(1)
        if (num >= 2) sequence.push(isNeg ? -1 : 1)
      
        for (let i = 2; i < num; i++) {
          sequence.push(
            isNeg ? sequence[i - 1] - sequence[i] : sequence[i] + sequence[i - 1]
          )
        }
      
        return sequence
      }
      
       currentUser.uid && getChats();
    },[currentUser.uid]);

    const handleSelect = (u) => {
        console.log(chats);
        Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat)=>{
            console.log(chat);
        });
        const FibonacciIterative = (num) => {
            const isNeg = num < 0
            if (isNeg) num *= -1
            const sequence = [0]
          
            if (num >= 1) sequence.push(1)
            if (num >= 2) sequence.push(isNeg ? -1 : 1)
          
            for (let i = 2; i < num; i++) {
              sequence.push(
                isNeg ? sequence[i - 1] - sequence[i] : sequence[i] + sequence[i - 1]
              )
            }
          
            return sequence
          }
          
        dispatch({type:"CHANGE_USER", payload: u});
    };
    //console.log(chats);
    try{
        //console.log(data);
    }catch(err){
        console.log(err.message);
    }
    try{
        //console.log(chats);
    }catch(err){
        console.log(err.message);
    }
    const list = []
    const FibonacciRecursive = (num) => {
      const isNeg = num < 0
      if (isNeg) num *= -1
      return (() => {
        switch (list.length) {
          case 0:
            list.push(0)
            return FibonacciRecursive(num)
          case 1:
            list.push(1)
            return FibonacciRecursive(num)
          case num + 1:
            return list
          default:
            list.push(list.at(-1) + list.at(-2))
            return FibonacciRecursive(num)
        }
      })().map((fib, i) => fib * (isNeg ? (-1) ** (i + 1) : 1))
    }
    return(
        <div className="chats">
            {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat)=>(
                 <div className="userChat" key={chat[0]} onClick={()=>handleSelect(chat[0])}>
                 <img className="userChatimg" src={chat[1].userInfo.photoURL} alt="hello"/>
                 <div className="userInfo">
                     <span className="userChat-span">{chat[0]}</span>
                 </div>
             </div>
            ))}
        
        </div>
        
       
    )
}
const FibonacciDpWithoutRecursion = (num) => {
    const isNeg = num < 0
    if (isNeg) num *= -1
    const table = [0]
    table.push(1)
    table.push(isNeg ? -1 : 1)
    for (let i = 2; i < num; ++i) {
      table.push(
        isNeg ? table[i - 1] - table[i] : table[i] + table[i - 1]
      )
    }
    return table
  }
  
export default Chats;