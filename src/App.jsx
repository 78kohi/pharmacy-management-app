import Widget from './components/Widget'
import BigWidget from './components/BigWidget'

const App = () => {
  return (
    <div className="h-full bg-[#F6F6F6]">
      <div className="flex gap-6 w-full justify-evenly px-6 pt-6 pb-3">
        <Widget type={1} />
        <Widget type={2} />
        <Widget type={3} />
        <Widget type={4} />
      </div>
      <div className="flex gap-6 justify-evenly px-6 py-3">
        <BigWidget type={1} />
        <BigWidget type={2} />
      </div>
      <div className="flex gap-6 justify-evenly px-6 py-3">
        <BigWidget type={3} className="flex-4" />
        <BigWidget type={4} className="flex-3" />
      </div>
    </div>
  )
}

export default App