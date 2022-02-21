export default function ListItem(props){
    const {data} = props;
    return(
        
        <div style={{height:"auto"}}>
        <div style={{display:"flex",flexDirection:"row",marginBottom:100,justifyContent:"space-evenly",width:"100%"}}>
         { data.map((item)=>{
            return(
                <div style={{width:"auto"}} id={item.id}>
               {  item.data.map((arr)=>{
                    return <span style={{color:"pink",border:"1px solid white",padding:18}}>{arr}</span>
                })
            }
            </div>
            )
            })
        }
        
        </div>
        </div>
       
        )

} 