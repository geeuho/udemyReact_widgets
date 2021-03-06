import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Search = () => {

    const [term, setTerm] = useState('')
    const [results, setResults] = useState([])
    const [id, setid] = useState(null)
    useEffect(()=> {
        let search = async () => {
            const {data} = await axios.get('https://en.wikipedia.org/w/api.php', {
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: term
                },
            });
            setResults(data.query.search)
             
        };
        if(term && !results){
            search()
        } else {
            const timeoutID = setTimeout(() => {
                if (term) {
                    search()
                }
            }, 2000)

            return () => {
                clearTimeout(timeoutID)
            }
        }
        
        
        

    }, [term])  
    
    const renderedResults = results.map((result) => {
        return (
            <div className="item" key={result.pageid}>
                <div className = "right floated content">
                    <a href = {`https://en.wikipedia.org?curid=${result.pageid}`} className="ui button">Go</a>
                </div>
                
                <div className="content">
                    <div className="header">
                        {result.title}
                    </div>
                    <span dangerouslySetInnerHTML= {{__html: result.snippet}}></span>
                </div>
            </div>
        )
    })
    return (
        
        <div>
            <div className = "ui form">
                <div className = "field">  
                    <label> Enter Search Term</label>
                        <input className = "input"
                        value = {term}
                        onChange = {(e) => {
                            setTerm(e.target.value)
                            console.log(results)
                        }}
                        />
                </div>
            </div>
            <div className = "ui celled list">
                {results ? renderedResults: <div></div>}

            </div>
        </div>
    )
}

export default Search