import React,{useState} from 'react'
import './App.css';
import axios from 'axios';

function App() {

  const [projects, setProjects] = useState([])

  axios
  .get('https://localhost:8888/projects')
    .then( res => {
      setProjects(res.data);
      console.log(res)
    
    })
      .catch(err => {
        console.log('Error in server', err)
    })


  return (
    <div>
      {projects.map(data => (
          <h1>{data.name}</h1>
            ))}
    </div>
    )

}

export default App;
