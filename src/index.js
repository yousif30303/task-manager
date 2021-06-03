const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')


const app = express()
const port = process.env.PORT 


app.use(express.json())

app.use(userRouter)
app.use(taskRouter)



app.listen(port,()=>{
    console.log('the port running in ' + port)
})

/* const Task = require('./models/task')
const User = require('./models/user') */

/* const main = async () => {
    // const task = await Task.findById('5c2e505a3253e18a43e612e6')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    const user = await User.findById('60b3ec626fba7032b8350b82')
    await user.populate({ path: 'tasks', model: Task }).execPopulate()
    console.log(user.tasks)
}

main() */