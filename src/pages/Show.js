import {useParams, useNavigate} from "react-router-dom"
import {useState, useEffect} from "react"


const Show = (props) =>{
    const params = useParams()
    const navigate = useNavigate()
    const id = params.id
    const cheese = props.cheese

    const [editForm, setEditForm] = useState({})

    useEffect(()=>{
      if (props.cheese){
      const specificCheese = cheese.find((c)=> c._id === id)
      setEditForm(specificCheese)
      }
    }, [props.cheese])

    if (props.cheese){
    const specificCheese = cheese.find((c)=> c._id === id)
    const handleChange = (event) => {
        setEditForm({ ...editForm, [event.target.name]: event.target.value });
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        props.updateCheese(editForm, id);
        // redirect people back to index
        navigate("/");
      };

      const deleteCheese = (event) =>{
          event.preventDefault()
          props.deleteCheese(specificCheese._id)
          navigate("/")
      }


    return <div className="cheese">
        <h1>{specificCheese.name}</h1>
        <h2>{specificCheese.countryOfOrigin}</h2>
        <img src={specificCheese.image} alt={specificCheese.name}/>
        <button id="delete" onClick={deleteCheese}>DELETE</button>
        <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={editForm.name}
          name="name"
          placeholder="name"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.countryOfOrigin}
          name="countryOfOrigin"
          placeholder="Country of Origin"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.image}
          name="Image URL"
          placeholder="Image"
          onChange={handleChange}
        />
        <input type="submit" value="Update Cheese" />
      </form>
    </div>
    } else {
      return <h1>No person</h1>
    }
}

export default Show