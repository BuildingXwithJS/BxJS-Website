import React, {useState} from 'react';
import Episode from './episode'

export default ({episodes, currentEpisode}) => {
  const [value, setValue] = useState('')
  const [foundEpisode, setFoundEpisode] = useState([])

  const handleChange = e => {
    setValue(e.target.value)
    if (e.target.value) {
      const filter = episodes.filter(element => {
        const name = element.name
        return name.includes(e.target.value)
      })
      setFoundEpisode(filter)
    } else {
      setFoundEpisode([])
    }
  }

  return (
    <div className="card">
      <header className="card-header">
        <input
          className="input"
          type="number"
          value={value}
          placeholder="Search Episodes"
          onChange={handleChange}
        />
      </header>
      {foundEpisode.length > 0 && (
        <div className="card-content">
          <div className="columns" style={{ flexDirection: 'column' }}>
            {foundEpisode.map((e, i) => (
              <div className="column" style={{ paddingTop: 0 }} key={i} >
                  <Episode currentEpisode={currentEpisode} episode={e} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
};
