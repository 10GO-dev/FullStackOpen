import { useState } from 'react'
import './App.css'


const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>
const StatisticLine = ({category, value}) => <tr><td>{category}</td><td>{value}</td></tr>

const Statistics = (props) => {

  const { good, neutral, bad, total, average, positive } = props

  if (total === 0) {
    return (
      <>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </>
    )
  }
  return (
    <>
      <h2>Statistics</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>

          <StatisticLine category="Good" value={good} />
          <StatisticLine category="Neutral" value={neutral} />
          <StatisticLine category="Bad" value={bad} />
          <StatisticLine category="All" value={total} />
          <StatisticLine category="Average" value={average} />
          <StatisticLine category="Positive" value={`${positive}%`} />
        </tbody>
      </table>
    </>
  )

}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [avg, setAvg] = useState(0)
  const [positive, setPositive] = useState(0)

  const goodClickHandler = () => {
    const updatedGood = good + 1
    const updatedTotal = updatedGood + neutral + bad
    setGood(updatedGood)
    setTotal(updatedTotal)
    setPositive((updatedGood/updatedTotal)*100)
    setAvg(calculateAverageScore(updatedGood, bad, updatedTotal))
  }
  const neutralClickHandler = () => {
    const updatedNeutral = neutral + 1
    const updatedTotal = updatedNeutral + good + bad
    setNeutral(updatedNeutral)
    setTotal(updatedTotal)
    setPositive((good/updatedTotal)*100)
    setAvg(calculateAverageScore(good,bad, updatedTotal))
  }
  const badClickHandler = () => {
    const updatedBad = bad + 1
    const updatedTotal = updatedBad + good + neutral
    setBad(updatedBad)
    setTotal(updatedTotal)
    setPositive((good/updatedTotal)*100)
    setAvg(calculateAverageScore(good,updatedBad, updatedTotal))
  }
  
  const calculateAverageScore = (good, bad, total) => ((1 * good) + (-1 * bad))/total




    return (
    <>
      <h1>Unicafe - Feedback ⭐⭐⭐</h1>
      <div className="card">
        <h2>Give Feedback</h2>
        <Button onClick={goodClickHandler} text="Good"/>
        <Button onClick={neutralClickHandler} text="Neutral"/>
        <Button onClick={badClickHandler} text="Bad"/>
        <Statistics good={good} neutral={neutral} bad={bad} total={total} average={avg} positive={positive} />
      </div>
    </>
  )
}

export default App
