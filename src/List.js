import { useState, useEffect, useRef } from "react";
import ListItem from "./ListItem";
import Xarrow from "react-xarrows";
class TreeNode {
    constructor(id, data, l) {
      this.id = id;
      this.data = data;
      this.child = [];
      this.level = l;
    }
  }

 let mergingObj = {}



function mergeSort(arr, start, end, l,obj) {
  //base Case

  if (start >= end) {
    if (start === end) {
     
      return {val:l,obj:obj};
    }
    return {val:Math.MIN_VALUE,obj:null};
  }
  const mid = parseInt((start + end) / 2);
//   console.log(obj);
  obj.child.push(new TreeNode(obj.id + "0" + Math.random()*100, arr.slice(start, mid + 1), l + 1));
  obj.child.push(
    new TreeNode(obj.id + "1", arr.slice(mid + 1, end + 1), l + 1)
  );
  const le = mergeSort(arr, start, mid, l + 1, obj.child[0]);
  const r = mergeSort(arr, mid + 1, end, l + 1, obj.child[1]);
//   mergingObj = Object.keys(mergingObj).length === 0 ? obj : mergingObj;
  merge(arr, start, mid, mid + 1, end, Math.max(le.val, r.val) + 1,obj,obj.child);
  return {val:Math.max(le.val, r.val) + 1,obj};
}

function merge(arr, s1, e1, s2, e2, l, obj,child) {
    const newArray = [];
    // console.log(arr.slice(s1, e1 + 1), arr.slice(s2, e2 + 1), l);
  
    let x = s1;
    let y = s2;
    while (x <= e1 && y <= e2) {
      if (arr[x] < arr[y]) {
        newArray.push(arr[x++]);
      } else {
        newArray.push(arr[y++]);
      }
    }
  
    while (x <= e1) {
      newArray.push(arr[x++]);
    }
    while (y <= e2) {
      newArray.push(arr[y++]);
    }
  
    //Copy back
    for (let s of newArray) {
      arr[s1++] = s;
    }
    const node = new TreeNode(obj.id + "0" + l.toString() + Math.random()*100, newArray, l);
    // console.log(node);
    // console.log(child);
    if(child){
        
        for(let s of child){
            if(s.data.length !== 1){
                continue;
            }
            s.child.push(node);
        
        }
    }
    let xs = l-1;
    while(xs>=0){
        if(!mergingObj[xs]){
           break;
        }
        
        for(let s of mergingObj[xs]){
            if(s.child.length){
                continue;
            }
            s.child.push(node);
        }
        xs--;
    }
    if(!mergingObj[l]){
        mergingObj[l] = [];
    }
    mergingObj[l].push(node);

  }

  function levelOrder(obj){
    //   let ct = 0;
      const l = {};
      const queue = [];
      const visited = {};
     
      l[obj.level] = [];
      l[obj.level].push(obj);
      queue.push(obj);
      while(queue.length){
        const front = queue.shift();
        visited[front.id] = true;
        for(let i = 0 ; i < front.child.length ; ++i){
            if(visited[front.child[i].id]){
                continue;
            }
            if(!l[front.child[i].level]){
                l[front.child[i].level] = [];
            }
            
            l[front.child[i].level].push(front.child[i]);
            visited[front.child[i].id] = true;
            queue.push(front.child[i]);
        }
      }
      return l;
  }


export default function List() {
  const intitialArrayVal = [9,8,7,6,5,4,3,2,1,0];
  const [sortedLevels, setSortedLevels] = useState(new TreeNode("a",intitialArrayVal.slice(0),0));
  const [data, setData] = useState(intitialArrayVal);
  const [levelOrderObj,setLevelOrder] = useState([]);
  const textAreaRef = useRef(null);
  useEffect(() => {
    const objHelper = {};
    const size = mergeSort(data, 0, data.length - 1, 0, sortedLevels,objHelper);
    const l = levelOrder(sortedLevels);
    const levelArr = new Array(size+1);
    for(let i in l){
        levelArr[i] = l[i];
    }
    console.log(levelArr);
    console.log(data);
    setLevelOrder(levelArr);
    setSortedLevels(sortedLevels);
    setData(data);
    mergingObj = {};
  }, [data,sortedLevels]);


  function eventSortHandler(e) {
    try{
        const data = textAreaRef.current.value
      .split(",")
      .map((item) => parseInt(item));
    setData(data);
    setSortedLevels(new TreeNode("a" + Math.random(),data.slice(0),0));
    }
    catch(e){
        setData(intitialArrayVal);
        setSortedLevels(new TreeNode("a" + Math.random(),data.slice(0),0));
    }
    
  }

  return (
    <div style={{ margin: "auto", width: "100%" } }>
    <center>
    <div className="mainList">
    <h1 style={{color:"pink"}}> Merge Sort Visualizer </h1>
       
    <h2 style={{color:"pink"}}>Please Enter Comma Seperated Values </h2>  
    <form>
        <input
          placeholder="Enter elements"
          type="text"
          defaultValue={intitialArrayVal}
          ref={textAreaRef}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            setData(eventSortHandler);
          }}
        >
          Sorter!
        </button>
      </form>
      </div>
      </center>
      <div>
      <br/>
      <br/>
      <br/>
      {levelOrderObj.map((level)=>{
          console.log(level[0].id);
        return <ListItem key={Math.random()} data={level}/>
      })}
      {levelOrderObj.map((level)=>{
            return level.map((item)=>{
              return item.child.map((finalItem)=>{
                return <Xarrow key={Math.random()} endAnchor= { {position: "auto", offset: { x: 20 }} } path="smooth" dashness={{ strokeLen: 10, nonStrokeLen: 15, animation: 0.5 }} curveness={0.2} gridBreak='100' start = {item.id} end = {finalItem.id}/>
              });
            })
      })}
      </div>
    </div>
  );
}
