import {Route, Routes} from "react-router-dom"
import {useState, useEffect} from "react"
import Index from "../pages/Index"
import Show from "../pages/Show"

const Main = (props) =>{
    
    const [cheese, setCheese] = useState(null)
    
    const URL = "https://knguyen111601-cheese-backend.herokuapp.com/cheese/"
    
    const getCheese = async (cheese) =>{
        const response = await fetch(URL)
        // turn the response in an object
        const data = await response.json()
        // set the state to the api data
        setCheese(data)
    }

    const createCheese = async (cheese) =>{
        await fetch(URL, {
            method: "post",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cheese)
        })
        getCheese()
    }

    const updateCheese = async (cheese, id) => {
        // make post request to create cheese
        await fetch(URL + id, {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cheese),
        });
        // update list of cheese
        getCheese();
      };
    

    const deleteCheese = async(id)=>{
        await fetch(URL + id, {
            method:"delete"
        })
        getCheese()
    }

    useEffect(()=>{getCheese()}, [])

    return <main>
        <Routes>
            <Route path="/" element={<Index cheese={cheese} createCheese={createCheese}/>}/>
            <Route path="/cheese/:id" element={<Show cheese={cheese} updateCheese={updateCheese} deleteCheese={deleteCheese}/>}/>
        </Routes>
    </main>
}

export default Main 