const Course = ({course}) => {

    const total = course.parts.reduce((s, p) => s + p.exercises ,0)
    
    return(
    <div>
    <Header course={course.name}/>
    <Content parts={course.parts}/>
    <Total sum={total}/>
    </div>
    )
  
  }
  
  const Header = ({course}) => <h1>{course}</h1>
  
  const Content = ({parts}) => <div>{parts.map((part) => <Part key={part.id} part={part}/>)}</div>
  
  const Part = ({part}) => <p>{part.name} {part.exercises}</p>
  
  const Total = ({sum}) => <p>Number of exercises {sum}</p>



  export default Course