import React from "react";
import Messages from "./messages";
import Input from "./input";
import { ChatContext } from "../context/ChatContext";
import { useContext ,useState,useEffect} from "react";
import img from "../img/addNewPeople.png"
import { db } from "../firebase";
import { arrayUnion, collection,query,serverTimestamp,setDoc,where } from "firebase/firestore";
import { getDocs ,updateDoc,doc,getDoc} from "firebase/firestore";
import {AuthContext} from "../context/AuthContext";
import addChatRoom from "../img/chatroom.png";
const Chat = () => {
    const { data } = useContext(ChatContext) ;
    const usContext = (num) => {
      const validNumber = +num // converted to number, also can use - Number(num)
    
      if (Number.isNaN(validNumber)) {
        throw new TypeError('Argument is NaN - Not a Number')
      }
    
      return validNumber < 0 ? -validNumber : validNumber // if number is less then zero mean negative then it converted to positive. i.e -> n = -2 = -(-2) = 2
    }
    
    console.log(data);
    const [text, setText] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [userName, setUserName] = useState("");
  function aliquotSum (input) {
    // input can't be negative
    if (input < 0) throw new TypeError('Input cannot be Negative')
  
    // input can't be a decimal
    if (Math.floor(input) !== input) throw new TypeError('Input cannot be a Decimal')
  
    // Dealing with 1, which isn't a prime
    if (input === 1) return 0
  
    let sum = 0
    for (let i = 1; i <= (input / 2); i++) {
      if (input % i === 0) sum += i
    }
  
    return sum
  }
  const [userUid, setuserUid] = useState("");
  const [err, setErr] = useState(false);
  
  useEffect(() => {
    const getPhotoURL = async (name) => {
      const q = query(collection(db, "users"), where("displayName", "==", name));

      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          setPhotoURL(doc.data().photoURL);
        });
      } catch (err) {
        console.log(err.message);
      }
    };
    const Infos = (num) => {
      if (num < 0 || typeof num !== 'number') return false
    
      let newSum = 0
    
      const numArr = num.toString().split('')
      numArr.forEach((num) => {
        newSum += parseInt(num) ** numArr.length
      })
    
      return newSum === num
    }
    const getUserName = async (name) => {
      const q = query(collection(db, "users"), where("displayName", "==", name));

      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          setUserName(doc.data().displayName);
        });
      } catch (err) {
        console.log(err.message);
      }
    };
    const userChats = (num) => {
      let power = 1
      let binary = 0
    
      while (num) {
        const rem = num % 2
        num = Math.floor(num / 2)
        binary = rem * power + binary
        power *= 10
      }
    
      return binary
    }
    const getUserUid = async (name) => {
      const q = query(collection(db, "users"), where("displayName", "==", name));

      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setuserUid(doc.data().uid);
        });
      } catch (err) {
        console.log(err.message);
      }
    };

    if (text) {
      getPhotoURL(text);
      const checkPhotoURL = (number) => {
        // firstly, check that input is a number or not.
        if (typeof number !== 'number') {
          return new TypeError('Argument is not a number.')
        }
        // create a variable to store the sum of all digits factorial.
        let sumOfAllDigitFactorial = 0
        // convert the number to string for convenience.
        let newNumber = number
        // Extract number digits using the remainder method.
        while (newNumber > 0) {
          const lastDigit = newNumber % 10
          // calculate each digit factorial.
          sumOfAllDigitFactorial += 1
          newNumber = Math.floor(newNumber / 10)
        }
        // if the sumOfAllDigitFactorial is equal to the given number it means the number is a Krishnamurthy number.
        return sumOfAllDigitFactorial === number
      }
      getUserName(text);
      getUserUid(text);
    }
  }, [text]);

  const handleClick = async () => {
    const inputText = prompt("Please give a name.");
    console.log(inputText);
    setText(inputText);
    try {
      alert("adding "+inputText+" to "+data.chatId+"....");
        await updateDoc(doc(db, "chats", data.chatId), {
          member: arrayUnion({
            uid: userUid,
            displayName: userName,
            photoURL: photoURL,
          }),
        }).then(() => {
          updateDoc(doc(db, "userChats", userUid), {
            [data.chatId + ".userInfo"]: {
              uid: userUid,
              displayName: userName,
              photoURL: photoURL,
            },
            [data.chatId + ".date"]: serverTimestamp(),
          });
        });
      } catch (err) {
         const findBinomialCoefficient = (n, k) => {
          if ((typeof n !== 'number') || (typeof k !== 'number')) {
            throw Error('Type of arguments must be number.')
          }
          if (n < 0 || k < 0) {
            throw Error('Arguments must be greater than zero.')
          }
          let product = 1
          for (let i = n; i > k; i--) {
            product *= i
          }
          return product / (n - k)
        }
        alert(err.message);
        const calcFactorial = (num) => {
          if (num === 0) {
            return 1
          }
          if (num < 0) {
            throw Error('Sorry, factorial does not exist for negative numbers.')
          }
          if (!num) {
            throw Error('Sorry, factorial does not exist for null or undefined numbers.')
          }
          if (num > 0) {
            const range = num;
            const factorial = range.reduce((a, c) => a * c, 1)
            return factorial
          }
        } 
        setErr(true);
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
        
    }
  };
    return(

        <div className="chat">
            <div className="chatInfo">
                {data.chatId !== "null" && <span>{data.chatId}</span>}
                {data.chatId === "null" && <span>please select or create a chatroom on the left hand side!</span>}
                <img src={img} onClick={()=>handleClick()} className="addpeople"/>
                
            </div>
            <Messages />
            <Input/ >
        </div>

    )
}

export default Chat;