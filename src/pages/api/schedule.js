import {compareProfit, eloRateTask, findingJobs, jobSchedulingList} from "../../backend/helper";
import userSets from '../../backend/assets/DummyUserSets'
import {map, maxBy, extend, sum, inRange}  from 'lodash';

const schedule = async (req, res) => {
  try {
    const {
      jobs
    } = req.body
    const newJobs = await findingJobs(jobs)
    /*
    * -> sort a job in descending order of profit
    * -> jobs.sort(compareProfit) takes a function as input for sort the datasets
    */
    const sortedJobs = await newJobs.sort(compareProfit)
    //scheduling jobs
    const scheduleJobs = jobSchedulingList(sortedJobs)

    if (scheduleJobs.length !== 0) {
      const prioritizeTasks = await eloRateTask(scheduleJobs)

      if (prioritizeTasks.length === 1) {
        map(prioritizeTasks, (task) => {
          const maxUser = maxBy(userSets, (user) => {
            return user.max_skill_rating
          })
          return extend(task, {
            user: maxUser.name,
            id: maxUser.id
          })
        })
      } else {
        //converting the rating to percent by getting sum of all the records.
        const sumValue = sum(map(prioritizeTasks, (item) => {
          return item.relative_weight
        }))
        const findPercent = (value) => {
          return (value / sumValue) * 100
        }
        //user assign function: simple recommendation engine using inRange js functions
        map(prioritizeTasks, (task) => {
          return map(userSets, user => {
            const isInRange = inRange(parseInt(findPercent(task.relative_weight)), parseInt(user.min_skill_rating), parseInt(user.max_skill_rating));
            if (isInRange) {
              return extend(task, {
                user: user.name,
                id: user.id
              })
            }
          })
        })
      }
      return res.status(200).json({
        data: {
          prioritizeTasks: prioritizeTasks,
          msg: "task weight"
        },
        status: true
      });
    } else {
      return res.status(200).json({
        msg: "Failed",
        status: false
      });
    }
  } catch (error) {
    res.status(400).json({
      msg:"something error",
      error: error
    })
  }
}

export default function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return schedule(req, res);
    default:
      return res.status(400).json({message: 'Bad Request Hit'});
  }
}
